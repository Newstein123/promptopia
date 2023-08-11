'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className="mt-16 prompt_layout">
            {
                data.map(post => (
                    <PromptCard 
                        key={post.id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                ))
            }
        </div>
    )
}
const Feeds = () => {
    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])
    const [searchResult, setSearchResult] = useState([]);

    const filterPosts = (text) => {
        const reg = new RegExp(text, 'i')
        return posts.filter(item => 
                reg.test(item.creator.username) || 
                reg.test(item.prompt) ||
                reg.test(item.tag)
            )
    }
    const handleSearch = (e) => {
        const post = e.target.value.toLowerCase();
        setSearchText(post);
        setTimeout(() => {
            const searchPosts = filterPosts(post)
            setSearchResult(searchPosts)
        }, 500)
    }

    const handleTagClick = (tag) => {
        setSearchText(tag)
        const searchPosts = filterPosts(tag)
        console.log(searchPosts)
        setSearchResult(searchPosts)
    }
    
    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch('/api/prompt');
            const data = await res.json();
            setPosts(data);
            setSearchResult(data);
        }

        fetchPost();
    }, [])
  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input 
            type="text" 
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearch}
            required
            className='search_input peer'
            />
        </form>
        {/* <PromptCardList
        data ={searchText == "" ? posts : searchResult}
        handleTagClick = {handleTagClick}
        /> */}
    </section>
  )
}

export default Feeds
