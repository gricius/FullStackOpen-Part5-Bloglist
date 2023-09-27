// ../components/BlogForm.jsx
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }



  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            name="Title"
            value={newBlog.title}
            onChange={(e) =>
              setNewBlog({ ...newBlog, title: e.target.value })
            }
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="Author"
            value={newBlog.author}
            onChange={(e) =>
              setNewBlog({ ...newBlog, author: e.target.value })
            }
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            name="Url"
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm

