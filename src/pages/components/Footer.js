import React from "react";
import styles from '../../styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerSection}>
                    <h2 className={styles.footerTitle}>NFT Shoppy | NFT Marketplace</h2>
                    <p>Create, sell and collect truly rare digital artworks. Powered by blockchain technology.</p>
                </div>
                <div className={styles.footerLinksContainer}>
                    <div className={styles.footerLinksSection}>
                        <h3 className={styles.footerLinkTitle}>Marketplace</h3>
                        <ul className={styles.footerLinksList}>
                            <li><a href="#" className={styles.footerLink}>All NFTs</a></li>
                            <li><a href="#" className={styles.footerLink}>Art</a></li>
                            <li><a href="#" className={styles.footerLink}>Music</a></li>
                            <li><a href="#" className={styles.footerLink}>Domain Names</a></li>
                            <li><a href="#" className={styles.footerLink}>Collectibles</a></li>
                            <li><a href="#" className={styles.footerLink}>Virtual World</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerLinksSection}>
                        <h3 className={styles.footerLinkTitle}>Company</h3>
                        <ul className={styles.footerLinksList}>
                            <li><a href="#" className={styles.footerLink}>Explore</a></li>
                            <li><a href="#" className={styles.footerLink}>About</a></li>
                            <li><a href="/contact" className={styles.footerLink}>Contact Us</a></li>
                            <li><a href="#" className={styles.footerLink}>Our Blog</a></li>
                            <li><a href="#" className={styles.footerLink}>FAQ</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerLinksSection}>
                        <h3 className={styles.footerLinkTitle}>My Account</h3>
                        <ul className={styles.footerLinksList}>
                            <li><a href="#" className={styles.footerLink}>Authors</a></li>
                            <li><a href="#" className={styles.footerLink}>Collection</a></li>
                            <li><a href="#" className={styles.footerLink}>Author Profile</a></li>
                            <li><a href="#" className={styles.footerLink}>Create Item</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
