import axios from 'axios';

interface BandPriceResult {
  symbol: string;
  multiplier: string;
  px: string;
  request_id: string;
  resolve_time: string;
}

interface BandPriceResponse {
  price_results: BandPriceResult[];
}

class BandDataService {
  private baseUrl = 'https://laozi1.bandchain.org/api/oracle/v1/request_prices';

  async getReferenceData(symbol: string): Promise<number | null> {
    try {
      // Remove "/USD" from the symbol if present
      const cleanSymbol = symbol.replace('/USD', '');
      
      const response = await axios.get<BandPriceResponse>(this.baseUrl, {
        params: {
          symbols: cleanSymbol
        }
      });

      if (response.data && response.data.price_results && response.data.price_results.length > 0) {
        const result = response.data.price_results[0];
        const price = Number(result.px) / Number(result.multiplier);
        return price;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Band reference data:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
      }
      return null;
    }
  }
}

export const bandDataService = new BandDataService();