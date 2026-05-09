import React from 'react';

function DematBenefits() {
  return (
    <div
      style={{
        width: "85%",
        margin: "120px auto",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top Section : Image + right benefits */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "120px",
          justifyContent: "center",
        }}
      >
        {/* Left Image */}
        <div>
          <img className='img'
            src="./media/images/acop-benefits.svg"
            alt="benefits"
            style={{ width: "420px" }}
          />
          {/* Bottom Heading */}
      <h4
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontWeight: "500",
        //   opacity: "95%"
        }}
      >
        Benefits of opening a LigteEdge demat account
      </h4>
        </div>

        {/* Right Text Content */}
        <div style={{ maxWidth: "480px" }}>
          {/* Benefit 1 */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ margin: "0 0 30px", fontWeight: "500" }}>
              Unbeatable pricing
            </h3>
            <p style={{ margin: "0 0 20px", color: "#444", lineHeight: "1.6" }}>
              Zero charges for equity & mutual fund investments.
              Flat ₹20 fees for intraday and F&O trades.
            </p>
          </div>

          {/* Benefit 2 */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ margin: "0 0 30px", fontWeight: "500" }}>
              Best investing experience
            </h3>
            <p style={{ margin: "0 0 20px", color: "#444", lineHeight: "1.6" }}>
              Simple and intuitive trading platform with an
              easy-to-understand user interface.
            </p>
          </div>

          {/* Benefit 3 */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ margin: "0 0 30px", fontWeight: "500" }}>
              No spam or gimmicks
            </h3>
            <p style={{ margin: "0 0 20px", color: "#444", lineHeight: "1.6" }}>
              Committed to transparency — no gimmicks, spam,
              “gamification”, or intrusive push notifications.
            </p>
          </div>

          {/* Benefit 4 */}
          <div>
            <h3 style={{ margin: "0 0 30px", fontWeight: "500" }}>
              The LightEdge universe
            </h3>
            <p style={{ margin: "0 0 20px", color: "#444", lineHeight: "1.6" }}>
              More than just an app — gain free access to the entire
              ecosystem of our partner products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DematBenefits;
