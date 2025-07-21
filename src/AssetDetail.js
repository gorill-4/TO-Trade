import React from 'react';
import { useParams, Link } from 'react-router-dom';

function AssetDetail() {
  const { symbol } = useParams();

  return (
    <div className="asset-detail">
      <Link to="/" className="back-button">← Torna indietro</Link>
      <h2>{symbol}</h2>
      <div className="tradingview-widget">
        <iframe
          title="chart"
          src={`https://www.tradingview.com/embed-widget/mini-symbol-overview/?symbol=BINANCE:${symbol}&locale=en`}
          width="100%"
          height="400"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}

export default AssetDetail;
