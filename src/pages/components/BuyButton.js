import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ethers } from 'ethers';
import { sepolia } from 'wagmi/chains';
import urform from './urform.json';
import { useState } from 'react'

function BuyButton({ id, userid, sellerid, price }) {
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const seller = urform.find((e) => e.userid === sellerid)

  const handleBuy = async () => {
    setLoading(true)
    if (!isConnected) {
      connect(connectors[0]);
      return;
    }
    const garbageAddress = seller.useraddr;
    const provider = new ethers.providers.Web3Provider(window.ethereum, sepolia.chainId);
    const signer = provider.getSigner();

    try {
      const tx = await signer.sendTransaction({
        to: garbageAddress,
        value: ethers.utils.parseEther(`${price}`)
      });
      await tx.wait();
      alert('Transaction successful! 0.01 ETH has been sent.');
      try {
        const response = await fetch('http://localhost:3000/api/update-owner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, newName: userid }),
        });

        console.log(JSON.stringify({ id, newName: userid }));

        if (response.ok) {
          const data = await response.json();
          alert(`Congratulations! You have successfully purchased.`);
        } else {
          const errorData = await response.json();
          alert(`Failed to update owner: ${errorData.error}`);
        }
      } catch (error) {
        setLoading(false)
        console.error('Error buying NFT:', error);
        alert('Failed to update owner: An error occurred.');
      }
    } catch (error) {
      console.error(error);
      alert('Transaction failed!');
    }

  };

  if (!seller) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      {isConnected ? (
        loading
          ? <button className="font-primary h-12 w-36 bg-blue-600 cursor-progress transition-all text-white font-bold py-2 px-4 rounded-md">Loading...</button>
          : <button onClick={handleBuy} className="font-primary h-12 w-36 bg-blue-600 hover:bg-blue-500 transition-all text-white font-bold py-2 px-4 rounded-md">Buy</button>

      ) : (null)}
    </div>
  );
};

export default BuyButton;
