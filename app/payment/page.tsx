
"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import './style.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const Payment: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const submitPayment = () => {
    
    Cookies.set('isPremium', 'true');
    // Redirect back to the feed page
    router.push('/posts');
  };

  useEffect(() => {
    // Check if the user is already premium (to handle page refresh or direct URL access)
    if (Cookies.get('isPremium') === 'true') {

      router.push('/posts');
    }
  }, [router]);

  return (
    <div>
      <Navbar/>
    <div className="paymentContainer">
      <Head>
        <title>Payment Page</title>
        <meta name="description" content="Payment page for your application" />
      </Head>

      <h2 className='heading'>M-Pesa Payment</h2>
      <form id="payment-form">
        <label htmlFor="phone-number">Phone Number:</label>
        <input
          type="tel"
          id="phone-number"
          placeholder="Enter your M-Pesa phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <label htmlFor="pin">PIN:</label>
        <input
          type="password"
          id="pin"
          placeholder="Enter your M-Pesa PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />

        <label htmlFor="amount">Amount (KES):</label>
        <input
          type="number"
          id="amount"
          placeholder="Enter the payment amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="button" onClick={submitPayment}>
          Pay with M-Pesa
        </button>
      </form>
    </div>
   <Footer/>
    </div>
  );
};

export default Payment;

