// ../components/Blog.jsx
import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button>Like</button>
            </div>
          <div>{blog.author}</div>
        </div>

      )}
    </div>
  )
}


export default Blog