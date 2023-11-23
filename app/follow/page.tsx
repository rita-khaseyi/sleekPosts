"use client"


import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import "./style.css";
import useGetPosts from '../hooks/useGetPosts';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const FollowingPosts: React.FC = () => {
  const { posts } = useGetPosts();
  const [following, setFollowing] = useState<number[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<number[]>([]);

  useEffect(() => {
    // Fetching following data from cookies created 
    const savedFollowing = Cookies.get('following');
    if (savedFollowing) {
      setFollowing(JSON.parse(savedFollowing));
    }

    // Fetching  blocked users from cookies
    const savedBlockedUsers = Cookies.get('blockedUsers');
    if (savedBlockedUsers) {
      setBlockedUsers(JSON.parse(savedBlockedUsers));
    }
  }, []);

  const blockUser = (userId: number) => {
    // Adding  the blocked user to the list
    setBlockedUsers([...blockedUsers, userId]);

    // Saving blocked users to cookies
    Cookies.set('blockedUsers', JSON.stringify([...blockedUsers, userId]));
  };

  const unblockUser = (userId: number) => {
    // Removing the unblocked user from the list
    const updatedBlockedUsers = blockedUsers.filter((blockedUserId) => blockedUserId !== userId);
    setBlockedUsers(updatedBlockedUsers);

    // Saving the  updated blocked users to cookies
    Cookies.set('blockedUsers', JSON.stringify(updatedBlockedUsers));
  };

  const filteredPosts = posts.filter((post) => !blockedUsers.includes(post.userId));

  return (
    <div>
      <Navbar/>
    <div className="following-posts-container">
      <h1>Following Posts</h1>
      <ul className="post-list">
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <p>{post.title}</p>
            <div className='post-footer'>
              <span className='like-dislike-container'>
                <span className='like-icon'>👍 {post.likes || 0}</span>
                <span className='dislike-icon'>👎 {post.dislikes || 0}</span>
              </span>
              <span className='comment-icon'>💬</span>
              {blockedUsers.includes(post.userId) ? (
                <button onClick={() => unblockUser(post.userId)}>Unblock</button>
              ) : (
                <button onClick={() => blockUser(post.userId)}>Block</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </div>
  );
};

export default FollowingPosts;
