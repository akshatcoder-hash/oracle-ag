import { useState, useEffect } from 'react';
import { pythDataService } from '../services/pythDataService';
import { bandDataService } from '../services/bandDataService';

interface OracleData {
  pythPrice: number | null;
  bandPrice: number | null;
  averagePrice: number | null;
  lastUpdated: Date | null;
  error: string | null;
}

export const useOracleData = (pythPriceFeedId: string, baseSymbol: string) => {
  const [oracleData, setOracleData] = useState<OracleData>({
    pythPrice: null,
    bandPrice: null,
    averagePrice: null,
    lastUpdated: null,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pythPrice = await pythDataService.getLatestPrice(pythPriceFeedId);
        const bandPrice = await bandDataService.getReferenceData(baseSymbol);

        let averagePrice = null;
        if (pythPrice !== null) {
          if (bandPrice !== null) {
            averagePrice = (pythPrice + bandPrice) / 2;
          } else {
            averagePrice = pythPrice;
          }
        }

        setOracleData({
          pythPrice,
          bandPrice,
          averagePrice,
          lastUpdated: new Date(),
          error: null,
        });
      } catch (error) {
        console.error('Error fetching oracle data:', error);
        setOracleData(prevData => ({
          ...prevData,
          error: 'Failed to fetch oracle data. Please try again.',
        }));
      }
    };

    if (pythPriceFeedId && baseSymbol) {
      fetchData();
    } else {
      setOracleData(prevData => ({
        ...prevData,
        error: null,
        pythPrice: null,
        bandPrice: null,
        averagePrice: null,
      }));
    }

    const interval = setInterval(fetchData, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, [pythPriceFeedId, baseSymbol]);

  return oracleData;
};