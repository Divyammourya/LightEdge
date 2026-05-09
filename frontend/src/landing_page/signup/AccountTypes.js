import React from "react";
import './index.css'

function AccountTypes() {
  return (
    <div
      style={{
        width: "85%",
        margin: "100px auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "60px",
          fontWeight: "500",
          fontSize: "28px",
        }}
      >
        Explore different account types
      </h2>

      {/* Grid layout */}
      <div class="cards"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "45px 60px",
        }}
      >
        {/* === CARD 1 === */}
        <div class="cards-card"
          style={{
            position: "relative",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            padding: "35px 30px 30px 30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "25px",
              background: "#e8f1ff",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
            }}
          >
            <i class="fa fa-user-o" aria-hidden="true"></i>
          </div>

          <h3
            style={{
              marginTop: "10px",
              marginBottom: "12px",
              fontSize: "20px",
            }}
          >
            Individual Account
          </h3>
          <p
            style={{
              color: "#555",
              lineHeight: "1.6",
              margin: 0,
              fontSize: "15px",
            }}
          >
            Invest in equity, mutual funds and derivatives
          </p>
        </div>

        {/* === CARD 2 === */}
        <div class="cards-card"
          style={{
            position: "relative",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            padding: "35px 30px 30px 30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "25px",
              background: "#e8f1ff",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
            }}
          >
            <i class="fa fa-users" aria-hidden="true"></i>
          </div>

          <h3
            style={{
              marginTop: "10px",
              marginBottom: "12px",
              fontSize: "20px",
            }}
          >
            HUF Account
          </h3>
          <p
            style={{
              color: "#555",
              lineHeight: "1.6",
              margin: 0,
              fontSize: "15px",
            }}
          >
            Make tax-efficient investments for your family
          </p>
        </div>

        {/* === CARD 3 === */}
        <div class="cards-card"
          style={{
            position: "relative",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            padding: "35px 30px 30px 30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "25px",
              background: "#e8f1ff",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
            }}
          >
            <i class="fa fa-globe" aria-hidden="true"></i>
          </div>

          <h3
            style={{
              marginTop: "10px",
              marginBottom: "12px",
              fontSize: "20px",
            }}
          >
            NRI Account
          </h3>
          <p
            style={{
              color: "#555",
              lineHeight: "1.6",
              margin: 0,
              fontSize: "15px",
            }}
          >
            Invest in equity, mutual funds, debentures, and more
          </p>
        </div>

        {/* === CARD 4 === */}
        <div class="cards-card"
          style={{
            position: "relative",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            padding: "35px 30px 30px 30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "25px",
              background: "#e8f1ff",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
            }}
          >
            <i class="fa fa-child" aria-hidden="true"></i>
          </div>

          <h3
            style={{
              marginTop: "10px",
              marginBottom: "12px",
              fontSize: "20px",
            }}
          >
            Minor Account
          </h3>
          <p
            style={{
              color: "#555",
              lineHeight: "1.6",
              margin: 0,
              fontSize: "15px",
            }}
          >
            Teach your little ones about money & invest for their future with
            them
          </p>
        </div>

        {/* === CARD 5 === */}
        <div class="cards-card"
          style={{
            position: "relative",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            padding: "35px 30px 30px 30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "25px",
              background: "#e8f1ff",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
            }}
          >
            <i class="fa fa-building-o" aria-hidden="true"></i>
          </div>

          <h3
            style={{
              marginTop: "10px",
              marginBottom: "12px",
              fontSize: "20px",
            }}
          >
            Corporate / LLP/ Partnership
          </h3>
          <p
            style={{
              color: "#555",
              lineHeight: "1.6",
              margin: 0,
              fontSize: "15px",
            }}
          >
            Manage your business surplus and investments easily
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountTypes;
