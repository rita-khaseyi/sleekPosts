
"use client"
import React, { useState } from 'react';
import useGetPosts from '../hooks/useGetPosts';
import './style.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

interface Post {
  id: number;
  title: string;
  body: string;
  likes?: number | null; 
}

const AllPosts = () => {
  const { posts } = useGetPosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleLikeClick = () => {
    
    setSelectedPost((prevPost) => ({
      ...prevPost!,
      likes: (prevPost?.likes || 0) + 1,
    }));
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
  };

  return (
    <div>
        <Navbar/>
    <div className='container'>
      <h1>All Posts</h1>
      {selectedPost ? (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
          <div className='post-footer'>
            <span className='like-dislike-container'>
              <span onClick={handleLikeClick} className='like-icon'>
                👍 {selectedPost.likes || 0}
              </span>
            </span>
            <span className='comment-icon'>💬</span>
            <button onClick={handleBackToPosts}>Back to All Posts</button>
          </div>
        </div>
      ) : (
        <ul className='post-list'>
          {posts.map((post) => (
            <li key={post.id} className='post' onClick={() => handlePostClick(post)}>
              <p>{post.title}</p>
              <div className='post-footer'>
                <span className='like-dislike-container'>
                  <span className='like-icon'>👍 {post.likes || 0}</span>
                </span>
                <span className='comment-icon'>💬</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default AllPosts;
