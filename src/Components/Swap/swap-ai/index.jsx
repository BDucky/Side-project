import React, { useState, useEffect } from "react";
import { useWeb3Context } from "web3-react";
import { useUniswap } from "@uniswap/react-hooks";

const SwapTokens = () => {
  const context = useWeb3Context();
  const { account } = context;
  const { exchange } = useUniswap();

  const [tokenIn, setTokenIn] = useState(null);
  const [tokenOut, setTokenOut] = useState(null);
  const [amountIn, setAmountIn] = useState(0);
  const [amountOut, setAmountOut] = useState(0);

  async function swapTokens() {
    const { to: tokenInAddress } = tokenIn;
    const { to: tokenOutAddress } = tokenOut;
    const { amount: amountInWei } = web3.utils.toWei(amountIn, "ether");

    // create transaction
    const tx = await exchange.swapExactTokensForTokens(
      amountInWei,
      tokenInAddress,
      tokenOutAddress,
      account,
      0
    );

    // check transaction status
    const receipt = await tx.wait();
    console.log(receipt);

    // get amount out
    const amountOutWei = await exchange.getAmountOut(
      amountInWei,
      tokenInAddress,
      tokenOutAddress
    );
    const amountOut = web3.utils.fromWei(amountOutWei, "ether");
    setAmountOut(amountOut);
  }

  return (
    <div>
      <h1>Swap Tokens</h1>
      <input
        type="text"
        placeholder="Token In"
        value={tokenIn}
        onChange={(e) => setTokenIn(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token Out"
        value={tokenOut}
        onChange={(e) => setTokenOut(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount In"
        value={amountIn}
        onChange={(e) => setAmountIn(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount Out"
        value={amountOut}
        disabled
      />
      <button onClick={swapTokens}>Swap Tokens</button>
    </div>
  );
};

export default SwapTokens;
