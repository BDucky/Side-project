import React from "react";
import "./setting-panel.css";

const SettingPanel = () => {
  return (
    <div className="setting-panel-container">
      <span className="setting-panel">
        <div className="setting-panel-content-display">
          <div className="setting-panel-title">Settings</div>
          <div className="setting-panel-main">
            <div className="setting-panel-slippage">
              <div className="slippage-display">
                <div className="slippage-tolerance">Slippage tolerance</div>
                <span
                  style={{
                    marginLeft: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div class="sc-d5tbhs-1 cSretk">
                    <div class="sc-bjeulj-0 cEXsxk">
                      <span class="sc-bjeulj-1 ieKJOY">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </span>
                    </div>
                  </div>
                </span>
              </div>
              <div className="input-slippage">
                <button className="slippage-btn">Auto</button>
                <button tabIndex="-1" className="slippage-percentage-btn">
                  <div className="slippage-percentage-input">
                    <input type="text" className="slippage-percentage" />%
                  </div>
                </button>
              </div>
            </div>
            <div className="setting-panel-deadline">
              <div className="deadline-display">
                <div className="transaction-deadline">Transaction deadline</div>
                <span
                  style={{
                    marginLeft: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div class="sc-d5tbhs-1 cSretk">
                    <div class="sc-bjeulj-0 cEXsxk">
                      <span class="sc-bjeulj-1 ieKJOY">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </span>
                    </div>
                  </div>
                </span>
              </div>
              <div className="input-transaction-deadline">
                <button className="transaction-deadline-btn">
                  <input className="txn-deadline-btn-input"></input>
                </button>
                <div className="deadline-unit">minutes</div>
              </div>
            </div>
          </div>
          <div className="interface-settings">Interface settings</div>
          <div className="router-api-container">
            <div className="router-api">
              <div className="router-api-display">Auto Router API</div>
              <span
                style={{
                  marginLeft: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div class="sc-d5tbhs-1 cSretk">
                  <div class="sc-bjeulj-0 cEXsxk">
                    <span class="sc-bjeulj-1 ieKJOY">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </span>
                  </div>
                </div>
              </span>
            </div>
            <button className="router-api-btn">
              <span className="router-api-btn-span"></span>
            </button>
          </div>
          <div className="router-api-container">
            <div className="router-api">
              <div className="router-api-display">Auto Router API</div>
              <span
                style={{
                  marginLeft: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div class="sc-d5tbhs-1 cSretk">
                  <div class="sc-bjeulj-0 cEXsxk">
                    <span class="sc-bjeulj-1 ieKJOY">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </span>
                  </div>
                </div>
              </span>
            </div>
            <button className="router-api-btn">
              <span className="router-api-btn-span"></span>
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};

export default SettingPanel;
