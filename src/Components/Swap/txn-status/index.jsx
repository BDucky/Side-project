import React from "react";
import "./txn-status.css";

const TxnStatus = ({ setTransactionStatus, transactionStatus }) => {
  const closeTxnStatus = () => {
    setTransactionStatus("");
  };
  return (
    <div className="transaction-status">
      <div className="status-container">
        <div className="status-box">
          <div className="status-box-header">
            <div className="status-box-header-title">Notification</div>
            <div className="status-box-header-btn">
              <button
                className="status-box-header-btn-close"
                onClick={closeTxnStatus}
              >
                X
              </button>
            </div>
          </div>
          <div className="status-box-body">
            <div className="status-box-body-content">{transactionStatus}</div>
          </div>
          <div className="status-box-btn">
            <button className="status-box-btn-close" onClick={closeTxnStatus}>
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TxnStatus;
