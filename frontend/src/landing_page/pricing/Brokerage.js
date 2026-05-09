// import React from 'react';

// function Brokerage() {
//     return (
//         <h1>Brokerage</h1>
//      );
// }

// export default Brokerage;

import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col-6 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">Brokerage calculator</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5", fontSize: "12px" }}
            className="text-mut"
          >
            <li>
              Call & Trade and RMS auto-squareoff:Additional charges of ₹50 +
              GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>
        {/* <div className="col-4 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of charges</h3>
          </a>
          
        </div> */}
        <div className="col-6 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of charges</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5", fontSize: "12px" }}
            className="text-mut"
          >
            <li>Annual Demat Account Maintenance (AMC): ₹300 + GST per year</li>
            <li>Call & Trade (phone orders): ₹50 + GST per order</li>
            <li>
              SMS / Email alerts: ₹10 + GST per month (or ₹100 + GST per year)
            </li>
            <li>
              Funds transfer via UPI / Net-banking: ₹25 + GST per transfer
            </li>
            <li>
              Cheque deposit (clearance processing): ₹0 (free) — ₹25 extra for
              manual processing
            </li>
            <li>
              Demat Transaction Charges (CDSL/NSDL): ₹14 per certificate (for
              physical share certificates)
            </li>
            <li>Partial physical delivery request: ₹20 per request</li>
            <li>Account closure within 6 months: ₹150 + GST</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
