import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  findByText,
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import LoginForm from "./LoginForm";
import * as axios from "axios";
import { BlogsService } from "../services/blogs";

jest.mock("../services/blogs");
const mockHandler = jest.fn();

describe("tests 5.13 - 5.16", () => {
  let container;

  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: 1,
    user: {
      username: "testUsername",
      name: "testName",
      id: "64d4b36c883201670727fadT",
    },
  };

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateBlogList={mockHandler} />,
    ).container;
  });

  test("renders title and author, but not url or likes, when not toggled", () => {
    const urlAndLikes = container.querySelector(".togglableContent");
    const titleAndAuthor = container.querySelector(".title-author");
    expect(titleAndAuthor).not.toHaveStyle("display: none");
    expect(urlAndLikes).toHaveStyle("display: none");
  });

  test("renders title, author, url and likes when toggle view clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const titleAndAuthor = container.querySelector(".title-author");
    const urlAndLikes = container.querySelector(".togglableContent");
    expect(titleAndAuthor).not.toHaveStyle("display: none");
    expect(urlAndLikes).not.toHaveStyle("display: none");
  });

  test("if like button is clicked twice, the event handler is called twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("test if the blog form is submitted with the right details given by the user", async () => {
    const mockCreateBlog = jest.fn();
    const container2 = render(
      <BlogForm createBlog={mockCreateBlog} user="testUser" />,
    ).container;
    const user = userEvent.setup();
    const textBoxTitle = container2.querySelector(".blogFormTitleInput");
    const textBoxAuthor = container2.querySelector(".blogFormAuthorInput");
    const textBoxUrl = container2.querySelector(".blogFormUrlInput");
    const createBlogButton = screen.getByText("create");

    fireEvent.change(textBoxTitle, { target: { value: "testTitle" } });
    fireEvent.change(textBoxAuthor, { target: { value: "testAuthor" } });
    fireEvent.change(textBoxUrl, { target: { value: "testUrl" } });
    await user.click(createBlogButton);

    await waitFor(() => {
      expect(mockCreateBlog).toHaveBeenCalledWith({
        title: "testTitle",
        author: "testAuthor",
        url: "testUrl",
        user: "testUser",
      });
    });
  });
});
