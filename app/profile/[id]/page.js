"use client"
import { useSearchParams, useRouter } from 'next/navigation'
import React from 'react'
import Profile from '@components/Profile'
import { useState, useEffect } from 'react'

const page = () => {
    const seachrParams = useSearchParams();
    const userId = seachrParams.get("id");
    
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();

        setMyPosts(data);
        };

        if (userId) fetchPosts();
    }, []);
  return (
    <div>
        <Profile
            name="Your"
            desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            data={myPosts}
            />
    </div>
  )
}

export default page
