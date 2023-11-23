"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './style.css'; 
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Image from 'next/image';

interface Post {
    id: number;
    title: string;
    body: string;
    likes?: number;
    dislikes?: number;
    comments?: number;
    views?: number;
}

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [freePostsLeft, setFreePostsLeft] = useState<number>(20);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [userActions, setUserActions] = useState<{ [postId: number]: string }>({});

    const router = useRouter(); // Initializing the  useRouter
    const containerRef = useRef<HTMLDivElement | null>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
            setPosts((prevPosts) => [...prevPosts, ...response.data]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching posts', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePostClick = (post: Post) => {
        if (freePostsLeft > 0) {
            setSelectedPost(post);
            setFreePostsLeft((prevCount) => prevCount - 1);
        } else {
            // Implementing paywall alert
            alert('Paywall: You have exceeded your free limit. Please subscribe for more.');
        }
    };

    const handleLikeClick = (isLike: boolean) => {
        if (!selectedPost || userActions[selectedPost.id]) {
            // If the post is not selected or the user has already taken action, do nothing
            return;
        }

        // Mock API call to increment likes or dislikes for the selected post
 
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === selectedPost.id
                    ? {
                        ...post,
                        likes: isLike ? (post.likes || 0) + 1 : post.likes || 0,
                        dislikes: !isLike ? (post.dislikes || 0) + 1 : post.dislikes || 0,
                    }
                    : post
            )
        );

        setSelectedPost((prevPost) =>
            prevPost
                ? {
                    ...prevPost,
                    likes: isLike ? (prevPost.likes || 0) + 1 : prevPost.likes || 0,
                    dislikes: !isLike ? (prevPost.dislikes || 0) + 1 : prevPost.dislikes || 0,
                }
                : null
        );

        setUserActions((prevActions) => ({
            ...prevActions,
            [selectedPost.id]: isLike ? 'like' : 'dislike',
        }));
    };

    const handleModalClose = () => {
        setSelectedPost(null);
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {

                fetchPosts();
            }
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }


        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    const handleAvatarClick = () => {
        router.push('/profile');
    };

    const visiblePosts = posts.slice(0, 20); // Displaying only the first 20 posts

    return (
        <div>
            <Navbar />
            <div className='container' ref={containerRef}>

                <div className="avatar-container" onClick={handleAvatarClick}>
                    <Image
                        src="/assests/jayy.jpg"
                        alt="User Avatar"
                        className="avatar"
                        width={100}
                        height={100}
                    />
                </div>
                <h1>Feed</h1>
                <p className='free-posts-left'>Free posts left today: {freePostsLeft}</p>
                <ul className='post-list'>
                    {visiblePosts.map((post) => (
                        <li key={post.id} className='post' onClick={() => handlePostClick(post)}>
                            <p>{post.title}</p>
                            <div className='post-footer'>
                                <span className='like-dislike-container'>
                                    <span onClick={() => handleLikeClick(true)} className='like-icon'>
                                        👍 {post.likes || 0}
                                    </span>
                                    <span onClick={() => handleLikeClick(false)} className='dislike-icon'>
                                        👎 {post.dislikes || 0}
                                    </span>
                                </span>
                                <span className='comment-icon'>💬 {post.comments || 0}</span>
                                <span className='view-count'>👀 {post.views || 0}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                {freePostsLeft === 0 && (
                    <div className='paywall-popup'>
                        <p className='paywall'>Upgrade to premium for unlimited access.</p>
                        <button onClick={() => handlePostClick({} as Post)}>Pay Now</button>
                    </div>
                )}

                {selectedPost && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <span className='close' onClick={handleModalClose}>
                                &times;
                            </span>
                            <h2>{selectedPost.title}</h2>
                            <p>{selectedPost.body}</p>
                            <div className='likes-comments'>
                                <span className='like-dislike-container'>
                                    <span onClick={() => handleLikeClick(true)} className='like-icon'>
                                        👍 {selectedPost.likes || 0}
                                    </span>
                                    <span onClick={() => handleLikeClick(false)} className='dislike-icon'>
                                        👎 {selectedPost.dislikes || 0}
                                    </span>
                                </span>
                                <span className='comment-icon'>💬</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Feed;
