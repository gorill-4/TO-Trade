import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import AssetDetail from './AssetDetail';

function HomePage() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
        const filtered = res.data
          .filter(item => item.symbol.endsWith('USDT'))
          .sort((a, b) => Math.abs(b.priceChangePercent) - Math.abs(a.priceChangePercent))
          .slice(0, 10);
        setMarkets(filtered);
      } catch (err) {
        console.error('Errore Binance API:', err);
      }
    };

    fetchMarkets();
    const interval = setInterval(fetchMarkets, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="main-content">
      <section className="column markets">
        <h2>Markets</h2>
        {markets.map(item => (
          <Link
            to={`/asset/${item.symbol}`}
            key={item.symbol}
            className="card link-card"
          >
            <div><strong>{item.symbol}</strong></div>
            <div>${parseFloat(item.lastPrice).toFixed(4)}</div>
            <div style={{ color: item.priceChangePercent >= 0 ? 'lightgreen' : 'red' }}>
              {parseFloat(item.priceChangePercent).toFixed(2)}%
            </div>
          </Link>
        ))}
      </section>

      <section className="column forecasts">
        <h2>Forecasts</h2>
        <div className="card">BTC/USDT - UP 70%</div>
        <div className="card">ETH/USDT - DOWN 60%</div>
      </section>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>TO Trade</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/asset/:symbol" element={<AssetDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
