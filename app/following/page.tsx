"use client"
// pages/FollowUsers.tsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import useGetUsers from '../hooks/useGetUsers';
import { useRouter } from 'next/navigation';
import "./style.css"
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const FollowUsers: React.FC = () => {
  const { users } = useGetUsers();
  const [following, setFollowing] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Initializing  following data from cookies 
    const storedFollowing = Cookies.get('following');
    if (storedFollowing) {
      setFollowing(JSON.parse(storedFollowing));
    }
  }, []);

  const handleFollowToggle = (userId: number) => {
    // Toggle the  follow status
    setFollowing((prevFollowing) => {
      if (prevFollowing.includes(userId)) {
        // If already following, unfollow
        return prevFollowing.filter((id) => id !== userId);
      } else {
        // If not following, follow
        return [...prevFollowing, userId];
      }
    });
  };

  const saveFollowingToCookies = () => {
    // Saving following data to cookies to retrieve it next time
    Cookies.set('following', JSON.stringify(following));
  };

  const isUserFollowed = (userId: number) => {
    return following.includes(userId);
  };

  const handleViewPosts = () => {
    // Navigating  to the /posts page
    router.push('/follow');
  };

  return (
    <div>
        <Navbar/>
    <div className="follow-users-container">
      <h1>People</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <button onClick={() => handleFollowToggle(user.id)}>
              {isUserFollowed(user.id) ? 'Unfollow' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleViewPosts}>View Posts</button>
      <button onClick={saveFollowingToCookies}>Save Following</button>
    </div>
    <Footer/>
    </div>
  );
};

export default FollowUsers;
