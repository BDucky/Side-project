import React, { useState } from "react";
import Web3 from "web3";

const switchNetwork = async ({ chainId, chainName = '', ...others }) => {
    // {
    //     chainId: Web3.utils.toHex(chainId),
    //     chainName: ,
    //     nativeCurrency: {
    //         name: 'Binance Coin',
    //         symbol: 'BNB',
    //         decimals: 18
    //     },
    //     rpcUrls: ['https://bsc-dataseed.binance.org/'],
    //     blockExplorerUrls: ['https://bscscan.com']
    // }
    const { ethereum } = window
    window.web3 = new Web3(ethereum);
    await ethereum.enable();

    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;

    const currentChainId = await web3.eth.net.getId()

    if (currentChainId !== chainId) {
        try {
            await web3.currentProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(chainId) }],
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await web3.currentProvider.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: Web3.utils.toHex(chainId),
                            chainName: chainName,
                            ...others
                        }]
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    }
}


export default switchNetwork