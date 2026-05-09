import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:3003"}/api/admin`;

const AdminPanel = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.get(`${API_URL}/overview`, {
        headers: {
          "x-user-id": userId,
        },
      });

      setData(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load admin panel.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && userRole === "admin") {
      fetchAdminData();
    }
  }, []);

  if (!userId || userRole !== "admin") {
    return (
      <>
        <div className="admin-login">
          <h2>Admin Panel</h2>
          <p>Only admin accounts can access this page.</p>
          <div className="admin-message">
            Login using an account whose email is listed in backend ADMIN_EMAILS.
          </div>
        </div>

        <style>{styles}</style>
      </>
    );
  }

  const stats = data?.stats || {};
  const users = data?.users || [];
  const orders = data?.orders || [];
  const funds = data?.funds || [];
  const holdings = data?.holdings || [];

  return (
    <>
      <div className="admin-page">
        <div className="admin-topbar">
          <div>
            <h2>Admin Panel</h2>
            <p>System overview and user activity</p>
          </div>

          <div className="admin-actions">
            <button onClick={fetchAdminData}>Refresh</button>
          </div>
        </div>

        {message && <div className="admin-message">{message}</div>}
        {loading && <div className="admin-message">Loading admin data...</div>}

        <div className="admin-stats">
          <div><span>Total Users</span><strong>{stats.totalUsers || 0}</strong></div>
          <div><span>Total Orders</span><strong>{stats.totalOrders || 0}</strong></div>
          <div><span>Total Funds</span><strong>₹{stats.totalFunds || "0.00"}</strong></div>
          <div><span>Total Holdings</span><strong>{stats.totalHoldings || 0}</strong></div>
          <div><span>Pending</span><strong className="warning">{stats.pendingOrders || 0}</strong></div>
          <div><span>Executed</span><strong className="success">{stats.executedOrders || 0}</strong></div>
          <div><span>Cancelled</span><strong>{stats.cancelledOrders || 0}</strong></div>
          <div><span>Rejected</span><strong className="danger">{stats.rejectedOrders || 0}</strong></div>
        </div>

        <div className="admin-tabs">
          {["users", "orders", "funds", "holdings"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "users" && (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>User ID</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user._id}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Mode</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>User ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.name}</td>
                    <td>{order.mode}</td>
                    <td>{order.qty}</td>
                    <td>₹{Number(order.price || 0).toFixed(2)}</td>
                    <td>
                      <span className={`status ${order.status?.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.userId}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "funds" && (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Available Cash</th>
                  <th>Available Margin</th>
                  <th>Used Margin</th>
                  <th>Payin</th>
                  <th>Transactions</th>
                </tr>
              </thead>
              <tbody>
                {funds.map((fund) => (
                  <tr key={fund._id}>
                    <td>{fund.userId}</td>
                    <td>₹{Number(fund.availableCash || 0).toFixed(2)}</td>
                    <td>₹{Number(fund.availableMargin || 0).toFixed(2)}</td>
                    <td>₹{Number(fund.usedMargin || 0).toFixed(2)}</td>
                    <td>₹{Number(fund.payin || 0).toFixed(2)}</td>
                    <td>{fund.transactions?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "holdings" && (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Qty</th>
                  <th>Avg</th>
                  <th>Price</th>
                  <th>Current Value</th>
                  <th>User ID</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding._id}>
                    <td>{holding.name}</td>
                    <td>{holding.qty}</td>
                    <td>₹{Number(holding.avg || 0).toFixed(2)}</td>
                    <td>₹{Number(holding.price || 0).toFixed(2)}</td>
                    <td>
                      ₹
                      {Number(
                        Number(holding.qty || 0) * Number(holding.price || 0)
                      ).toFixed(2)}
                    </td>
                    <td>{holding.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{styles}</style>
    </>
  );
};

const styles = `
  .admin-page { padding-bottom: 40px; }

  .admin-topbar,
  .admin-login {
    background: #ffffff;
    border: 1px solid #e8edf5;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
  }

  .admin-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .admin-topbar h2,
  .admin-login h2 {
    margin: 0;
    color: #202124;
  }

  .admin-topbar p,
  .admin-login p {
    margin: 6px 0 0;
    color: #7a8190;
    font-size: 13px;
  }

  .admin-actions button {
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    background: #387ed1;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
  }

  .admin-login {
    max-width: 460px;
    margin: 80px auto;
  }

  .admin-message {
    margin-top: 14px;
    padding: 12px 14px;
    border-radius: 8px;
    background: #f0f7ff;
    border: 1px solid #d6e9ff;
    color: #275f9d;
    font-weight: 600;
  }

  .admin-stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(130px, 1fr));
    gap: 14px;
    margin-top: 18px;
  }

  .admin-stats div {
    background: #ffffff;
    border: 1px solid #e8edf5;
    border-radius: 10px;
    padding: 16px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  }

  .admin-stats span {
    display: block;
    color: #7a8190;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .admin-stats strong {
    font-size: 22px;
    color: #202124;
  }

  .admin-stats .success { color: #1f9d55; }
  .admin-stats .danger { color: #e53935; }
  .admin-stats .warning { color: #b26a00; }

  .admin-tabs {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .admin-tabs button {
    border: 1px solid #d9e0ea;
    background: #fff;
    color: #444;
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .admin-tabs button.active {
    background: #387ed1;
    color: #fff;
    border-color: #387ed1;
  }

  .admin-table {
    margin-top: 18px;
    background: #ffffff;
    border: 1px solid #e8edf5;
    border-radius: 10px;
    overflow: auto;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
  }

  .admin-table table {
    width: 100%;
    border-collapse: collapse;
    min-width: 850px;
  }

  .admin-table th,
  .admin-table td {
    padding: 13px 14px;
    border-bottom: 1px solid #eef2f7;
    text-align: left;
    font-size: 13px;
  }

  .admin-table th {
    color: #7a8190;
    background: #f8fafc;
    font-weight: 800;
  }

  .admin-table td {
    color: #202124;
  }

  .status {
    display: inline-flex;
    min-width: 82px;
    justify-content: center;
    padding: 5px 9px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
  }

  .status.pending { background: #fff7e6; color: #b26a00; }
  .status.executed { background: #eaf7ee; color: #1f7a3a; }
  .status.cancelled { background: #f1f3f5; color: #5f6368; }
  .status.rejected { background: #fdecec; color: #c62828; }

  @media (max-width: 900px) {
    .admin-topbar {
      flex-direction: column;
      align-items: stretch;
    }

    .admin-stats {
      grid-template-columns: repeat(2, minmax(130px, 1fr));
    }
  }
`;

export default AdminPanel;
