import React from 'react';
import { useAccount } from 'wagmi';

function UserAddress() {
  const { address, isConnected } = useAccount();

  if (!isConnected) return null;

  return <p>User Address: {address}</p>;
}

export default UserAddress;
