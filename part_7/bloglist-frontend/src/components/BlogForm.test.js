/* eslint-disable no-undef */
import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("<BlogForm />", () => {
  test("calls callback func with correct data", async () => {
    const blog = {
      title: "Writing tests sucks",
      author: "Artemide",
      url: "http://www.google.com",
    }

    const user = userEvent.setup()
    const mockHandler = jest.fn()

    render(<BlogForm createBlog={mockHandler}/>)
    const titleInput = screen.getByPlaceholderText("Title")
    const authorInput = screen.getByPlaceholderText("Author")
    const urlInput = screen.getByPlaceholderText("URL")

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)

    const sendButton =  screen.getByText("Add")
    await user.click(sendButton)

    const sentObject = mockHandler.mock.calls[0][0]
    expect(sentObject.author).toBe(blog.author)
    expect(sentObject.title).toBe(blog.title)
    expect(sentObject.url).toBe(blog.url)
  })
})