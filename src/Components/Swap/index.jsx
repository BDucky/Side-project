import React, { useEffect, useState } from "react";
import SwapToken from "./swap-token";
import "./swap.css";
import { walletConnected } from "../web3/connect-wallet";
import switchNetwork from "../web3/contract";
import Web3 from "web3";
import { ConnectWalletButton } from "../web3/wallet/wallet";
import data from ".././data/data.json"

const Swap = () => {
  const [connectedAccount, setConnectedAccount] = useState("Connect Wallet!");
  const [userBalance, setUserBalance] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const showContent = () => {
    setShow(!show);
    console.log(show);
  };

  const walletConnected = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setConnectedAccount(accounts[0]);
    switchNetwork({ chainId: 5 });
    checkBalance(accounts[0]);
  };

  const changeAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      setConnectedAccount(accounts[0]);
      checkBalance(accounts[0]);
    } else {
      setConnectedAccount(null);
    }
  };

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const loadWeb3 = async ({ onAccountChanged }) => {
    try {
      if (!isMetaMaskInstalled) return alert("Please install Metamask");
      const { ethereum } = window;
      const accountChanged = (accounts) => {
        onAccountChanged(accounts);
      };
      ethereum.removeListener("accountsChanged", accountChanged);
      ethereum.on("accountsChanged", accountChanged);
    } catch (e) {
      console.error(e);
    }
  };

  const checkBalance = async (accounts) => {
    const { ethereum } = window;
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;

    const balance = await web3.eth.getBalance(accounts);
    const balanceconverted = await web3.utils.fromWei(balance);
    setUserBalance(balanceconverted);
    console.log(balanceconverted);
    return balance;
  };

  useEffect(() => {
    loadWeb3({
      onAccountChanged: (accounts) => {
        changeAccount(accounts);
      },
    });
  });

  return (
    <div className="swap-container">
      <div className="swap-header">
        <div className="swap-header-category">
          <div></div>
          <div>Swap</div>
          <div>Tokens</div>
          <div>NFTs</div>
          <div>Pool</div>
        </div>
        <div className="swap-header-searchbar">
          <input placeholder="Search Tokens and NFTs collection"></input>
        </div>
        <div className="swap-header-wallet">
          <div>...</div>
          <div className="chain-change-btn">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7780A0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <div className="swap-connect-wallet">
            <ConnectWalletButton
              onClick={walletConnected}
              className="swap-connect-wallet-button"
            >
              {connectedAccount !== "Connect Wallet!"
                ? connectedAccount.substring(0, 5) +
                  "....." +
                  connectedAccount.substring(
                    connectedAccount.length - 4,
                    connectedAccount.length
                  )
                : "Connect Wallet!"}
            </ConnectWalletButton>
            <div className="wallet-btn-seperate-line"></div>
            <button className="wallet-btn-dark-mode">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FB118E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-testid="navbar-wallet-dropdown"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="swap-main-content">
        <div className="swap-main-container">
          <div className="swap-main">
            <div className="swap-settings">
              <div className="swap-setting-container">
                <div>Swap</div>
                <div
                  class="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB gBBPoP leSroW"
                  style={{ margin: "0 15px" }}
                >
                  <div class="sc-1ndknrv-4 jMMxfi">
                    <button
                      id="open-settings-dialog-button"
                      aria-label="Transaction Settings"
                      class="sc-1ndknrv-2 iDWMMh"
                      fdprocessedid="y8gzvq"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="sc-1ndknrv-0 jDcEjt"
                      >
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="swap-currency-from-container">
              <div className="swap-currency-from-display">
                <input
                  class="sc-1x3stf0-0 iIWDYd sc-3zewi2-11 diLZKF token-amount-input"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                  value=""
                  fdprocessedid="jjeu1d"
                ></input>
                <button
                  className="swap-choose-currency-from"
                  onClick={showContent}
                >
                  <div class="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB gBBPoP leSroW">
                    <span>ETH</span>
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="sc-3zewi2-8 MZuqQ"
                    >
                      <path
                        d="M0.97168 1L6.20532 6L11.439 1"
                        stroke="#AEAEAE"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div class="sc-11ce2lf-2 iKjacu">
              <div color="#0D111C" class="sc-1es900k-0 hbdxeO">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D111C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            <div className="swap-currency-from-container">
              <div className="swap-currency-from-display">
                <input
                  class="sc-1x3stf0-0 iIWDYd sc-3zewi2-11 diLZKF token-amount-input"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                  value=""
                  fdprocessedid="jjeu1d"
                ></input>
                <button
                  className="swap-choose-currency-from"
                  onClick={showContent}
                >
                  <div class="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB gBBPoP leSroW">
                    <span>WETH</span>
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="sc-3zewi2-8 MZuqQ"
                    >
                      <path
                        d="M0.97168 1L6.20532 6L11.439 1"
                        stroke="#AEAEAE"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className="main-button-container">
              <button className="swap-connect-wallet-main-button">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
      {!show ? <SwapToken className="popup-content" /> : null}
    </div>
  );
};

export default Swap;
