import React, { useState } from 'react';
import { PythPriceFeed } from '../../services/pythDataService';
import { useOracleData } from '../../hooks/useOracleData';
import AssetSearch from '../AssetSearch/AssetSearch';

const OracleAggregator: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<PythPriceFeed | null>(null);
  const { pythPrice, bandPrice, averagePrice, lastUpdated, error } = useOracleData(
    selectedAsset?.id || '',
    selectedAsset?.attributes?.base || ''
  );

  const handleAssetSelect = (asset: PythPriceFeed) => {
    setSelectedAsset(asset);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Oracle Aggregator</h1>
      <AssetSearch onAssetSelect={handleAssetSelect} />
      {selectedAsset && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedAsset.attributes?.description}</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PriceCard title="Pyth Price" price={pythPrice} />
                <PriceCard title="Band Price" price={bandPrice} />
                <PriceCard title="Average Price" price={averagePrice} />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Last Updated: {lastUpdated ? lastUpdated.toLocaleString() : 'N/A'}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface PriceCardProps {
  title: string;
  price: number | null;
}

const PriceCard: React.FC<PriceCardProps> = ({ title, price }) => (
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-xl font-bold break-words overflow-hidden">
        {price !== null ? `$${Number(price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : (title === "Band Price" ? "N/A" : "Loading...")}
      </p>
    </div>
  );
  
export default OracleAggregator;