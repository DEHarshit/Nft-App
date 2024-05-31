import React from "react";
import styles from '../../styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerTopSection}>
                    <h2 className={styles.footerTitle}>NFT Shoppy</h2>
                    <h3></h3>
                    <p>NFT Shoppy is a pioneering platform in the world of digital art and collectibles. We offer a seamless and secure marketplace where artists, creators, and collectors can buy, sell, and discover unique digital assets. Our platform is powered by blockchain technology, ensuring the authenticity and rarity of every NFT. Join us and explore the endless possibilities of digital ownership and creativity.</p>
                </div>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerLinkTitle}>Marketplace</h3>
                    <ul className={styles.footerLinksList}>
                        <li><a href="#" className={styles.footerLink}>Art</a></li>
                        <li><a href="#" className={styles.footerLink}>Gaming</a></li>
                        <li><a href="#" className={styles.footerLink}>Memberships</a></li>
                        <li><a href="#" className={styles.footerLink}>PFPs</a></li>
                        <li><a href="#" className={styles.footerLink}>Photography</a></li>
                        <li><a href="#" className={styles.footerLink}>Music</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerLinkTitle}>My Account</h3>
                    <ul className={styles.footerLinksList}>
                        <li><a href="/user" className={styles.footerLink}>Profile</a></li>
                        <li><a href="#" className={styles.footerLink}>Favorites</a></li>
                        <li><a href="#" className={styles.footerLink}>Watchlist</a></li>
                        <li><a href="#" className={styles.footerLink}>Studio</a></li>
                        <li><a href="#" className={styles.footerLink}>Settings</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerLinkTitle}>Stats</h3>
                    <ul className={styles.footerLinksList}>
                        <li><a href="#" className={styles.footerLink}>Rankings</a></li>
                        <li><a href="#" className={styles.footerLink}>Activity</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerLinkTitle}>Resources</h3>
                    <ul className={styles.footerLinksList}>
                        <li><a href="#" className={styles.footerLink}>Blog</a></li>
                        <li><a href="#" className={styles.footerLink}>Learn</a></li>
                        <li><a href="#" className={styles.footerLink}>Help center</a></li>
                        <li><a href="#" className={styles.footerLink}>Community standards</a></li>
                        <li><a href="#" className={styles.footerLink}>Taxes</a></li>
                        <li><a href="#" className={styles.footerLink}>Partners</a></li>
                        <li><a href="#" className={styles.footerLink}>Developer platform</a></li>
                        <li><a href="#" className={styles.footerLink}>Platform status</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerLinkTitle}>Company</h3>
                    <ul className={styles.footerLinksList}>
                        <li><a href="#" className={styles.footerLink}>About</a></li>
                        <li><a href="/contact" className={styles.footerLink}>Contact us</a></li>
                        <li><a href="#" className={styles.footerLink}>Ventures</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerLinkTitle}>Learn</h3>
                    <ul className={styles.footerLinksList}>
                        <li><a href="#" className={styles.footerLink}>What is an NFT?</a></li>
                        <li><a href="#" className={styles.footerLink}>How to buy an NFT</a></li>
                        <li><a href="#" className={styles.footerLink}>What are NFT drops?</a></li>
                        <li><a href="#" className={styles.footerLink}>How to sell an NFT using NFT Shoppy</a></li>
                        <li><a href="#" className={styles.footerLink}>How to create an NFT on NFT Shoppy</a></li>
                        <li><a href="#" className={styles.footerLink}>What is a crypto wallet?</a></li>
                        <li><a href="#" className={styles.footerLink}>What is cryptocurrency?</a></li>
                        <li><a href="#" className={styles.footerLink}>What are blockchain gas fees?</a></li>
                        <li><a href="#" className={styles.footerLink}>What is a blockchain?</a></li>
                        <li><a href="#" className={styles.footerLink}>What is web3?</a></li>
                        <li><a href="#" className={styles.footerLink}>How to stay protected in web3</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
