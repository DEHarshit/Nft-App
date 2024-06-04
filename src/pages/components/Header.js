import React from "react";
import Link from "next/link";
import styles from '../../styles/Header.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className="font-primary text-5xl font-bold bg-gradient-to-r text-white from-indigo-700 to-purple-900 inline-block p-2">NFT SHOPPY</h1>
            <nav className={styles.nav}>
                <ul className="flex items-center">
                    <li><Link href="/">
                    <button className={styles.button}>Home</button></Link></li>
                    <li><Link href="nft">
                    <button className={styles.button}>Explore NFTs</button>
                    </Link></li>
                    <li>
                        <Link href="form">
                        <button className={styles.button}>Create NFT</button>
                        </Link>
                    </li>
                    <li><Link href="/contact"><button className={styles.button}>Contact Us</button></Link></li>
                    <li>
                    <ConnectButton />
                    </li>
                </ul>
            </nav>
        </header>
    );
}
