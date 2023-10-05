import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog Component', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 10,
    user: { id: 1 }
  }

  const user = {
    id: 1
  }

  beforeEach(() => {
    render(<Blog blog={blog} user={user} />)
  })

  test('renders title and author by default', () => {
    const titleElement = screen.getByText('Title: Test Blog')
    const authorElement = screen.getByText('Author: Test Author')

    expect(titleElement).toBeInTheDocument()
    expect(authorElement).toBeInTheDocument()
  })

  test('does not render URL and likes by default', () => {
    const urlElement = screen.queryByText('http://example.com')
    const likesElement = screen.queryByText('10')

    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })
  // test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.
  test('shows URL and likes when the "Show details" button is clicked', () => {
    const showDetailsButton = screen.getByText('Show details')
    fireEvent.click(showDetailsButton)

    const urlElement = screen.getByText('http://example.com')
    const likesElement = screen.getByText('10')

    expect(urlElement).toBeInTheDocument()
    expect(likesElement).toBeInTheDocument()
  })
})