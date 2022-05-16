/* eslint-disable no-undef */
import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Note />", () => {
  let container

  beforeEach(() => {
    const blog = {
      title: "Writing tests sucks",
      author: "Artemide",
      url: "http://www.google.com",
      likes: 236,
      user: { name: "Berlin Tegel" },
    }

    const user = { name: "Berlin Tegel" }
    const mockHandler = jest.fn()

    const { container } = render(
      <Blog
        blog={blog}
        notify={() => {}}
        replaceBlogs={() => {}}
        removeBlog={() => {}}
        user={user}
        uselessFunctionForTesting={mockHandler}
      />
    )
  })

  test("renders title and author but not url or likes", () => {
    const title = screen.getByText("Writing tests sucks")
    const author = screen.findByText("Artemide")
    const likes = screen.queryByText("236")
    expect(likes).toBe(null)
    const url = screen.queryByText("http://www.google.com")
    expect(url).toBe(null)
  })

  test("renders url and likes, too, after click", async () => {
    const user = userEvent.setup()
    const expandButton = screen.getByText("View")
    await user.click(expandButton)

    const title = screen.getByText("Writing tests sucks")
    const author = screen.findByText("Artemide")
    const likes = screen.findByText("236")
    const url = screen.findByText("http://www.google.com")
  })
})

describe("<Note /> without beforeAll", () => {
  test("liking twice calls event handler twice", async () => {
    // Init
    const blog = {
      title: "Writing tests sucks",
      author: "Artemide",
      url: "http://www.google.com",
      likes: 236,
      user: { name: "Berlin Tegel" },
    }

    const mockHandler = jest.fn()

    render(
      <Blog
        blog={blog}
        notify={() => {}}
        replaceBlogs={() => {}}
        removeBlog={() => {}}
        user={{ name: "Berlin Tegel" }}
        uselessFunctionForTesting={mockHandler}
      />
    )

    const user = userEvent.setup()

    // Expand
    const expandButton = screen.getByText("View")
    await user.click(expandButton)


    // Like
    const likeButton = screen.getByText("Like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
