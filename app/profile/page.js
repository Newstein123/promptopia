'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const page = () => {
  const {data : session} = useSession("");
  const [posts, setPosts] = useState([])
  const handleEdit = () => {

  }

  const handleDelete = async () => {

  }

  useEffect(() => {
    const fetchPost = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await res.json();
        setPosts(data);
    }
    if(session?.user.id) fetchPost();
}, [])
console.log(posts)
  return (
    <Profile 
    name="My"
    description="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default page
