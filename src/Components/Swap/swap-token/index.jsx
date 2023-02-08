import React, { useEffect, useState } from "react";
import "./swap-token.css";
import data from "../../data/data.json";

const SwapToken = () => {
  const tokens = data.tokens;
  console.log(tokens);

  const displayToken = () => {
    return tokens.map((token, index) => {
      return (
        <div key={index} className="token-infor">
          <div className="token-name">
            <img src={token.logoURI} />
            <div className="token-name-symbol">
              <div className="token-name">{token.name.length > 15 ? token.name.substring(0, 15) + "..." : token.name}</div>
              <div className="token-symbol">{token.symbol}</div>
            </div>
          </div>
          <div>0</div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="swap-box-container">
        <div className="swap-contents">
          <div className="swap-content-header">
            <div>Select a Token</div>
            <div>
              <button>X</button>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search name or paste address"
              className="swap-content-searchbar"
            />
          </div>
          <div className="swap-content-options">
            <div>
              <button className="swap-choose-currency-from">
                <div class="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB gBBPoP leSroW">
                  <span>ETH</span>
                </div>
              </button>
            </div>
            <div>
              <button className="swap-choose-currency-from">
                <div class="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB gBBPoP leSroW">
                  <span>WETH</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div>{displayToken()}</div>
      </div>
    </div>
  );
};

export default SwapToken;
