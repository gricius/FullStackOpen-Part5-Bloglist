# 5.1: bloglist frontend, step1
Clone the application from [GitHub](https://github.com/fullstack-hy2020/bloglist-frontend) with the command:
```
git clone https://github.com/fullstack-hy2020/bloglist-frontend
```
remove the git configuration of the cloned application
```
cd bloglist-frontend   // go to cloned repository
rm -rf .git
```
The application is started the usual way, but you have to install its dependencies first:
```
npm install
npm start
```
Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state user.

If a user is not logged in, only the login form is visible.
<img src="https://fullstackopen.com/static/7974958a48f7a4e873550b1b85bd8cbd/5a190/4e.png">

If the user is logged-in, the name of the user and a list of blogs is shown.

<img src="https://fullstackopen.com/static/62a606d23ac2c2c96918567b8a8c7b32/5a190/5e.png">

User details of the logged-in user do not have to be saved to the local storage yet.

NB You can implement the conditional rendering of the login form like this for example:
```jsx
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          //...
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
```
# 5.2: bloglist frontend, step2
Make the login 'permanent' by using the local storage. Also, implement a way to log out.
<img src='https://fullstackopen.com/static/fa111e6eccf20340b5258c12553d2ea6/5a190/6e.png'>

Ensure the browser does not remember the details of the user after logging out.

# 5.3: bloglist frontend, step3
Expand your application to allow a logged-in user to add new blogs:
<img src='https://fullstackopen.com/static/b9f4cf7f481e4f1358be610031afe219/5a190/7e.png'>

# 5.4: bloglist frontend, step4
Implement notifications that inform the user about successful and unsuccessful operations at the top of the page. For example, when a new blog is added, the following notification can be shown:

<img src="https://fullstackopen.com/static/58838a80180d9d94fb4bc3673a8a67c0/5a190/8e.png">

Failed login can show the following notification:

<img src="https://fullstackopen.com/static/5f30f6f454735133b39d706a3fa7f9c1/5a190/9e.png">

The notifications must be visible for a few seconds. It is not compulsory to add colors.

# 5.5 Blog list frontend, step5
Change the form for creating blog posts so that it is only displayed when appropriate. Use functionality similar to what was shown earlier in this part of the course material. If you wish to do so, you can use the Togglable component defined in part 5.

By default the form is not visible

<img src="https://fullstackopen.com/static/de4cfabdf46a837f1f0bfdba4fd27d67/5a190/13ae.png">

It expands when button create new blog is clicked

<img src="https://fullstackopen.com/static/0cb27abc7b56ba5ecdd7e9d48d325c87/5a190/13be.png">

The form closes when a new blog is created.

# 5.6 Blog list frontend, step6
Separate the form for creating a new blog into its own component (if you have not already done so), and move all the states required for creating a new blog to this component.

The component must work like the NoteForm component from the material of this part.

# .7 Blog list frontend, step7
Let's add a button to each blog, which controls whether all of the details about the blog are shown or not.

Full details of the blog open when the button is clicked.

<img src="https://fullstackopen.com/static/b49e9ca45d0582829eed343baad44910/5a190/13ea.png">

And the details are hidden when the button is clicked again.

At this point, the like button does not need to do anything.

The application shown in the picture has a bit of additional CSS to improve its appearance.

It is easy to add styles to the application as shown in part 2 using inline styles:

```jsx
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      // ...
  </div>
)}
```

NB: even though the functionality implemented in this part is almost identical to the functionality provided by the Togglable component, the component can not be used directly to achieve the desired behavior. The easiest solution will be to add a state to the blog post that controls the displayed form of the blog post.

# 5.8: Blog list frontend, step8
We notice that something is wrong. When a new blog is created in the app, the name of the user that added the blog is not shown in the details of the blog:

<img src="https://fullstackopen.com/static/4c1a13b22d33df750f24a6e136e7abc1/5a190/59new.png">

When the browser is reloaded, the information of the person is displayed. This is not acceptable, find out where the problem is and make the necessary correction.