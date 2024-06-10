import React from "react";
import Link from "next/link";
import styles from '../../styles/Header.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import UserAddress from './user_addr';
import { useAccount } from 'wagmi';
export default function Header() {
    const { isConnected } = useAccount();
    if (!isConnected) {
        return (
            <div className={styles.overlay}>
                <header className={styles.header}>
                    <h1 className="font-primary text-5xl font-bold bg-gradient-to-r text-white from-indigo-700 to-purple-900 inline-block p-2">NFT SHOPPY</h1>
                    <nav className={styles.nav}>
                        <ul className="flex items-center">
                            <UserAddress />
                            
                            <li className='ml-5'><ConnectButton /></li>
                        </ul>
                    </nav>
                </header>
                <div className={styles.blockingMessage}>
                    <p>Please connect your wallet to access the site.</p>
                </div>
            </div>
        );
    }

    return (
        <header className={styles.header}>
            <h1 className="font-primary text-5xl font-bold bg-gradient-to-r text-white from-indigo-700 to-purple-900 inline-block p-2">NFT SHOPPY</h1>
            <nav className={styles.nav}>
                <ul className="flex items-center">
                    <li><Link href="/"><button className={styles.button}>Home</button></Link></li>
                    <li><Link href="nft"><button className={styles.button}>Explore NFTs</button></Link></li>
                    <li><Link href="form"><button className={styles.button}>Create NFT</button></Link></li>
                    <li><Link href="/contact"><button className={styles.button}>Contact Us</button></Link></li>
                    <li><ConnectButton /></li>
                </ul>
            </nav>
        </header>
    );
}
