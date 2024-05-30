import React from "react";
import Link from "next/link";
import styles from '../../styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.h1}>NFT Shoppy</h1>
            <nav className={styles.nav}>
                <ul className="flex items-center">
                    <li><Link href="/">
                    <button className={styles.button}>Home</button></Link></li>
                    <li><Link href="nft">
                    <button className={styles.button}>Explore NFTs</button>
                    </Link></li>
                    <li><Link href="/contact"><button className={styles.button}>Contact Us</button></Link></li>
                    <li>
                        <button className="flex items-center bg-white hover:bg-blue rounded-lg p-1">
                            <img src="/cryptocurrency.gif" alt="Wallet Icon" className={styles.icon}/>
                            <span className="text-black font-semibold">Wallet Connect</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
