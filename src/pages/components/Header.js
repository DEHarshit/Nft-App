import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from '../../styles/Header.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import UserAddress from './user_addr';
import { useAccount } from 'wagmi';
import urform from './urform.json';
export default function Header() {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const [isUserValid, setIsUserValid] = useState(false);
    const [user, setUser] = useState('')
    useEffect(() => {
        if (isConnected) {
            console.log(urform)
            const userExists = urform.find(e => e.useraddr === address);
            if (!userExists) {
                router.push('/create_account');
            } else {
                setIsUserValid(true);
                setUser(urform.find(e=> e.useraddr === address))
                console.log(user.userid)
            }
        }
    }, []);

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

    if (!isUserValid) {
        return null;
    }

    return (
        <header className={styles.header}>
            <h1 className="font-primary text-5xl font-bold bg-gradient-to-r text-white from-indigo-700 to-purple-900 inline-block p-2">NFT SHOPPY</h1>
            <nav className={styles.nav}>
                <ul className="flex items-center">
                    <li><Link href="/"><button className={styles.button}>Home</button></Link></li>
                    <li><Link href="/nft"><button className={styles.button}>Explore NFTs</button></Link></li>
                    <li><Link href={`/form?name=${user.userid}`}><button className={styles.button}>Create NFT</button></Link></li>
                    <li><Link href="/contact"><button className={styles.button}>Contact Us</button></Link></li>
                    <li><ConnectButton /></li>
                    <li>
                        <Link href={`/user?name=${user.userid}`}>
                            <div className="text-black flex sapce-x-2 bg-white items-center p-1 rounded-xl font-primary font-semibold cursor-pointer">
                                <img src="/user.gif" className="h-[40px] w-[40px]" />
                                <h2>My Profile</h2>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
