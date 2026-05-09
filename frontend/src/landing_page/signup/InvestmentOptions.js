import React from 'react';

function InvestmentOptions() {
  return (
    <div style={{ width: "80%", margin: "80px auto", textAlign: "center", fontFamily: "sans-serif",paddingTop:"60px" }}>

      {/* Heading */}
      <h2 style={{ fontWeight: "500", marginBottom: "60px", fontSize:"170%"}}>
        Investment options with LightEdge demat account
      </h2>

      {/* Grid container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px 120px",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >

        {/* Stocks */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img src="./media/images/stocks-acop.svg" alt="stocks" style={{ width: "110px", height: "80px" }} />
          <div style={{ textAlign: "left" }}>
            <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "500" }}>Stocks</h3>
            <p style={{ marginTop: "5px", color: "gray" }}>
              Invest in all exchange-listed securities
            </p>
          </div>
        </div>

        {/* Mutual funds */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img src="./media/images/mf-acop.svg" alt="mutual funds" style={{ width: "110px", height: "80px" }} />
          <div style={{ textAlign: "left" }}>
            <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "500" }}>Mutual funds</h3>
            <p style={{ marginTop: "5px", color: "gray" }}>
              Invest in commission-free direct mutual funds
            </p>
          </div>
        </div>

        {/* IPO */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img src="./media/images/ipo-acop.svg" alt="ipo" style={{ width: "110px", height: "80px" }} />
          <div style={{ textAlign: "left" }}>
            <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "500" }}>IPO</h3>
            <p style={{ marginTop: "5px", color: "gray" }}>
              Apply to the latest IPOs instantly <br /> via UPI
            </p>
          </div>
        </div>

        {/* Futures & Options */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img src="./media/images/fo-acop.svg" alt="futures" style={{ width: "110px", height: "80px" }} />
          <div style={{ textAlign: "left" }}>
            <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "500" }}>
              Futures & options
            </h3>
            <p style={{ marginTop: "5px", color: "gray" }}>
              Hedge and mitigate market risk <br />
              through simplified F&O trading
            </p>
          </div>
        </div>

      </div>

      {/* Button */}
      <button
      className="p-2 btn btn-primary fs-5"
        style={{
          marginTop: "60px",
          padding: "12px 30px",
          // backgroundColor: "#387ed1",
          border: "none",
          borderRadius: "5px",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Explore Investments
      </button>
    </div>
  );
}

export default InvestmentOptions;
