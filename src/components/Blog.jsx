// ../components/Blog.jsx
import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  console.log('likes state:', likes)
  const [notification, setNotification] = useState({ message: null, type: null })

  const showNotification = (message, type) => {
    setNotification({ message, type })
    console.log('notification type', type)
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }


  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    
    try {
      const updatedBlog = await blogService.updateLikes(blog.id, {
        ...blog,
        likes: likes + 1
      })
      setLikes(updatedBlog.likes)
      showNotification('Blog liked', 'success')
      console.log('Likes updated:', updatedBlog.likes)
    } catch (error) {
      console.error('Error updating likes:', error)
      showNotification('Error updating likes', 'error')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <nbsp/>
        <button onClick={toggleDetails}>{showDetails ? 'Hide details' : 'Siew details'}</button>
      </div>
      <Notification notification={notification} />
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            {likes}{' '}
            <button onClick={handleLike} >Like</button>
            </div>
          <div>{blog.author}</div>
        </div>

      )}
    </div>
  )
}


export default Blog