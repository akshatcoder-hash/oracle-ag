import React, { useState, useEffect } from 'react';
import { pythDataService, PythPriceFeed } from '../../services/pythDataService';

interface AssetSearchProps {
  onAssetSelect: (asset: PythPriceFeed) => void;
}

const AssetSearch: React.FC<AssetSearchProps> = ({ onAssetSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assetType, setAssetType] = useState('');
  const [searchResults, setSearchResults] = useState<PythPriceFeed[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        pythDataService.searchPriceFeeds(searchTerm, assetType)
          .then(results => setSearchResults(results));
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, assetType]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAssetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAssetType(event.target.value);
  };

  const handleAssetSelect = (asset: PythPriceFeed) => {
    onAssetSelect(asset);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for an asset..."
        value={searchTerm}
        onChange={handleSearch}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={assetType}
        onChange={handleAssetTypeChange}
        className="ml-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Types</option>
        <option value="Crypto">Crypto</option>
        <option value="Equity">Equity</option>
        <option value="FX">FX</option>
        <option value="Metal">Metal</option>
      </select>
      {searchResults.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded-md">
          {searchResults.map(asset => (
            <li
              key={asset.id}
              onClick={() => handleAssetSelect(asset)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {asset.attributes?.base || 'Unknown'} / {asset.attributes?.quote_currency || 'Unknown'} - {asset.attributes?.description || 'No description'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssetSearch;