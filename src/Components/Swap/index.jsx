import React, { useEffect, useRef, useState } from "react";
import "./swap.css";
import { walletConnected } from "../web3/connect-wallet";
import switchNetwork from "../web3/contract";
import Web3 from "web3";
import { ConnectWalletButton } from "../web3/wallet/wallet";
import data from ".././data/data.json";
import SwapTokenTo from "./swap-token-to";
import TokenAbi from ".././data/erc20.json"
import SwapTokenFrom from "./swap-token-from";
import SettingPanel from "./setting-panel";
import ChainPanel from "./chain-panel";
import Abi from ".././data/abi.json";
import { resolve } from "path-browserify";

const Swap = () => {
  const [connectedAccount, setConnectedAccount] = useState("Connect Wallet!");
  const [userBalance, setUserBalance] = useState(0);
  const [showTokenFrom, setShowTokenFrom] = useState(false);
  const [showTokenTo, setShowTokenTo] = useState(false);
  const [tokenFromChosen, setTokenFromChosen] = useState("ETH");
  const [tokenToChosen, setTokenToChosen] = useState("Select Token");
  const [showSettingPanel, setShowSettingPanel] = useState(false);
  const [showChainPanel, setShowChainPanel] = useState(false);
  // const [amountOutMin, setAmountOutMin] = useState("");
  const amountOutMin = useRef()
  const allowanceNumber = useRef()
  const [fromTokenAddress, setFromTokenAddress] = useState(
    "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
  );
  const [toTokenAddress, setToTokenAddress] = useState(
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  );

  const walletAddress = "0xB83195a58496a190cA4126E0173D5CC21714efA0";
  const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const tokenContractAddress = "0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA"

  const contractAbi = Abi;
  const tokenAbi = TokenAbi;

  const WETHTokenAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
  const UniTokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";

  const testTokenOneAddress = "0x84173f89B03acFB8c6378f32599ED3600B2049d6";
  const testTokenTwoAddress = "0x272c1f3c822648148BE82b2c86Ee1dd4E3574a7f";
  const testTokenThreeAddress = "0xf4c17ef851496Cbd45Ae861d5d43C3C30dB73caD";

  useEffect(() => {
    setShowTokenFrom();
    setShowTokenTo();
  }, []);

  const showContentFrom = () => {
    setShowTokenFrom(!showTokenFrom);
    setShowTokenTo(false);
  };

  const showContentTo = () => {
    setShowTokenTo(!showTokenTo);
    setShowTokenFrom(false);
  };

  const handleSwap = () => {
    setTokenFromChosen(tokenToChosen);
    setTokenToChosen(tokenFromChosen);
  };

  const displaySettingPanel = () => {
    setShowSettingPanel(!showSettingPanel);
  };

  const displayChainPanel = () => {
    setShowChainPanel(!showChainPanel);
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
    initWeb3()
    loadWeb3({
      onAccountChanged: (accounts) => {
        changeAccount(accounts);
      },
    });
  });

  const loadContract = async (contractAbi, contractAddress) => {
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    return contract;
  };

  const initWeb3 = async () => {
    const { ethereum } = window;
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;

    const contractAddressCheckSum =
      web3.utils.toChecksumAddress(contractAddress);
    const addressFrom = web3.utils.toChecksumAddress("0x84173f89B03acFB8c6378f32599ED3600B2049d6");
    const addressTo = web3.utils.toChecksumAddress("0x272c1f3c822648148BE82b2c86Ee1dd4E3574a7f");
    const addressEth = web3.utils.toChecksumAddress("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");
    const addressSend = web3.utils.toChecksumAddress(
      "0xB83195a58496a190cA4126E0173D5CC21714efA0"
    );
  }

  const setAmountsOutOnClick = async () => {
    const contractAddressCheckSum =
      window.web3.utils.toChecksumAddress(contractAddress);
    const addressFrom = window.web3.utils.toChecksumAddress("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");
    const addressTo = window.web3.utils.toChecksumAddress("0x272c1f3c822648148BE82b2c86Ee1dd4E3574a7f");
    const addressEth = window.web3.utils.toChecksumAddress("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");
    const addressSend = window.web3.utils.toChecksumAddress(
      "0xB83195a58496a190cA4126E0173D5CC21714efA0"
    );
    const contract = await loadContract(contractAbi, contractAddressCheckSum);
    const balanceconverted = await window.web3.utils.toWei("0.01", "ether");
    await new Promise((resolve) => {
      contract.methods
        .getAmountsOut(balanceconverted, [addressFrom, addressEth, addressTo])
        .call()
        .then((result) => {
          console.log(result);
          // setAmountOutMin(parseInt(result[2]));
          amountOutMin.current = parseInt(result[2])
          resolve(0)
        });
    })
  }

  const checkAllowance = async (balanceconverted, tokenAddress) => {
    const contractAddressCheckSum =
      window.web3.utils.toChecksumAddress(contractAddress);
    const addressFrom = window.web3.utils.toChecksumAddress("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");
    const addressTo = window.web3.utils.toChecksumAddress("0x272c1f3c822648148BE82b2c86Ee1dd4E3574a7f");
    const addressEth = window.web3.utils.toChecksumAddress("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");
    const addressSend = window.web3.utils.toChecksumAddress(
      "0xB83195a58496a190cA4126E0173D5CC21714efA0"
    );
    const contract = await loadContract(tokenAbi, tokenAddress);
    await new Promise((resolve) => {
      contract.methods.allowance(addressSend, contractAddress).call().then((result) => {
        console.log((result))
        allowanceNumber.current = result
        resolve(0)
      })
    })
    const balanceApproved = await window.web3.utils.toWei("0.01", "ether");
    // { allowanceNumber.current < balanceconverted ? setApprove : null }
    if (allowanceNumber.current < balanceconverted) {
      await contract.methods
        .approve(contractAddressCheckSum, balanceApproved)
        .send({
          from: addressSend,
          gas: 1000000,
        });
    }
  }

  const swapETH = async () => {
    await setAmountsOutOnClick()
    const getAmountOutMin = amountOutMin.current
    console.log(getAmountOutMin)
    // const roundedAmountOutMin = (Math.ceil(getAmountOutMin / 1000000000000000000) * 1000000000000000000)
    const { ethereum } = window;
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;

    const contractAddressCheckSum =
      window.web3.utils.toChecksumAddress(contractAddress);
    const addressFrom = window.web3.utils.toChecksumAddress("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");
    const addressTo = window.web3.utils.toChecksumAddress("0x272c1f3c822648148BE82b2c86Ee1dd4E3574a7f");
    const addressEth = window.web3.utils.toChecksumAddress("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");
    const addressSend = window.web3.utils.toChecksumAddress(
      "0xB83195a58496a190cA4126E0173D5CC21714efA0"
    );
    const balanceconverted = await web3.utils.toWei("0.01", "ether");
    await checkAllowance(balanceconverted, addressFrom);
    const contract = await loadContract(contractAbi, contractAddressCheckSum);
    const signedTxn = contract.methods
      .swapExactTokensForTokens(
        balanceconverted,
        (getAmountOutMin * 0.995).toString(),
        [addressFrom, addressEth, addressTo],
        addressSend,
        9999999999
      )
      .send({
        from: addressSend,
        gas: 1000000,
      });
    console.log(signedTxn);
  };

  const addLiquidityETH = async (amountIn) => {
    const { ethereum } = window;
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;

    const contractAddressCheckSum =
      web3.utils.toChecksumAddress(contractAddress);
    const addressFrom = web3.utils.toChecksumAddress(testTokenOneAddress);
    const addressTo = web3.utils.toChecksumAddress(WETHTokenAddress);
    const addressSend = web3.utils.toChecksumAddress(
      "0xB83195a58496a190cA4126E0173D5CC21714efA0"
    );
    const contract = await loadContract(contractAbi, contractAddressCheckSum);
    const balanceconverted = await web3.utils.toWei("0.001");
    const amountADesired = await web3.utils.toWei("0.001", "ether");
    const amountBDesired = await web3.utils.toWei("0.000000001", "ether");
    const amountAMin = await web3.utils.toWei("0.000995", "ether");
    const amountBMin = await web3.utils.toWei("0.000000058649655241", "ether");

    const signedTxn = contract.methods
      .addLiquidityETH(
        addressFrom,
        amountADesired,
        amountAMin,
        amountBMin,
        addressSend,
        1676537605
      )
      .send({
        from: addressSend,
        gas: 10000000,
      });
    console.log(signedTxn);
  };

  console.log(fromTokenAddress)
  console.log(toTokenAddress)
  console.log(connectedAccount)

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
          <div className="chain-change-btn" onClick={displayChainPanel}>
            <button className="chain-btn">
              <img
                className="chain-img"
                src="data:image/png;base64,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"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7780A0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          {showChainPanel === true ? <ChainPanel /> : null}
          <div className="swap-connect-wallet">
            <button
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
            </button>
            <div className="wallet-btn-seperate-line"></div>
            <button className="wallet-btn-dark-mode">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FB118E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                  <div
                    class="sc-1ndknrv-4 jMMxfi"
                    onClick={displaySettingPanel}
                  >
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="sc-1ndknrv-0 jDcEjt"
                      >
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                    </button>
                  </div>
                  {showSettingPanel === true ? <SettingPanel /> : null}
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
                  onClick={showContentFrom}
                >
                  <div class="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB gBBPoP leSroW">
                    <span>{tokenFromChosen}</span>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={handleSwap}
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
                  onClick={showContentTo}
                >
                  <div class="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB gBBPoP leSroW">
                    <span>{tokenToChosen}</span>
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
              <button
                className="swap-connect-wallet-main-button"
                onClick={swapETH}
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>
      {showTokenFrom === true ? (
        <SwapTokenFrom
          className="popup-content"
          tokenFromChosen={tokenFromChosen}
          setTokenFromChosen={setTokenFromChosen}
          setShowTokenFrom={setShowTokenFrom}
          setFromTokenAddress={setFromTokenAddress}
        />
      ) : null}
      {showTokenTo === true ? (
        <SwapTokenTo
          className="popup-content"
          tokenToChosen={tokenToChosen}
          setTokenToChosen={setTokenToChosen}
          setShowTokenTo={setShowTokenTo}
          setToTokenAddress={setToTokenAddress}
        />
      ) : null}
      <button onClick={checkAllowance}>Add liquidity</button>
    </div>
  );
};

export default Swap;
