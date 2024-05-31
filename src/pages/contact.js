// pages/contact.js
import React from 'react';
import styles from '../styles/Contact.module.css';
import Header from './components/Header'
import Footer from './components/Footer'

const Contact = () => {
  return (
    <div>
      <div className='sticky top-0 z-30'>
        <Header />
      </div>
      <div className='flex flex-col gap-1 p-4 bg-black'>
        <div className='flex justify-center'>
          <p className=" bg-gradient-to-t from-indigo-700 to-purple-900 font-primary font-medium text-xl text-transparent inline-block bg-clip-text">Have a question? Need help? Don't hesitate, drop us a line.</p>
        </div>
        <div className={styles.imageWrapper}>
          <img src="\image.jpg" alt="Get in Touch" className={styles.image} />
          <div className={styles.imageOverlay}>
            <div className="flex flex-col bg-black p-5 bg-opacity-40 rounded-lg">
              <h1 className="font-primary font-semibold bg-gradient-to-r from-blue-200 to-purple-700 inline-block text-transparent bg-clip-text">GET IN TOUCH</h1>
              <h2 className="font-primary font-semibold bg-gradient-to-r from-blue-200 to-purple-700 inline-block text-transparent bg-clip-text"><p>We'd love to hear from you. Reach out with any questions or comments.</p></h2>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.formWrapper}>
            <form className={styles.form} class="flex flex-col gap-2">
              <div>
                <h2 className='font-primary text-3xl font-semibold bg-gradient-to-t from-indigo-700 to-purple-900 inline-block text-transparent bg-clip-text'>Mail Us</h2>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message"></textarea>
              </div>
              <div className='flex py-3 gap-2'>
                <input type="checkbox" id="terms" name="terms" />
                <label htmlFor="terms">I agree to the terms of service</label>
              </div>
              <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
          </div>
          <div className="flex flex-col gap-3 w-[750px] bg-[#1b1b1b] rounded-lg p-[40px]">
            <h2 className='font-primary text-3xl font-semibold bg-gradient-to-t from-indigo-700 to-purple-900 inline-block text-transparent bg-clip-text'>Contact Information</h2>
            <p>Email: office@xhibiter.com</p>
            <p>Phone: (123) 123-456</p>
            <p>Address: 08 W 36th St, New York NY 10001</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
