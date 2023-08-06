import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name, description, data, handleEdit, handleDelete}) => {
  return (
    <div className='w-full'>
        <h1 className='head_text text-left'> 
          <span className="blue_gradient">
            {name}
          </span> Profile </h1>
          <p className='desc text-left'> {description} </p>
          <div className="mt-16 prompt-layout">
            {
                data.map(post => (
                    <PromptCard 
                        key={post.id}
                        post={post}
                        handleEdit={handleEdit && handleEdit(post)}
                        handleDelete={handleDelete && handleDelete(post)}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default Profile
