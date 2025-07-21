import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
        const sorted = response.data
          .filter(asset => asset.symbol.endsWith('USDT'))
          .sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
          .slice(0, 10);
        setMarkets(sorted);
      } catch (error) {
        console.error('Errore nel caricamento dati Binance:', error);
      }
    };

    fetchMarkets();
    const interval = setInterval(fetchMarkets, 10000); // aggiorna ogni 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>TO Trade</h1>
      </header>
      <div className="columns">
        <div className="column markets">
          <h2>Markets</h2>
          {markets.map((item, index) => (
            <div key={index} className="card">
              <strong>{item.symbol}</strong>
              <div>Price: ${parseFloat(item.lastPrice).toFixed(2)}</div>
              <div
                style={{ color: parseFloat(item.priceChangePercent) >= 0 ? 'lime' : 'red' }}
              >
                {parseFloat(item.priceChangePercent).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
        <div className="column forecasts">
          <h2>Forecasts</h2>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default App;
