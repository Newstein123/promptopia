'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Form from '@app/create-prompt/From';

const page = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false)
    const searchParms = useSearchParams();
    const promptId = searchParms.get("id");
    const [post, setPost] = useState({
        prompt : "",
        tag : "",
    })

    useEffect(() => {
        const getPromptDetail = async() => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json();
            setPost({
                prompt : data.prompt,
                tag : data.tag
            })
        }
       if(promptId) getPromptDetail();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert('Missing prompt Id')
        try{
            const response = await fetch(`/api/prompt/${promptId}`, {
                method : 'PATCH',
                body : JSON.stringify({
                    prompt : post.prompt,
                    tag : post.tag
                })
            })

            if(response.ok) {
                router.push('/');
            }
        }catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    }


  return (
    <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default page