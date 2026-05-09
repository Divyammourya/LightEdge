


// import React, { useEffect, useMemo, useRef, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:3003/api/funds";

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

//   const fetchFunds = async () => {
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
//   };

//   useEffect(() => {
//     fetchFunds();
//   }, []);

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

//   const downloadReceipt = () => {
//     if (!receipt) return;

//     const receiptText = `
// LIGHTEDGE WITHDRAWAL RECEIPT

// Transaction ID: ${receipt.transactionId}
// Account Holder: ${receipt.userName}
// Email: ${receipt.userEmail || "N/A"}
// Transaction Type: Withdrawal
// Amount Withdrawn: INR ${formatAmount(receipt.amount)}
// Remaining Balance: INR ${formatAmount(receipt.balanceAfter)}
// Date & Time: ${receipt.date}

// This is a system-generated receipt.
// `;

//     const blob = new Blob([receiptText], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `LightEdge-withdrawal-receipt-${receipt.transactionId}.txt`;
//     link.click();

//     URL.revokeObjectURL(url);
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
//                 <button onClick={downloadReceipt}>Download</button>
//                 <button onClick={printReceipt}>Print</button>
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



import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3003/api/funds";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  const receiptRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "";

  const formatAmount = (value) => {
    const number = Number(value || 0);
    return number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const fetchFunds = async () => {
    try {
      setLoading(true);

      if (!userId) {
        setMessage("Please login to view funds.");
        return;
      }

      const response = await axios.get(`${API_URL}?userId=${userId}`);
      setFunds(response.data);
      setMessage("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load funds");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const validateAmount = () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setMessage("Please enter a valid amount.");
      return null;
    }

    return value;
  };

  const handleAddFunds = async () => {
    const value = validateAmount();
    if (!value || !userId) return;

    try {
      setProcessing("add");

      const response = await axios.post(`${API_URL}/add`, {
        userId,
        amount: value,
      });

      setFunds(response.data.fund);
      setAmount("");
      setReceipt(null);
      setMessage(response.data.message || "Funds added successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add funds.");
    } finally {
      setProcessing("");
    }
  };

  const handleWithdraw = async () => {
    const value = validateAmount();
    if (!value || !userId) return;

    try {
      setProcessing("withdraw");

      const response = await axios.post(`${API_URL}/withdraw`, {
        userId,
        amount: value,
      });

      const transaction = response.data.fund.transactions?.[0];

      setFunds(response.data.fund);
      setReceipt({
        transactionId: transaction?._id || Date.now(),
        userName,
        userEmail,
        amount: value,
        balanceAfter: response.data.fund.availableCash,
        date: new Date().toLocaleString(),
        type: "WITHDRAW",
      });

      setAmount("");
      setMessage(response.data.message || "Withdrawal successful.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to withdraw funds.");
    } finally {
      setProcessing("");
    }
  };

  const printReceipt = () => {
    window.print();
  };

  const cancelReceipt = () => {
    setReceipt(null);
  };

  const downloadReceipt = () => {
    if (!receipt) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow popups to download the PDF receipt.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>LightEdge Withdrawal Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 32px;
              color: #202124;
            }

            .receipt {
              max-width: 720px;
              margin: 0 auto;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              padding: 28px;
            }

            .header {
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 16px;
              margin-bottom: 20px;
            }

            h1 {
              margin: 0;
              font-size: 24px;
            }

            .brand {
              margin-top: 6px;
              color: #6b7280;
              font-size: 14px;
            }

            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 14px;
            }

            .box {
              border: 1px solid #eef2f7;
              border-radius: 8px;
              padding: 14px;
              background: #fbfdff;
            }

            .label {
              display: block;
              color: #6b7280;
              font-size: 12px;
              margin-bottom: 6px;
            }

            .value {
              font-weight: 700;
              font-size: 14px;
              word-break: break-word;
            }

            .negative {
              color: #e53935;
            }

            .balance {
              color: #387ed1;
            }

            .success {
              color: #1f9d55;
            }

            .note {
              border-top: 1px solid #e5e7eb;
              margin-top: 20px;
              padding-top: 14px;
              color: #6b7280;
              font-size: 12px;
            }

            @media print {
              body {
                padding: 0;
              }

              .receipt {
                border: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>Withdrawal Receipt</h1>
              <div class="brand">LIGHTEDGE Funds</div>
            </div>

            <div class="grid">
              <div class="box">
                <span class="label">Transaction ID</span>
                <div class="value">${receipt.transactionId}</div>
              </div>

              <div class="box">
                <span class="label">Account holder</span>
                <div class="value">${receipt.userName}</div>
              </div>

              <div class="box">
                <span class="label">Email</span>
                <div class="value">${receipt.userEmail || "N/A"}</div>
              </div>

              <div class="box">
                <span class="label">Transaction type</span>
                <div class="value">Withdrawal</div>
              </div>

              <div class="box">
                <span class="label">Amount withdrawn</span>
                <div class="value negative">-₹${formatAmount(receipt.amount)}</div>
              </div>

              <div class="box">
                <span class="label">Remaining balance</span>
                <div class="value balance">₹${formatAmount(receipt.balanceAfter)}</div>
              </div>

              <div class="box">
                <span class="label">Date & time</span>
                <div class="value">${receipt.date}</div>
              </div>

              <div class="box">
                <span class="label">Status</span>
                <div class="value success">Successful</div>
              </div>
            </div>

            <div class="note">
              This is a system-generated receipt for your fund withdrawal.
            </div>
          </div>

          <script>
            window.onload = function () {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const transactions = useMemo(() => {
    return funds?.transactions || [];
  }, [funds]);

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading funds...</p>;
  }

  if (!funds) {
    return <p style={{ padding: "24px", color: "#e53935" }}>{message}</p>;
  }

  return (
    <>
      <div className="funds-page">
        <div className="funds-action-bar">
          <div>
            <h3>Funds</h3>
            <p>Manage your available trading balance</p>
          </div>

          <div className="funds-controls">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              min="1"
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              className="fund-btn add"
              onClick={handleAddFunds}
              disabled={processing !== ""}
            >
              {processing === "add" ? "Adding..." : "Add funds"}
            </button>

            <button
              className="fund-btn withdraw"
              onClick={handleWithdraw}
              disabled={processing !== ""}
            >
              {processing === "withdraw" ? "Withdrawing..." : "Withdraw"}
            </button>
          </div>
        </div>

        {message && <div className="fund-message">{message}</div>}

        {receipt && (
          <div className="receipt-card" ref={receiptRef}>
            <div className="receipt-header">
              <div>
                <h3>Withdrawal Receipt</h3>
                <p>LIGHTEDGE Funds</p>
              </div>

              <div className="receipt-actions no-print">
                <button onClick={downloadReceipt}>Download PDF</button>
                <button onClick={printReceipt}>Print</button>
                <button className="cancel" onClick={cancelReceipt}>
                  Cancel
                </button>
              </div>
            </div>

            <div className="receipt-grid">
              <div>
                <span>Transaction ID</span>
                <strong>{receipt.transactionId}</strong>
              </div>

              <div>
                <span>Account holder</span>
                <strong>{receipt.userName}</strong>
              </div>

              <div>
                <span>Amount withdrawn</span>
                <strong className="negative">
                  -₹{formatAmount(receipt.amount)}
                </strong>
              </div>

              <div>
                <span>Remaining balance</span>
                <strong className="balance">
                  ₹{formatAmount(receipt.balanceAfter)}
                </strong>
              </div>

              <div>
                <span>Date & time</span>
                <strong>{receipt.date}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="success">Successful</strong>
              </div>
            </div>

            <p className="receipt-note">
              This is a system-generated receipt for your fund withdrawal.
            </p>
          </div>
        )}

        <div className="funds-layout">
          <div className="fund-summary-card">
            <div className="summary-title">
              <span>Equity</span>
              <strong>Available Balance</strong>
            </div>

            <h2>₹{formatAmount(funds.availableCash)}</h2>

            <div className="summary-list">
              <div>
                <p>Available margin</p>
                <strong>₹{formatAmount(funds.availableMargin)}</strong>
              </div>

              <div>
                <p>Used margin</p>
                <strong>₹{formatAmount(funds.usedMargin)}</strong>
              </div>

              <div>
                <p>Opening balance</p>
                <strong>₹{formatAmount(funds.openingBalance)}</strong>
              </div>

              <div>
                <p>Total payin</p>
                <strong>₹{formatAmount(funds.payin)}</strong>
              </div>
            </div>
          </div>

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
                        <div className="activity-icon">
                          {isAdd ? "+" : "-"}
                        </div>

                        <div>
                          <h4>
                            {isAdd ? "Funds added" : "Funds withdrawn"}
                          </h4>
                          <p>
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleString()
                              : "Just now"}
                          </p>
                        </div>
                      </div>

                      <div className="activity-right">
                        <strong className={isAdd ? "positive" : "negative"}>
                          {isAdd ? "+" : "-"}₹{formatAmount(item.amount)}
                        </strong>

                        <span>
                          Balance: ₹{formatAmount(item.balanceAfter)}
                        </span>
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
        .funds-page {
          padding-bottom: 40px;
        }

        .funds-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 18px 20px;
          border: 1px solid #e8edf5;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
        }

        .funds-action-bar h3 {
          margin: 0;
          color: #202124;
          font-size: 22px;
        }

        .funds-action-bar p {
          margin: 6px 0 0;
          color: #7a8190;
          font-size: 13px;
        }

        .funds-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .funds-controls input {
          width: 180px;
          padding: 11px 12px;
          border: 1px solid #d9e0ea;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
        }

        .funds-controls input:focus {
          border-color: #387ed1;
          box-shadow: 0 0 0 3px rgba(56, 126, 209, 0.12);
        }

        .fund-btn {
          border: none;
          border-radius: 8px;
          padding: 11px 16px;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .fund-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .fund-btn.add {
          background: #1f9d55;
        }

        .fund-btn.withdraw {
          background: #e53935;
        }

        .fund-message {
          margin-top: 14px;
          padding: 12px 14px;
          border-radius: 8px;
          color: #275f9d;
          background: #f0f7ff;
          border: 1px solid #d6e9ff;
          font-weight: 600;
        }

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
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
        }

        .fund-summary-card {
          padding: 22px;
        }

        .summary-title {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: #7a8190;
          font-size: 13px;
        }

        .summary-title strong {
          color: #387ed1;
        }

        .fund-summary-card h2 {
          margin: 18px 0;
          color: #1f2937;
          font-size: 34px;
          font-weight: 700;
        }

        .summary-list {
          display: grid;
          gap: 12px;
        }

        .summary-list div {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid #eef2f7;
          padding-top: 12px;
        }

        .summary-list p {
          margin: 0;
          color: #7a8190;
          font-size: 13px;
        }

        .summary-list strong {
          color: #202124;
          font-size: 14px;
        }

        .activity-card {
          overflow: hidden;
        }

        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          border-bottom: 1px solid #eef2f7;
          background: #f8fafc;
        }

        .activity-header h3 {
          margin: 0;
          color: #202124;
          font-size: 19px;
        }

        .activity-header p {
          margin: 5px 0 0;
          color: #7a8190;
          font-size: 13px;
        }

        .activity-header span {
          min-width: 34px;
          height: 28px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #eaf3ff;
          color: #387ed1;
          font-weight: 800;
        }

        .empty-activity {
          padding: 38px 20px;
          text-align: center;
          color: #7a8190;
        }

        .empty-activity h4 {
          margin: 0 0 8px;
          color: #202124;
        }

        .activity-list {
          max-height: 430px;
          overflow-y: auto;
          padding: 12px;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          padding: 14px;
          margin-bottom: 10px;
          border-radius: 10px;
          border: 1px solid #edf1f5;
        }

        .activity-item.add {
          background: #f6fff9;
        }

        .activity-item.withdraw {
          background: #fff7f7;
        }

        .activity-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .activity-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 900;
        }

        .activity-item.add .activity-icon {
          background: #ddf7e7;
          color: #1f9d55;
        }

        .activity-item.withdraw .activity-icon {
          background: #ffe0e0;
          color: #e53935;
        }

        .activity-left h4 {
          margin: 0;
          color: #202124;
          font-size: 14px;
        }

        .activity-left p {
          margin: 4px 0 0;
          color: #7a8190;
          font-size: 12px;
        }

        .activity-right {
          text-align: right;
          display: grid;
          gap: 4px;
        }

        .activity-right strong {
          font-size: 15px;
        }

        .activity-right span {
          color: #7a8190;
          font-size: 12px;
        }

        .positive {
          color: #1f9d55;
        }

        .negative {
          color: #e53935;
        }

        .balance {
          color: #387ed1;
        }

        .success {
          color: #1f9d55;
        }

        .receipt-card {
          margin-top: 18px;
          padding: 20px;
        }

        .receipt-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid #eef2f7;
          padding-bottom: 14px;
        }

        .receipt-header h3 {
          margin: 0;
          color: #202124;
        }

        .receipt-header p {
          margin: 5px 0 0;
          color: #7a8190;
          font-size: 13px;
        }

        .receipt-actions {
          display: flex;
          gap: 8px;
        }

        .receipt-actions button {
          border: none;
          border-radius: 8px;
          padding: 9px 13px;
          background: #387ed1;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .receipt-actions button.cancel {
          background: #9ca3af;
        }

        .receipt-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 16px;
        }

        .receipt-grid div {
          padding: 12px;
          border: 1px solid #eef2f7;
          border-radius: 8px;
          background: #fbfdff;
        }

        .receipt-grid span {
          display: block;
          color: #7a8190;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .receipt-grid strong {
          color: #202124;
          font-size: 14px;
          word-break: break-word;
        }

        .receipt-grid strong.negative {
          color: #e53935;
        }

        .receipt-grid strong.balance {
          color: #387ed1;
        }

        .receipt-grid strong.success {
          color: #1f9d55;
        }

        .receipt-note {
          margin: 16px 0 0;
          padding-top: 12px;
          border-top: 1px solid #eef2f7;
          color: #7a8190;
          font-size: 12px;
        }

        @media (max-width: 900px) {
          .funds-action-bar,
          .activity-item,
          .receipt-header {
            flex-direction: column;
            align-items: stretch;
          }

          .funds-layout,
          .receipt-grid {
            grid-template-columns: 1fr;
          }

          .activity-right {
            text-align: left;
          }
        }

        @media print {
          body * {
            visibility: hidden;
          }

          .receipt-card,
          .receipt-card * {
            visibility: visible;
          }

          .receipt-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
            border: none;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Funds;
