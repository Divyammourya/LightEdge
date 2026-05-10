


import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

const freshAxiosConfig = () => ({
  params: { t: Date.now() },
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

const WatchList = ({ refreshKey }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchStockData = useCallback(async () => {
    try {
      setRefreshing(true);

      const response = await axios.get(
        `${API_URL}/api/auth/stocks`,
        freshAxiosConfig()
      );

      const data = Array.isArray(response.data) ? response.data : [];
      setWatchlist(data);

      const newestTime =
        data.find((stock) => stock.lastUpdated)?.lastUpdated || new Date().toISOString();

      setLastUpdated(new Date(newestTime).toLocaleTimeString());

      const liveCount = data.filter((stock) => stock.isLive).length;

      if (data.length === 0) {
        setMessage("No stock data returned.");
      } else if (liveCount === 0) {
        setMessage("Showing fallback prices. Check FINNHUB_API_KEY or symbol support.");
      } else if (liveCount < data.length) {
        setMessage(`${liveCount}/${data.length} prices live from Finnhub.`);
      } else {
        setMessage("Live from Finnhub.");
      }
    } catch (error) {
      console.error("Watchlist fetch error:", error);
      setMessage("Unable to connect to backend server.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStockData();

    const interval = setInterval(fetchStockData, 60000);

    const handleVisibilityChange = () => {
      if (!document.hidden) fetchStockData();
    };

    window.addEventListener("focus", fetchStockData);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchStockData);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchStockData]);

  useEffect(() => {
    if (refreshKey) fetchStockData();
  }, [refreshKey, fetchStockData]);

  const chartData = useMemo(
    () => ({
      labels: watchlist.map((stock) => stock.name),
      datasets: [
        {
          label: "Price",
          data: watchlist.map((stock) => Number(stock.price) || 0),
          // backgroundColor: [
          //   "rgba(255, 99, 132, 0.5)",
          //   "rgba(54, 162, 235, 0.5)",
          //   "rgba(255, 206, 86, 0.5)",
          //   "rgba(75, 192, 192, 0.5)",
          //   "rgba(153, 102, 255, 0.5)",
          //   "rgba(255, 159, 64, 0.5)",
          //   "rgba(35, 200, 120, 0.5)",
          //   "rgba(80, 120, 255, 0.5)",
          //   "rgba(255, 120, 80, 0.5)",
          // ],
          // borderWidth: 1,
          backgroundColor: [
  "#2563eb", // rich blue
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#14b8a6", // teal
  "#f97316", // orange
  "#ec4899", // pink
],
borderColor: "#06172a",
borderWidth: 2,
hoverOffset: 8,

        },
      ],
    }),
    [watchlist]
  );

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 12px",
          fontSize: "0.75rem",
          color: "#888",
          borderBottom: "1px solid #f0f0f0",
          gap: "8px",
        }}
      >
        <span>{loading ? "Fetching prices..." : refreshing ? "Refreshing..." : message}</span>
        {lastUpdated && <span>Updated: {lastUpdated}</span>}

        <button
          type="button"
          onClick={fetchStockData}
          disabled={refreshing}
          style={{
            border: "none",
            background: "transparent",
            cursor: refreshing ? "not-allowed" : "pointer",
            color: "#387ed1",
            fontWeight: 600,
          }}
        >
          Refresh
        </button>
      </div>

      <ul className="list">
        {loading ? (
          <li style={{ padding: "14px", color: "#777" }}>Loading live prices...</li>
        ) : (
          watchlist.map((stock) => (
            <WatchListItem
              stock={stock}
              key={`${stock.name}-${stock.price}-${stock.lastUpdated || ""}`}
            />
          ))
        )}
      </ul>

      {!loading && watchlist.length > 0 && <DoughnutChart data={chartData} />}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const currency = stock.symbol === "INFY" || stock.symbol === "WIT" || stock.symbol === "HDB" || stock.symbol === "IBN" ? "$" : "₹";

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>

        <div className="itemInfo">
          <span
            className="percent"
            style={{ color: stock.isDown ? "#e53935" : "#1db954" }}
          >
            {stock.percent}
          </span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">
            {currency}
            {stock.price}
          </span>
        </div>
      </div>

      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={() => generalContext.openBuyWindow(uid)}>
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={() => generalContext.openSellWindow(uid)}>
            Sell
          </button>
        </Tooltip>

        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
