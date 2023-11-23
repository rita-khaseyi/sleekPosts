
"use client"
// Login.tsx
import useGetUsers from '../hooks/useGetUsers';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import "./style.css"

const Login = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '' });

   
    const { users } = useGetUsers();

    const handleLogin = () => {
        
        const { usernameOrEmail, password } = loginData;

        
        const user = users.find(
            (u) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.address.zipcode === password
        );

        if (user) {
            
            Cookies.set('loggedInUsername', usernameOrEmail);
            Cookies.set('loggedInZipcode', password);

            //  using local storage to store the  authentication state
            localStorage.setItem('isLoggedIn', 'true');

            // Redirecting to the Feed page after successful login
            router.push('/feed');
        } else {
            alert('Invalid login credentials. Please try again.');
        }
    };

    const handleGuestLogin = () => {
        //  loggin in as a guest option
        localStorage.setItem('isLoggedIn', 'true');

        // Redirecting to the Feed page after successful login
        router.push('/feed');
    };

    return (
        <div className='body'>
            <div className='container'>
               
                <div>
                    <h2 className='h2'>Welcome to Sleek Posts!</h2>
                    <h1 className='h1'>Login</h1>
                    <input
                    className='input'
                        type="text"
                        placeholder="Username or Email"
                        value={loginData.usernameOrEmail}
                        onChange={(e) => setLoginData({ ...loginData, usernameOrEmail: e.target.value })}
                    />
                    <input
                    className='input'
                        type="password"
                        placeholder="Zip-Code as Password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                    <button className='button' onClick={handleLogin}>Login</button>
                    <button   onClick={handleGuestLogin} className="guest-login-button button">Login as Guest</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
