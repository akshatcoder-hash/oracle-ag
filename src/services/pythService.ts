import { PriceServiceConnection, PriceFeed } from "@pythnetwork/price-service-client";

export class PythService {
  private connection: PriceServiceConnection;

  constructor(endpoint: string = "https://hermes.pyth.network") {
    this.connection = new PriceServiceConnection(endpoint, {
      logger: console,
      priceFeedRequestConfig: {
        binary: true,
      },
    });
  }

  async getLatestPrice(priceId: string): Promise<number | null> {
    try {
      const priceFeeds = await this.connection.getLatestPriceFeeds([priceId]);
      if (priceFeeds && priceFeeds.length > 0) {
        const latestPrice = priceFeeds[0].getPriceNoOlderThan(60);
        return latestPrice ? Number(latestPrice.price) * 10 ** latestPrice.expo : null;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Pyth price:', error);
      return null;
    }
  }

  subscribeToPriceUpdates(priceId: string, callback: (price: number) => void): void {
    this.connection.subscribePriceFeedUpdates([priceId], (priceFeed: PriceFeed) => {
      const price = priceFeed.getPriceNoOlderThan(60);
      if (price) {
        callback(Number(price.price) * 10 ** price.expo);
      }
    });
  }

  unsubscribeFromPriceUpdates(priceId: string): void {
    this.connection.unsubscribePriceFeedUpdates([priceId]);
  }

  closeConnection(): void {
    this.connection.closeWebSocket();
  }
}

export const pythService = new PythService();