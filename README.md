# Oracle Aggregator

Oracle Aggregator is a web application that fetches and displays cryptocurrency price data from multiple oracle sources, specifically Pyth and Band Protocol. It provides users with real-time price information and calculates an average price between the two oracles.

## Features

- Search for various cryptocurrency assets
- Display real-time price data from Pyth and Band Protocol oracles
- Calculate and display the average price
- Responsive design for both desktop and mobile devices

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn or npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/oracle-aggregator.git
   cd oracle-aggregator
   ```

2. Install dependencies:
   ```
   yarn install
   ```
   or
   ```
   npm install
   ```

3. Start the development server:
   ```
   yarn dev
   ```
   or
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Usage

1. Use the search bar to find a cryptocurrency asset.
2. Select an asset from the search results.
3. View the latest prices from Pyth and Band Protocol, along with the calculated average price.

## Contributing

We welcome contributions to the Oracle Aggregator project! Please see our [Contributing Guide](CONTRIBUTING.md) for more details on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Pyth Network](https://pyth.network/) for providing price feed data
- [Band Protocol](https://bandprotocol.com/) for providing oracle services

## Contact

If you have any questions or feedback, please open an issue in this repository.