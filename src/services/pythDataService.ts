import axios from 'axios';

export interface PythPriceFeed {
  id: string;
  attributes?: {
    asset_type?: string;
    base?: string;
    description?: string;
    generic_symbol?: string;
    publish_interval?: string;
    quote_currency?: string;
    symbol?: string;
    weekly_schedule?: string;
  };
}

interface PythPriceData {
  id: string;
  price: {
    price: string;
    expo: number;
  };
}

class PythDataService {
  private baseUrl = 'https://hermes.pyth.network/v2/';
  private priceFeeds: PythPriceFeed[] = [];

  constructor() {
    this.fetchAllPriceFeeds();
  }

  private async fetchAllPriceFeeds() {
    try {
      const response = await axios.get<PythPriceFeed[]>(`${this.baseUrl}price_feeds`);
      this.priceFeeds = response.data;
    } catch (error) {
      console.error('Error fetching Pyth price feeds:', error);
    }
  }

  async searchPriceFeeds(query: string, assetType?: string): Promise<PythPriceFeed[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.priceFeeds.filter(feed => {
      const matchesQuery = Object.values(feed.attributes || {}).some(
        value => typeof value === 'string' && value.toLowerCase().includes(lowercaseQuery)
      );
      const matchesAssetType = !assetType || feed.attributes?.asset_type?.toLowerCase() === assetType.toLowerCase();
      return matchesQuery && matchesAssetType;
    });
  }

  async getLatestPrice(priceFeedId: string): Promise<number | null> {
    if (!priceFeedId) {
      console.error('No price feed ID provided');
      return null;
    }
    try {
      const response = await axios.get<{ parsed: PythPriceData[] }>(`${this.baseUrl}updates/price/latest`, {
        params: { 
          ids: [priceFeedId]
        }
      });
      
      if (response.data && response.data.parsed && response.data.parsed.length > 0) {
        const priceData = response.data.parsed[0].price;
        return Number(priceData.price) * Math.pow(10, priceData.expo);
      }
      return null;
    } catch (error) {
      console.error('Error fetching latest Pyth price:', error);
      return null;
    }
  }
}

export const pythDataService = new PythDataService();