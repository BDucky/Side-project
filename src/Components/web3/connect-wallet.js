import switchNetwork from "./contract";

export const walletConnected = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  switchNetwork({ chainId: 5 });
};

export const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const loadWeb3 = async ({ onAccountChanged }) => {
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
