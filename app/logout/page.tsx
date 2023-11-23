// pages/logout.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import "./style.css"

const Logout = () => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleLogout = () => {
    // Clearing authentication information
    Cookies.remove('isLoggedIn');
    Cookies.remove('isPremium');

    // Redirecting to the login page
    router.push('/login');
  };

  const handleCancel = () => {
    // If cancel is clicked, go back to the previous page
    router.back();
  };

  useEffect(() => {
  
    if (showConfirmation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showConfirmation]);

  return (
    <div className='back'>
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Yes</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      <div>Logging out...</div>
    </div>
  );
};

export default Logout;
