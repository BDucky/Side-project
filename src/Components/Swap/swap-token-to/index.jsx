import React, { useEffect, useState } from "react";
import "./swap-token.css";
import data from "../../data/datatestnet.json";

const SwapTokenTo = ({
  tokenToChosen,
  setTokenToChosen,
  setShowTokenTo,
  setToTokenAddress,
}) => {
  const tokens = data.tokens;

  const handleTokenChosen = (tokenChosen) => {
    setTokenToChosen(tokenChosen.symbol);
    setToTokenAddress(tokenChosen.address);
  };

  const handleCloseTokenToList = () => {
    setShowTokenTo(false);
  };

  const displayToken = () => {
    return tokens.map((token, index) => {
      return (
        <div
          key={index}
          className="token-infor"
          onClick={() => handleTokenChosen(token)}
        >
          <div className="token-name">
            <img src={token.logoURI} />
            <div className="token-name-symbol">
              <div className="token-name">
                {token.name.length > 15
                  ? token.name.substring(0, 15) + "..."
                  : token.name}
              </div>
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
              <button onClick={handleCloseTokenToList}>X</button>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search name or paste address"
              className="swap-content-searchbar"
            />
          </div>
        </div>
        <hr />
        <div>{displayToken()}</div>
      </div>
    </div>
  );
};

export default SwapTokenTo;
