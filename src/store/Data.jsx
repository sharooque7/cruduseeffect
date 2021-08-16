import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

//Context Api
export const Data = createContext({
  post: [],
  users: [],
  dropDown: false,
  values: "select user",
  title: "",
  body: " ",
  PostId: "",
  userId: "",
  commentsData: [],
  toggle: () => {},
  selectValues: () => {},
  deletePost: () => {},
  editPost: () => {},
  updatePost: () => {},
  createPost: () => {},
  comments: () => {},
});

export const PageProvider = (props) => {
  //States
  const [commentsData, setcommentsData] = useState([]);
  const [post, setPost] = useState([]);
  const [users, setSuers] = useState([]);
  const [dropDowns, setdropDown] = useState(false);
  const [values, setvalues] = useState("select user");
  const [title, setTitle] = useState("");
  const [Body, setBody] = useState("");
  const [PostId, setPostID] = useState("");
  const [userId, setUserId] = useState("");

  //Onmount Will call and populate post and users
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setSuers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Toggle the dropdown
  const toggle = () => {
    setdropDown(!dropDowns);
  };

  //Select USer o DropDown
  const selectValues = (e) => {
    setdropDown(!dropDowns);
    setvalues(e.target.innerText);
  };

  //Deelete Api
  const deletePost = (postId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    let delposts = [...post];
    delposts = delposts.filter((post) => post.id !== postId);
    setPost(delposts);
  };

  //Edit Api
  const editPost = (post) => {
    let user = users.filter((user) => {
      return user.id === post.userId;
    });
    console.log(user);
    setTitle(post.title);
    setUserId(post.userId);
    setPostID(post.id);
    setBody(post.body);
    setvalues(user[0].name);
  };
  //Update Api
  const updatePost = async () => {
    console.log(PostId);
    console.log(title);
    console.log(Body);
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${PostId}`,
      {
        userId: userId,
        title: title,
        body: Body,
      }
    );
    const posts = post;
    const index = posts.findIndex((post) => post.id === PostId);
    posts[index] = data;
    setPost(posts);
    setTitle("");
    setUserId("");
    setPostID("");
    setBody("");
    setvalues("Select users");
  };

  //Create Post APi
  const createPost = async () => {
    let selectuser = users.filter((user) => {
      return user.name === values;
    });
    const id = selectuser[0].id;
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: title,
        body: Body,
        userId: id,
      }
    );
    const posts = [...post];
    posts.push(data);
    setPost(posts);
  };

  const comments = async (postId) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    setcommentsData(data);
  };
  return (
    <Data.Provider
      value={{
        post,
        setPost,
        users,
        toggle,
        values,
        selectValues,
        dropDowns,
        title,
        deletePost,
        Body,
        PostId,
        userId,
        editPost,
        updatePost,
        setTitle,
        setBody,
        createPost,
        comments,
        commentsData,
      }}
    >
      {props.children}
    </Data.Provider>
  );
};
