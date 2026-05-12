


// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import axios from "axios";

// const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:3003"}/api/funds`;

// const Funds = () => {
//   const [funds, setFunds] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [processing, setProcessing] = useState("");
//   const [receipt, setReceipt] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const receiptRef = useRef(null);
//   const userId = localStorage.getItem("userId");
//   const userName = localStorage.getItem("userName") || "User";
//   const userEmail = localStorage.getItem("userEmail") || "";

//   const formatAmount = (value) => {
//     const number = Number(value || 0);
//     return number.toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const fetchFunds = useCallback(async () => {
//     try {
//       setLoading(true);

//       if (!userId) {
//         setMessage("Please login to view funds.");
//         return;
//       }

//       const response = await axios.get(`${API_URL}?userId=${userId}`);
//       setFunds(response.data);
//       setMessage("");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to load funds");
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchFunds();
//   }, [fetchFunds]);

//   const validateAmount = () => {
//     const value = Number(amount);

//     if (!Number.isFinite(value) || value <= 0) {
//       setMessage("Please enter a valid amount.");
//       return null;
//     }

//     return value;
//   };

//   const handleAddFunds = async () => {
//     const value = validateAmount();
//     if (!value || !userId) return;

//     try {
//       setProcessing("add");

//       const response = await axios.post(`${API_URL}/add`, {
//         userId,
//         amount: value,
//       });

//       setFunds(response.data.fund);
//       setAmount("");
//       setReceipt(null);
//       setMessage(response.data.message || "Funds added successfully.");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to add funds.");
//     } finally {
//       setProcessing("");
//     }
//   };

//   const handleWithdraw = async () => {
//     const value = validateAmount();
//     if (!value || !userId) return;

//     try {
//       setProcessing("withdraw");

//       const response = await axios.post(`${API_URL}/withdraw`, {
//         userId,
//         amount: value,
//       });

//       const transaction = response.data.fund.transactions?.[0];

//       setFunds(response.data.fund);
//       setReceipt({
//         transactionId: transaction?._id || Date.now(),
//         userName,
//         userEmail,
//         amount: value,
//         balanceAfter: response.data.fund.availableCash,
//         date: new Date().toLocaleString(),
//         type: "WITHDRAW",
//       });

//       setAmount("");
//       setMessage(response.data.message || "Withdrawal successful.");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to withdraw funds.");
//     } finally {
//       setProcessing("");
//     }
//   };

//   const printReceipt = () => {
//     window.print();
//   };

//   const cancelReceipt = () => {
//     setReceipt(null);
//   };

//   const downloadReceipt = () => {
//     if (!receipt) return;

//     const printWindow = window.open("", "_blank");

//     if (!printWindow) {
//       alert("Please allow popups to download the PDF receipt.");
//       return;
//     }

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>LightEdge Withdrawal Receipt</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               padding: 32px;
//               color: #202124;
//             }

//             .receipt {
//               max-width: 720px;
//               margin: 0 auto;
//               border: 1px solid #e5e7eb;
//               border-radius: 12px;
//               padding: 28px;
//             }

//             .header {
//               border-bottom: 1px solid #e5e7eb;
//               padding-bottom: 16px;
//               margin-bottom: 20px;
//             }

//             h1 {
//               margin: 0;
//               font-size: 24px;
//             }

//             .brand {
//               margin-top: 6px;
//               color: #6b7280;
//               font-size: 14px;
//             }

//             .grid {
//               display: grid;
//               grid-template-columns: 1fr 1fr;
//               gap: 14px;
//             }

//             .box {
//               border: 1px solid #eef2f7;
//               border-radius: 8px;
//               padding: 14px;
//               background: #fbfdff;
//             }

//             .label {
//               display: block;
//               color: #6b7280;
//               font-size: 12px;
//               margin-bottom: 6px;
//             }

//             .value {
//               font-weight: 700;
//               font-size: 14px;
//               word-break: break-word;
//             }

//             .negative {
//               color: #e53935;
//             }

//             .balance {
//               color: #387ed1;
//             }

//             .success {
//               color: #1f9d55;
//             }

//             .note {
//               border-top: 1px solid #e5e7eb;
//               margin-top: 20px;
//               padding-top: 14px;
//               color: #6b7280;
//               font-size: 12px;
//             }

//             @media print {
//               body {
//                 padding: 0;
//               }

//               .receipt {
//                 border: none;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="receipt">
//             <div class="header">
//               <h1>Withdrawal Receipt</h1>
//               <div class="brand">LIGHTEDGE Funds</div>
//             </div>

//             <div class="grid">
//               <div class="box">
//                 <span class="label">Transaction ID</span>
//                 <div class="value">${receipt.transactionId}</div>
//               </div>

//               <div class="box">
//                 <span class="label">Account holder</span>
//                 <div class="value">${receipt.userName}</div>
//               </div>

//               <div class="box">
//                 <span class="label">Email</span>
//                 <div class="value">${receipt.userEmail || "N/A"}</div>
//               </div>

//               <div class="box">
//                 <span class="label">Transaction type</span>
//                 <div class="value">Withdrawal</div>
//               </div>

//               <div class="box">
//                 <span class="label">Amount withdrawn</span>
//                 <div class="value negative">-₹${formatAmount(receipt.amount)}</div>
//               </div>

//               <div class="box">
//                 <span class="label">Remaining balance</span>
//                 <div class="value balance">₹${formatAmount(receipt.balanceAfter)}</div>
//               </div>

//               <div class="box">
//                 <span class="label">Date & time</span>
//                 <div class="value">${receipt.date}</div>
//               </div>

//               <div class="box">
//                 <span class="label">Status</span>
//                 <div class="value success">Successful</div>
//               </div>
//             </div>

//             <div class="note">
//               This is a system-generated receipt for your fund withdrawal.
//             </div>
//           </div>

//           <script>
//             window.onload = function () {
//               window.print();
//             };
//           </script>
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//   };

//   const transactions = useMemo(() => {
//     return funds?.transactions || [];
//   }, [funds]);

//   if (loading) {
//     return <p style={{ padding: "24px" }}>Loading funds...</p>;
//   }

//   if (!funds) {
//     return <p style={{ padding: "24px", color: "#e53935" }}>{message}</p>;
//   }

//   return (
//     <>
//       <div className="funds-page">
//         <div className="funds-action-bar">
//           <div>
//             <h3>Funds</h3>
//             <p>Manage your available trading balance</p>
//           </div>

//           <div className="funds-controls">
//             <input
//               type="number"
//               placeholder="Enter amount"
//               value={amount}
//               min="1"
//               onChange={(e) => setAmount(e.target.value)}
//             />

//             <button
//               className="fund-btn add"
//               onClick={handleAddFunds}
//               disabled={processing !== ""}
//             >
//               {processing === "add" ? "Adding..." : "Add funds"}
//             </button>

//             <button
//               className="fund-btn withdraw"
//               onClick={handleWithdraw}
//               disabled={processing !== ""}
//             >
//               {processing === "withdraw" ? "Withdrawing..." : "Withdraw"}
//             </button>
//           </div>
//         </div>

//         {message && <div className="fund-message">{message}</div>}

//         {receipt && (
//           <div className="receipt-card" ref={receiptRef}>
//             <div className="receipt-header">
//               <div>
//                 <h3>Withdrawal Receipt</h3>
//                 <p>LIGHTEDGE Funds</p>
//               </div>

//               <div className="receipt-actions no-print">
//                 <button onClick={downloadReceipt}>Download PDF</button>
//                 <button onClick={printReceipt}>Print</button>
//                 <button className="cancel" onClick={cancelReceipt}>
//                   Cancel
//                 </button>
//               </div>
//             </div>

//             <div className="receipt-grid">
//               <div>
//                 <span>Transaction ID</span>
//                 <strong>{receipt.transactionId}</strong>
//               </div>

//               <div>
//                 <span>Account holder</span>
//                 <strong>{receipt.userName}</strong>
//               </div>

//               <div>
//                 <span>Amount withdrawn</span>
//                 <strong className="negative">
//                   -₹{formatAmount(receipt.amount)}
//                 </strong>
//               </div>

//               <div>
//                 <span>Remaining balance</span>
//                 <strong className="balance">
//                   ₹{formatAmount(receipt.balanceAfter)}
//                 </strong>
//               </div>

//               <div>
//                 <span>Date & time</span>
//                 <strong>{receipt.date}</strong>
//               </div>

//               <div>
//                 <span>Status</span>
//                 <strong className="success">Successful</strong>
//               </div>
//             </div>

//             <p className="receipt-note">
//               This is a system-generated receipt for your fund withdrawal.
//             </p>
//           </div>
//         )}

//         <div className="funds-layout">
//           <div className="fund-summary-card">
//             <div className="summary-title">
//               <span>Equity</span>
//               <strong>Available Balance</strong>
//             </div>

//             <h2>₹{formatAmount(funds.availableCash)}</h2>

//             <div className="summary-list">
//               <div>
//                 <p>Available margin</p>
//                 <strong>₹{formatAmount(funds.availableMargin)}</strong>
//               </div>

//               <div>
//                 <p>Used margin</p>
//                 <strong>₹{formatAmount(funds.usedMargin)}</strong>
//               </div>

//               <div>
//                 <p>Opening balance</p>
//                 <strong>₹{formatAmount(funds.openingBalance)}</strong>
//               </div>

//               <div>
//                 <p>Total payin</p>
//                 <strong>₹{formatAmount(funds.payin)}</strong>
//               </div>
//             </div>
//           </div>

//           <div className="activity-card">
//             <div className="activity-header">
//               <div>
//                 <h3>Fund activity</h3>
//                 <p>Add funds, withdrawals, and remaining balance</p>
//               </div>
//               <span>{transactions.length}</span>
//             </div>

//             {transactions.length === 0 ? (
//               <div className="empty-activity">
//                 <h4>No fund activity yet</h4>
//                 <p>Add or withdraw funds to see your history here.</p>
//               </div>
//             ) : (
//               <div className="activity-list">
//                 {transactions.map((item) => {
//                   const isAdd = item.type === "ADD";

//                   return (
//                     <div
//                       className={`activity-item ${isAdd ? "add" : "withdraw"}`}
//                       key={item._id || item.createdAt}
//                     >
//                       <div className="activity-left">
//                         <div className="activity-icon">
//                           {isAdd ? "+" : "-"}
//                         </div>

//                         <div>
//                           <h4>
//                             {isAdd ? "Funds added" : "Funds withdrawn"}
//                           </h4>
//                           <p>
//                             {item.createdAt
//                               ? new Date(item.createdAt).toLocaleString()
//                               : "Just now"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="activity-right">
//                         <strong className={isAdd ? "positive" : "negative"}>
//                           {isAdd ? "+" : "-"}₹{formatAmount(item.amount)}
//                         </strong>

//                         <span>
//                           Balance: ₹{formatAmount(item.balanceAfter)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .funds-page {
//           padding-bottom: 40px;
//         }

//         .funds-action-bar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 20px;
//           padding: 18px 20px;
//           border: 1px solid #e8edf5;
//           border-radius: 10px;
//           background: #ffffff;
//           box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
//         }

//         .funds-action-bar h3 {
//           margin: 0;
//           color: #202124;
//           font-size: 22px;
//         }

//         .funds-action-bar p {
//           margin: 6px 0 0;
//           color: #7a8190;
//           font-size: 13px;
//         }

//         .funds-controls {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           flex-wrap: wrap;
//           justify-content: flex-end;
//         }

//         .funds-controls input {
//           width: 180px;
//           padding: 11px 12px;
//           border: 1px solid #d9e0ea;
//           border-radius: 8px;
//           outline: none;
//           font-size: 14px;
//         }

//         .funds-controls input:focus {
//           border-color: #387ed1;
//           box-shadow: 0 0 0 3px rgba(56, 126, 209, 0.12);
//         }

//         .fund-btn {
//           border: none;
//           border-radius: 8px;
//           padding: 11px 16px;
//           color: #fff;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .fund-btn:disabled {
//           opacity: 0.65;
//           cursor: not-allowed;
//         }

//         .fund-btn.add {
//           background: #1f9d55;
//         }

//         .fund-btn.withdraw {
//           background: #e53935;
//         }

//         .fund-message {
//           margin-top: 14px;
//           padding: 12px 14px;
//           border-radius: 8px;
//           color: #275f9d;
//           background: #f0f7ff;
//           border: 1px solid #d6e9ff;
//           font-weight: 600;
//         }

//         .funds-layout {
//           display: grid;
//           grid-template-columns: minmax(280px, 0.9fr) minmax(360px, 1.1fr);
//           gap: 20px;
//           margin-top: 20px;
//           align-items: start;
//         }

//         .fund-summary-card,
//         .activity-card,
//         .receipt-card {
//           background: #fff;
//           border: 1px solid #e8edf5;
//           border-radius: 10px;
//           box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
//         }

//         .fund-summary-card {
//           padding: 22px;
//         }

//         .summary-title {
//           display: flex;
//           justify-content: space-between;
//           gap: 12px;
//           color: #7a8190;
//           font-size: 13px;
//         }

//         .summary-title strong {
//           color: #387ed1;
//         }

//         .fund-summary-card h2 {
//           margin: 18px 0;
//           color: #1f2937;
//           font-size: 34px;
//           font-weight: 700;
//         }

//         .summary-list {
//           display: grid;
//           gap: 12px;
//         }

//         .summary-list div {
//           display: flex;
//           justify-content: space-between;
//           gap: 12px;
//           border-top: 1px solid #eef2f7;
//           padding-top: 12px;
//         }

//         .summary-list p {
//           margin: 0;
//           color: #7a8190;
//           font-size: 13px;
//         }

//         .summary-list strong {
//           color: #202124;
//           font-size: 14px;
//         }

//         .activity-card {
//           overflow: hidden;
//         }

//         .activity-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 14px;
//           padding: 18px 20px;
//           border-bottom: 1px solid #eef2f7;
//           background: #f8fafc;
//         }

//         .activity-header h3 {
//           margin: 0;
//           color: #202124;
//           font-size: 19px;
//         }

//         .activity-header p {
//           margin: 5px 0 0;
//           color: #7a8190;
//           font-size: 13px;
//         }

//         .activity-header span {
//           min-width: 34px;
//           height: 28px;
//           border-radius: 999px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           background: #eaf3ff;
//           color: #387ed1;
//           font-weight: 800;
//         }

//         .empty-activity {
//           padding: 38px 20px;
//           text-align: center;
//           color: #7a8190;
//         }

//         .empty-activity h4 {
//           margin: 0 0 8px;
//           color: #202124;
//         }

//         .activity-list {
//           max-height: 430px;
//           overflow-y: auto;
//           padding: 12px;
//         }

//         .activity-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 14px;
//           padding: 14px;
//           margin-bottom: 10px;
//           border-radius: 10px;
//           border: 1px solid #edf1f5;
//         }

//         .activity-item.add {
//           background: #f6fff9;
//         }

//         .activity-item.withdraw {
//           background: #fff7f7;
//         }

//         .activity-left {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .activity-icon {
//           width: 38px;
//           height: 38px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 22px;
//           font-weight: 900;
//         }

//         .activity-item.add .activity-icon {
//           background: #ddf7e7;
//           color: #1f9d55;
//         }

//         .activity-item.withdraw .activity-icon {
//           background: #ffe0e0;
//           color: #e53935;
//         }

//         .activity-left h4 {
//           margin: 0;
//           color: #202124;
//           font-size: 14px;
//         }

//         .activity-left p {
//           margin: 4px 0 0;
//           color: #7a8190;
//           font-size: 12px;
//         }

//         .activity-right {
//           text-align: right;
//           display: grid;
//           gap: 4px;
//         }

//         .activity-right strong {
//           font-size: 15px;
//         }

//         .activity-right span {
//           color: #7a8190;
//           font-size: 12px;
//         }

//         .positive {
//           color: #1f9d55;
//         }

//         .negative {
//           color: #e53935;
//         }

//         .balance {
//           color: #387ed1;
//         }

//         .success {
//           color: #1f9d55;
//         }

//         .receipt-card {
//           margin-top: 18px;
//           padding: 20px;
//         }

//         .receipt-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 14px;
//           border-bottom: 1px solid #eef2f7;
//           padding-bottom: 14px;
//         }

//         .receipt-header h3 {
//           margin: 0;
//           color: #202124;
//         }

//         .receipt-header p {
//           margin: 5px 0 0;
//           color: #7a8190;
//           font-size: 13px;
//         }

//         .receipt-actions {
//           display: flex;
//           gap: 8px;
//         }

//         .receipt-actions button {
//           border: none;
//           border-radius: 8px;
//           padding: 9px 13px;
//           background: #387ed1;
//           color: #fff;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .receipt-actions button.cancel {
//           background: #9ca3af;
//         }

//         .receipt-grid {
//           display: grid;
//           grid-template-columns: repeat(2, minmax(0, 1fr));
//           gap: 14px;
//           margin-top: 16px;
//         }

//         .receipt-grid div {
//           padding: 12px;
//           border: 1px solid #eef2f7;
//           border-radius: 8px;
//           background: #fbfdff;
//         }

//         .receipt-grid span {
//           display: block;
//           color: #7a8190;
//           font-size: 12px;
//           margin-bottom: 6px;
//         }

//         .receipt-grid strong {
//           color: #202124;
//           font-size: 14px;
//           word-break: break-word;
//         }

//         .receipt-grid strong.negative {
//           color: #e53935;
//         }

//         .receipt-grid strong.balance {
//           color: #387ed1;
//         }

//         .receipt-grid strong.success {
//           color: #1f9d55;
//         }

//         .receipt-note {
//           margin: 16px 0 0;
//           padding-top: 12px;
//           border-top: 1px solid #eef2f7;
//           color: #7a8190;
//           font-size: 12px;
//         }

//         @media (max-width: 900px) {
//           .funds-action-bar,
//           .activity-item,
//           .receipt-header {
//             flex-direction: column;
//             align-items: stretch;
//           }

//           .funds-layout,
//           .receipt-grid {
//             grid-template-columns: 1fr;
//           }

//           .activity-right {
//             text-align: left;
//           }
//         }

//         @media print {
//           body * {
//             visibility: hidden;
//           }

//           .receipt-card,
//           .receipt-card * {
//             visibility: visible;
//           }

//           .receipt-card {
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 100%;
//             box-shadow: none;
//             border: none;
//           }

//           .no-print {
//             display: none !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Funds;



import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:3003"}/api/funds`;

// ── Limits ──────────────────────────────────────────────────────────────────
const MIN_AMOUNT        = 100;
const MAX_ADD_PER_TXN   = 100000;   // ₹1,00,000 per transaction
const MAX_WALLET_BAL    = 1000000;  // ₹10,00,000 total wallet cap
const MAX_WITHDRAW      = 50000;    // ₹50,000 per withdrawal
const QUICK_AMOUNTS     = [1000, 5000, 10000, 25000];

const Funds = () => {
  const [funds, setFunds]         = useState(null);
  const [amount, setAmount]       = useState("");
  const [message, setMessage]     = useState({ text: "", type: "" });
  const [processing, setProcessing] = useState("");
  const [receipt, setReceipt]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("add"); // "add" | "withdraw"

  const receiptRef = useRef(null);
  const userId   = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "";

  const formatAmount = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const currentBalance = Number(funds?.availableCash || 0);
  const numAmount      = Number(amount) || 0;

  // ── Live validation ──────────────────────────────────────────────────────
  const addValidation = useMemo(() => {
    if (!amount) return { ok: false, error: "" };
    if (numAmount % 100 !== 0)
      return { ok: false, error: "Amount must be a multiple of ₹100." };
    if (numAmount < MIN_AMOUNT)
      return { ok: false, error: `Minimum add amount is ₹${MIN_AMOUNT.toLocaleString("en-IN")}.` };
    if (numAmount > MAX_ADD_PER_TXN)
      return { ok: false, error: `Maximum ₹${MAX_ADD_PER_TXN.toLocaleString("en-IN")} per transaction.` };
    if (currentBalance + numAmount > MAX_WALLET_BAL)
      return {
        ok: false,
        error: `Wallet limit is ₹${MAX_WALLET_BAL.toLocaleString("en-IN")}. You can add up to ₹${(MAX_WALLET_BAL - currentBalance).toLocaleString("en-IN")} more.`,
      };
    return { ok: true, error: "" };
  }, [amount, numAmount, currentBalance]);

  const withdrawValidation = useMemo(() => {
    if (!amount) return { ok: false, error: "" };
    if (numAmount % 100 !== 0)
      return { ok: false, error: "Amount must be a multiple of ₹100." };
    if (numAmount < MIN_AMOUNT)
      return { ok: false, error: `Minimum withdrawal is ₹${MIN_AMOUNT.toLocaleString("en-IN")}.` };
    if (numAmount > MAX_WITHDRAW)
      return { ok: false, error: `Maximum ₹${MAX_WITHDRAW.toLocaleString("en-IN")} per withdrawal.` };
    if (numAmount > currentBalance)
      return { ok: false, error: `Insufficient funds. Available: ₹${formatAmount(currentBalance)}.` };
    return { ok: true, error: "" };
  }, [amount, numAmount, currentBalance]);

  const validation = activeTab === "add" ? addValidation : withdrawValidation;

  const balanceAfter =
    activeTab === "add"
      ? currentBalance + numAmount
      : currentBalance - numAmount;

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchFunds = useCallback(async () => {
    try {
      setLoading(true);
      if (!userId) { setMessage({ text: "Please login to view funds.", type: "error" }); return; }
      const response = await axios.get(`${API_URL}?userId=${userId}`);
      setFunds(response.data);
      setMessage({ text: "", type: "" });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Failed to load funds.", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchFunds(); }, [fetchFunds]);

  // ── Add funds ────────────────────────────────────────────────────────────
  const handleAddFunds = async () => {
    if (!addValidation.ok || !userId) return;
    try {
      setProcessing("add");
      const response = await axios.post(`${API_URL}/add`, { userId, amount: numAmount });
      setFunds(response.data.fund);
      setAmount("");
      setReceipt(null);
      setMessage({ text: `✓ ₹${formatAmount(numAmount)} added successfully!`, type: "success" });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Failed to add funds.", type: "error" });
    } finally {
      setProcessing("");
    }
  };

  // ── Withdraw ─────────────────────────────────────────────────────────────
  const handleWithdraw = async () => {
    if (!withdrawValidation.ok || !userId) return;
    try {
      setProcessing("withdraw");
      const response = await axios.post(`${API_URL}/withdraw`, { userId, amount: numAmount });
      const transaction = response.data.fund.transactions?.[0];
      setFunds(response.data.fund);
      setReceipt({
        transactionId: transaction?._id || Date.now(),
        userName, userEmail,
        amount: numAmount,
        balanceAfter: response.data.fund.availableCash,
        date: new Date().toLocaleString(),
        type: "WITHDRAW",
      });
      setAmount("");
      setMessage({ text: `✓ ₹${formatAmount(numAmount)} withdrawn successfully!`, type: "success" });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Failed to withdraw funds.", type: "error" });
    } finally {
      setProcessing("");
    }
  };

  const downloadReceipt = () => {
    if (!receipt) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) { alert("Please allow popups to download the receipt."); return; }
    printWindow.document.write(`<!DOCTYPE html><html><head><title>LightEdge Receipt</title>
      <style>body{font-family:Arial,sans-serif;padding:32px;color:#202124}.receipt{max-width:720px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;padding:28px}.header{border-bottom:1px solid #e5e7eb;padding-bottom:16px;margin-bottom:20px}h1{margin:0;font-size:24px}.brand{margin-top:6px;color:#6b7280;font-size:14px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.box{border:1px solid #eef2f7;border-radius:8px;padding:14px;background:#fbfdff}.label{display:block;color:#6b7280;font-size:12px;margin-bottom:6px}.value{font-weight:700;font-size:14px;word-break:break-word}.negative{color:#e53935}.balance{color:#387ed1}.success{color:#1f9d55}.note{border-top:1px solid #e5e7eb;margin-top:20px;padding-top:14px;color:#6b7280;font-size:12px}</style>
      </head><body><div class="receipt"><div class="header"><h1>Withdrawal Receipt</h1><div class="brand">LIGHTEDGE Funds</div></div>
      <div class="grid">
        <div class="box"><span class="label">Transaction ID</span><div class="value">${receipt.transactionId}</div></div>
        <div class="box"><span class="label">Account Holder</span><div class="value">${receipt.userName}</div></div>
        <div class="box"><span class="label">Amount Withdrawn</span><div class="value negative">-₹${formatAmount(receipt.amount)}</div></div>
        <div class="box"><span class="label">Remaining Balance</span><div class="value balance">₹${formatAmount(receipt.balanceAfter)}</div></div>
        <div class="box"><span class="label">Date & Time</span><div class="value">${receipt.date}</div></div>
        <div class="box"><span class="label">Status</span><div class="value success">Successful</div></div>
      </div>
      <div class="note">This is a system-generated receipt for your fund withdrawal.</div>
      </div><script>window.onload=function(){window.print();};</script></body></html>`);
    printWindow.document.close();
  };

  const transactions = useMemo(() => funds?.transactions || [], [funds]);

  if (loading) return <p style={{ padding: "24px" }}>Loading funds...</p>;
  if (!funds)  return <p style={{ padding: "24px", color: "#e53935" }}>{message.text}</p>;

  return (
    <>
      <div className="funds-page">

        {/* ── Top action bar ── */}
        <div className="funds-action-bar">
          <div>
            <h3>Funds</h3>
            <p>Manage your available trading balance</p>
          </div>

          <div className="funds-controls-wrap">

            {/* Tab switcher */}
            <div className="funds-tabs">
              <button
                className={`funds-tab ${activeTab === "add" ? "active-add" : ""}`}
                onClick={() => { setActiveTab("add"); setAmount(""); setMessage({ text: "", type: "" }); }}
              >
                Add Funds
              </button>
              <button
                className={`funds-tab ${activeTab === "withdraw" ? "active-withdraw" : ""}`}
                onClick={() => { setActiveTab("withdraw"); setAmount(""); setMessage({ text: "", type: "" }); }}
              >
                Withdraw
              </button>
            </div>

            {/* Quick amount buttons (add only) */}
            {activeTab === "add" && (
              <div className="quick-amounts">
                {QUICK_AMOUNTS.map((q) => (
                  <button
                    key={q}
                    className="quick-btn"
                    onClick={() => { setAmount(String(q)); setMessage({ text: "", type: "" }); }}
                  >
                    +₹{q.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="funds-input-row">
              <div className="funds-input-wrap">
                <span className="funds-rupee">₹</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  min={MIN_AMOUNT}
                  step="100"
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setMessage({ text: "", type: "" });
                  }}
                  className={validation.error ? "input-error" : ""}
                />
              </div>

              {activeTab === "add" ? (
                <button
                  className="fund-btn add"
                  onClick={handleAddFunds}
                  disabled={!addValidation.ok || processing !== ""}
                >
                  {processing === "add" ? "Adding..." : "Add Funds"}
                </button>
              ) : (
                <button
                  className="fund-btn withdraw"
                  onClick={handleWithdraw}
                  disabled={!withdrawValidation.ok || processing !== ""}
                >
                  {processing === "withdraw" ? "Withdrawing..." : "Withdraw"}
                </button>
              )}
            </div>

            {/* Inline validation error */}
            {validation.error && (
              <div className="fund-inline-error">⚠ {validation.error}</div>
            )}

            {/* Live balance preview */}
            {numAmount > 0 && validation.ok && (
              <div className="fund-preview">
                <span>Balance after:</span>
                <strong style={{ color: activeTab === "add" ? "#1f9d55" : "#e53935" }}>
                  ₹{formatAmount(balanceAfter)}
                </strong>
              </div>
            )}

            {/* Limits hint */}
            <div className="fund-limits-hint">
              {activeTab === "add"
                ? `Min ₹100 • Max ₹1,00,000/txn • Wallet cap ₹10,00,000 • Multiples of ₹100`
                : `Min ₹100 • Max ₹50,000/txn • Available: ₹${formatAmount(currentBalance)} • Multiples of ₹100`}
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`fund-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Receipt */}
        {receipt && (
          <div className="receipt-card" ref={receiptRef}>
            <div className="receipt-header">
              <div>
                <h3>Withdrawal Receipt</h3>
                <p>LIGHTEDGE Funds</p>
              </div>
              <div className="receipt-actions no-print">
                <button onClick={downloadReceipt}>Download PDF</button>
                <button onClick={() => window.print()}>Print</button>
                <button className="cancel" onClick={() => setReceipt(null)}>✕ Close</button>
              </div>
            </div>

            <div className="receipt-grid">
              <div><span>Transaction ID</span><strong>{receipt.transactionId}</strong></div>
              <div><span>Account Holder</span><strong>{receipt.userName}</strong></div>
              <div><span>Amount Withdrawn</span><strong className="negative">-₹{formatAmount(receipt.amount)}</strong></div>
              <div><span>Remaining Balance</span><strong className="balance">₹{formatAmount(receipt.balanceAfter)}</strong></div>
              <div><span>Date & Time</span><strong>{receipt.date}</strong></div>
              <div><span>Status</span><strong className="success">Successful</strong></div>
            </div>

            <p className="receipt-note">This is a system-generated receipt for your fund withdrawal.</p>
          </div>
        )}

        {/* Layout */}
        <div className="funds-layout">

          {/* Summary card */}
          <div className="fund-summary-card">
            <div className="summary-title">
              <span>Equity</span>
              <strong>Available Balance</strong>
            </div>

            <h2>₹{formatAmount(funds.availableCash)}</h2>

            {/* Wallet usage bar */}
            <div className="wallet-bar-wrap">
              <div className="wallet-bar-track">
                <div
                  className="wallet-bar-fill"
                  style={{ width: `${Math.min((currentBalance / MAX_WALLET_BAL) * 100, 100)}%` }}
                />
              </div>
              <div className="wallet-bar-label">
                <span>{((currentBalance / MAX_WALLET_BAL) * 100).toFixed(1)}% of wallet limit used</span>
                <span>Max ₹{MAX_WALLET_BAL.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="summary-list">
              <div><p>Available margin</p><strong>₹{formatAmount(funds.availableMargin)}</strong></div>
              <div><p>Used margin</p><strong>₹{formatAmount(funds.usedMargin)}</strong></div>
              <div><p>Opening balance</p><strong>₹{formatAmount(funds.openingBalance)}</strong></div>
              <div><p>Total payin</p><strong>₹{formatAmount(funds.payin)}</strong></div>
            </div>
          </div>

          {/* Activity card */}
          <div className="activity-card">
            <div className="activity-header">
              <div>
                <h3>Fund activity</h3>
                <p>Add funds, withdrawals, and remaining balance</p>
              </div>
              <span>{transactions.length}</span>
            </div>

            {transactions.length === 0 ? (
              <div className="empty-activity">
                <h4>No fund activity yet</h4>
                <p>Add or withdraw funds to see your history here.</p>
              </div>
            ) : (
              <div className="activity-list">
                {transactions.map((item) => {
                  const isAdd = item.type === "ADD";
                  return (
                    <div
                      className={`activity-item ${isAdd ? "add" : "withdraw"}`}
                      key={item._id || item.createdAt}
                    >
                      <div className="activity-left">
                        <div className="activity-icon">{isAdd ? "+" : "-"}</div>
                        <div>
                          <h4>{isAdd ? "Funds added" : "Funds withdrawn"}</h4>
                          <p>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "Just now"}</p>
                        </div>
                      </div>
                      <div className="activity-right">
                        <strong className={isAdd ? "positive" : "negative"}>
                          {isAdd ? "+" : "-"}₹{formatAmount(item.amount)}
                        </strong>
                        <span>Balance: ₹{formatAmount(item.balanceAfter)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .funds-page { padding-bottom: 40px; }

        /* ── Action bar ── */
        .funds-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          padding: 18px 20px;
          border: 1px solid #e8edf5;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0 8px 24px rgba(15,23,42,0.05);
          flex-wrap: wrap;
        }
        .funds-action-bar h3 { margin: 0; color: #202124; font-size: 22px; }
        .funds-action-bar p  { margin: 6px 0 0; color: #7a8190; font-size: 13px; }

        .funds-controls-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 320px;
          max-width: 480px;
          flex: 1;
        }

        /* ── Tabs ── */
        .funds-tabs {
          display: flex;
          gap: 4px;
          background: #f1f5f9;
          border-radius: 10px;
          padding: 4px;
        }
        .funds-tab {
          flex: 1;
          padding: 9px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #7a8190;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          font-family: inherit;
        }
        .funds-tab.active-add {
          background: #1f9d55;
          color: #fff;
          box-shadow: 0 2px 8px rgba(31,157,85,0.3);
        }
        .funds-tab.active-withdraw {
          background: #e53935;
          color: #fff;
          box-shadow: 0 2px 8px rgba(229,57,53,0.3);
        }

        /* ── Quick amounts ── */
        .quick-amounts {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }
        .quick-btn {
          padding: 6px 12px;
          border: 1.5px solid #387ed1;
          border-radius: 20px;
          background: #eaf2ff;
          color: #387ed1;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          font-family: inherit;
        }
        .quick-btn:hover {
          background: #387ed1;
          color: #fff;
        }

        /* ── Input row ── */
        .funds-input-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .funds-input-wrap {
          position: relative;
          flex: 1;
        }
        .funds-rupee {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #387ed1;
          font-weight: 700;
          font-size: 15px;
          pointer-events: none;
        }
        .funds-input-wrap input {
          width: 100%;
          padding: 11px 12px 11px 28px;
          border: 1.5px solid #d9e0ea;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .funds-input-wrap input:focus {
          border-color: #387ed1;
          box-shadow: 0 0 0 3px rgba(56,126,209,0.12);
        }
        .funds-input-wrap input.input-error {
          border-color: #e53935;
          box-shadow: 0 0 0 3px rgba(229,57,53,0.08);
        }

        .fund-btn {
          border: none;
          border-radius: 8px;
          padding: 11px 18px;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          transition: opacity 0.18s, transform 0.15s;
        }
        .fund-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; }
        .fund-btn:not(:disabled):hover { opacity: 0.9; transform: translateY(-1px); }
        .fund-btn.add      { background: #1f9d55; }
        .fund-btn.withdraw { background: #e53935; }

        /* ── Inline validation ── */
        .fund-inline-error {
          background: #fff5f5;
          border: 1px solid #ffcdd2;
          border-radius: 8px;
          color: #e53935;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 7px 12px;
        }

        /* ── Balance preview ── */
        .fund-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 0.85rem;
          color: #555;
        }
        .fund-preview strong { font-size: 1rem; }

        /* ── Limits hint ── */
        .fund-limits-hint {
          font-size: 0.73rem;
          color: #9ca3af;
          text-align: right;
          line-height: 1.4;
        }

        /* ── Message ── */
        .fund-message {
          margin-top: 14px;
          padding: 12px 14px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .fund-message.success {
          color: #1f5c35;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
        }
        .fund-message.error {
          color: #991b1b;
          background: #fff5f5;
          border: 1px solid #fecaca;
        }
        .fund-message:not(.success):not(.error) {
          color: #275f9d;
          background: #f0f7ff;
          border: 1px solid #d6e9ff;
        }

        /* ── Wallet bar ── */
        .wallet-bar-wrap { margin: 14px 0 18px; }
        .wallet-bar-track {
          height: 6px;
          background: #e8edf5;
          border-radius: 999px;
          overflow: hidden;
        }
        .wallet-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #387ed1, #1f9d55);
          border-radius: 999px;
          transition: width 0.5s ease;
        }
        .wallet-bar-label {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          font-size: 0.72rem;
          color: #9ca3af;
        }

        /* ── Layout ── */
        .funds-layout {
          display: grid;
          grid-template-columns: minmax(280px, 0.9fr) minmax(360px, 1.1fr);
          gap: 20px;
          margin-top: 20px;
          align-items: start;
        }
        .fund-summary-card,
        .activity-card,
        .receipt-card {
          background: #fff;
          border: 1px solid #e8edf5;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(15,23,42,0.05);
        }
        .fund-summary-card { padding: 22px; }
        .summary-title { display: flex; justify-content: space-between; gap: 12px; color: #7a8190; font-size: 13px; }
        .summary-title strong { color: #387ed1; }
        .fund-summary-card h2 { margin: 10px 0 0; color: #1f2937; font-size: 34px; font-weight: 700; }
        .summary-list { display: grid; gap: 12px; }
        .summary-list div { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid #eef2f7; padding-top: 12px; }
        .summary-list p  { margin: 0; color: #7a8190; font-size: 13px; }
        .summary-list strong { color: #202124; font-size: 14px; }

        /* ── Activity ── */
        .activity-card { overflow: hidden; }
        .activity-header { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 18px 20px; border-bottom: 1px solid #eef2f7; background: #f8fafc; }
        .activity-header h3 { margin: 0; color: #202124; font-size: 19px; }
        .activity-header p  { margin: 5px 0 0; color: #7a8190; font-size: 13px; }
        .activity-header span { min-width: 34px; height: 28px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; background: #eaf3ff; color: #387ed1; font-weight: 800; }
        .empty-activity { padding: 38px 20px; text-align: center; color: #7a8190; }
        .empty-activity h4 { margin: 0 0 8px; color: #202124; }
        .activity-list { max-height: 430px; overflow-y: auto; padding: 12px; }
        .activity-item { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 14px; margin-bottom: 10px; border-radius: 10px; border: 1px solid #edf1f5; }
        .activity-item.add      { background: #f6fff9; }
        .activity-item.withdraw { background: #fff7f7; }
        .activity-left { display: flex; align-items: center; gap: 12px; }
        .activity-icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 900; }
        .activity-item.add      .activity-icon { background: #ddf7e7; color: #1f9d55; }
        .activity-item.withdraw .activity-icon { background: #ffe0e0; color: #e53935; }
        .activity-left h4 { margin: 0; color: #202124; font-size: 14px; }
        .activity-left p  { margin: 4px 0 0; color: #7a8190; font-size: 12px; }
        .activity-right { text-align: right; display: grid; gap: 4px; }
        .activity-right strong { font-size: 15px; }
        .activity-right span   { color: #7a8190; font-size: 12px; }
        .positive { color: #1f9d55; }
        .negative { color: #e53935; }
        .balance  { color: #387ed1; }
        .success  { color: #1f9d55; }

        /* ── Receipt ── */
        .receipt-card   { margin-top: 18px; padding: 20px; }
        .receipt-header { display: flex; justify-content: space-between; align-items: center; gap: 14px; border-bottom: 1px solid #eef2f7; padding-bottom: 14px; }
        .receipt-header h3 { margin: 0; color: #202124; }
        .receipt-header p  { margin: 5px 0 0; color: #7a8190; font-size: 13px; }
        .receipt-actions { display: flex; gap: 8px; }
        .receipt-actions button { border: none; border-radius: 8px; padding: 9px 13px; background: #387ed1; color: #fff; font-weight: 700; cursor: pointer; font-family: inherit; }
        .receipt-actions button.cancel { background: #9ca3af; }
        .receipt-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; margin-top: 16px; }
        .receipt-grid div    { padding: 12px; border: 1px solid #eef2f7; border-radius: 8px; background: #fbfdff; }
        .receipt-grid span   { display: block; color: #7a8190; font-size: 12px; margin-bottom: 6px; }
        .receipt-grid strong { color: #202124; font-size: 14px; word-break: break-word; }
        .receipt-grid strong.negative { color: #e53935; }
        .receipt-grid strong.balance  { color: #387ed1; }
        .receipt-grid strong.success  { color: #1f9d55; }
        .receipt-note { margin: 16px 0 0; padding-top: 12px; border-top: 1px solid #eef2f7; color: #7a8190; font-size: 12px; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .funds-action-bar  { flex-direction: column; }
          .funds-controls-wrap { min-width: unset; max-width: 100%; }
          .funds-layout, .receipt-grid { grid-template-columns: 1fr; }
          .activity-item, .receipt-header { flex-direction: column; align-items: stretch; }
          .activity-right { text-align: left; }
        }

        @media print {
          body * { visibility: hidden; }
          .receipt-card, .receipt-card * { visibility: visible; }
          .receipt-card { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none; border: none; }
          .no-print { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Funds;
