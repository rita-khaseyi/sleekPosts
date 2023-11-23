"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; 
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const RecommendedPosts = () => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        setRecommendedPosts(response.data);
      } catch (error) {
        console.error('Error fetching recommended posts', error);
      }
    };

    fetchRecommendedPosts();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className='container'>
      <h1>Recommended Posts</h1>
      <ul className='post-list'>
        {recommendedPosts.map((post) => (
          <li key={post.id} className='post'>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </div>
  );
};

export default RecommendedPosts;
