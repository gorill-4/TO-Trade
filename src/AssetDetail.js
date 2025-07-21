import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function AssetDetail() {
  const { symbol } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        setData(response.data);
      } catch (error) {
        console.error('Errore nel caricamento asset:', error);
      }
    };

    fetchAsset();
  }, [symbol]);

  if (!data) return <div className="asset-detail">Caricamento...</div>;

  return (
    <div className="asset-detail">
      <Link to="/" className="back-button">← Torna indietro</Link>
      <h2>{data.symbol}</h2>
      <p>Prezzo attuale: ${parseFloat(data.lastPrice).toFixed(2)}</p>
      <p style={{ color: parseFloat(data.priceChangePercent) >= 0 ? 'lime' : 'red' }}>
        Variazione 24h: {parseFloat(data.priceChangePercent).toFixed(2)}%
      </p>
      <button
        onClick={() => alert('Grafico TradingView in arrivo')}
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}
      >
        Mostra grafico
      </button>
    </div>
  );
}

export default AssetDetail;
