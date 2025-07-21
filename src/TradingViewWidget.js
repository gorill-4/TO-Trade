import React, { useEffect } from 'react';

function TradingViewWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.onload = () => {
      new window.TradingView.widget({
        container_id: "tradingview",
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "30",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
      });
    };
    document.getElementById("tradingview").appendChild(script);
  }, []);

  return <div id="tradingview" style={{ height: "500px" }}></div>;
}

export default TradingViewWidget;
