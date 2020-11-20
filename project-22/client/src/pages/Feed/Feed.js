import React, { Component, Fragment } from 'react';
// import openSocket from "socket.io-client";

import Post from '../../components/Feed/Post/Post';
import Button from '../../components/Button/Button';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import Input from '../../components/Form/Input/Input';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import './Feed.css';

class Feed extends Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: '',
    postPage: 1,
    postsLoading: true,
    editLoading: false
  };

  componentDidMount() {
    fetch("http://localhost:8081/auth/status", {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => {

        if (res.status !== 200) {
          throw new Error('Failed to fetch user status.');
        };

        return res.json();
      })
      .then(resData => {

        this.setState({ status: resData.status });
      })
      .catch(this.catchError);

    this.loadPosts();
    // const socket = openSocket("http://localhost:8081");;

    // socket.on("posts", data => {

    //   if (data.action === "create") {
    //     this.addPost(data.post);
    //   }
    //   else if (data.action === "update") {
    //     this.updatePost(data.post);
    //   }
    //   else if (data.action === "delete") {
    //     this.loadPosts();
    //   }

    // });
  };

  // addPost = post => {

  //   this.setState(prevState => {

  //     const updatedPosts = [...prevState.posts];

  //     if (prevState.postPage === 1) {
  //       updatedPosts.pop();
  //       updatedPosts.unshift(post);
  //     };

  //     return {
  //       posts: updatedPosts,
  //       totalPosts: prevState.totalPosts + 1
  //     };
  //   });
  // };

  // updatePost = post => {

  //   this.setState(prevState => {

  //     const updatedPosts = [...prevState.posts];
  //     const updatedPostIndex = updatedPosts.findIndex(p => p._id === post._id);

  //     if (updatedPostIndex > -1) {
  //       updatedPosts[updatedPostIndex] = post;
  //     };

  //     return {
  //       posts: updatedPosts
  //     };

  //   });
  // };

  loadPosts = direction => {

    if (direction) {
      this.setState({ postsLoading: true, posts: [] });
    };

    let page = this.state.postPage;

    if (direction === 'next') {
      page++;
      this.setState({ postPage: page });
    };

    if (direction === 'previous') {
      page--;
      this.setState({ postPage: page });
    };

    const graphqlQuery = {
      query: `
        {
          posts(page: ${page}) {
            posts {
              _id
              title
              content
              creator {
                post
              }
              createdAt
            }
          totalPost
          }
        }
      `
    }

    fetch("localhost://8081/graphql", {
      method: "POST",
      headers: {
        // @NOTE: "Bearer " Is a convention to kind of identify the type of token for JWT
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {

        // if (res.status !== 200) {
        //   throw new Error('Failed to fetch posts.');
        // };

        return res.json();
      })
      .then(resData => {

        if (resData.errors) {
          throw new Error("Fetching Post failed!");
        }

        this.setState({
          posts: resData.data.posts.posts.map(post => {

            return {
              ...post,
              imagePath: post.imageUrl
            }
          }),
          totalPosts: resData.data.posts.totalPosts,
          postsLoading: false
        });
      })

      .catch(this.catchError);
  };

  statusUpdateHandler = event => {

    event.preventDefault();

    fetch('URL')
      .then(res => {

        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Can't update status!");
        }
        return res.json();
      })
      .then(resData => {

        console.log(resData);
      })
      .catch(this.catchError);
  };

  newPostHandler = () => {

    this.setState({ isEditing: true });
  };

  startEditPostHandler = postId => {

    this.setState(prevState => {

      const loadedPost = { ...prevState.posts.find(p => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost
      };
    });
  };

  cancelEditHandler = () => {

    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = postData => {

    this.setState({
      editLoading: true
    });

    // Set up data (with image!)
    const formData = new FormData();

    // formData.append("title", postData.title);
    // formData.append("content", postData.content);
    formData.append("image", postData.image);

    if (this.state.editPost) {
      formData.append("oldPath", this.state.editPost.imagePath);
    };

    fetch("localhost://localhost:8081/post-image", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json"
      },
      body: formData
    })
      .then(response => response.json())
      .then(fileResponseData => {
        const imageUrl = fileResponseData.filePath;
        let graphqlQuery = {
          query: `
            mutation {
                createPost(postInput: {title: "${postData.title}",
                    content: "${postData.content}",
                    imageUrl: "${imageUrl}"}) {
                _id
                 title
                 content
                 imageUrl
                 creator {
                   name
                 }
                 createdAt
               }
             }
          `
        }

        return fetch("http://localhost:8081/graphql", {
          method: "POST",
          body: JSON.stringify(graphqlQuery),
          headers: {
            Authorization: "Bearer " + this.props.token,
            "Content-Type": "application/json"
          }
        })
      })
      .then(res => {

        // if (res.status !== 200 && res.status !== 201) {

        //   console.log("===> response.status", res.status)
        //   throw new Error('Creating or editing a post failed!');
        // }

        return res.json();
      })
      .then(resData => {

        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error("Validation failed. Make sure the email address isn't used yet!");
        }

        if (resData.errors) {
          throw new Error("User login failed");
        }

        console.log("===> finishEditHandler resData:", resData);

        const post = {
          _id: resData.data.createPost._id,
          title: resData.data.createPost.title,
          content: resData.data.createPost.content,
          creator: resData.data.createPost.creator,
          createdAt: resData.data.createPost.createdAt,
          imagePath: resData.data.createPost.imageUrl
        };

        this.setState(prevState => {

          let updatedPosts = [...prevState.posts];

          if (prevState.editPost) {
            const postIndex = prevState.posts.findIndex(
              p => p._id === prevState.editPost._id
            );

            updatedPosts[postIndex] = post;
          }
          else {
            updatedPosts.pop();
            updatedPosts.unshift(post);
          };

          return {
            posts: updatedPosts,
            isEditing: false,
            editPost: null,
            editLoading: false
          };
        });
      })
      .catch(err => {

        console.log(err);
        this.setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err
        });
      });
  };

  statusInputChangeHandler = (input, value) => {

    this.setState({ status: value });
  };

  deletePostHandler = postId => {

    this.setState({ postsLoading: true });
    fetch("http://localhost:8081/feed/post/" + postId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => {

        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Deleting a post failed!');
        };

        return res.json();
      })
      .then(resData => {

        console.log(resData);

        this.loadPosts();
        // this.setState(prevState => {
        //   const updatedPosts = prevState.posts.filter(p => p._id !== postId);
        //   return { posts: updatedPosts, postsLoading: false };
        // });
      })
      .catch(err => {

        console.log(err);
        this.setState({ postsLoading: false });
      });
  };

  errorHandler = () => {

    this.setState({ error: null });
  };

  catchError = error => {

    this.setState({ error: error });
  };

  render() {
    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
        <section className="feed__status">
          <form onSubmit={this.statusUpdateHandler}>
            <Input
              type="text"
              placeholder="Your status"
              control="input"
              onChange={this.statusInputChangeHandler}
              value={this.state.status}
            />
            <Button mode="flat" type="submit">
              Update
            </Button>
          </form>
        </section>
        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={this.newPostHandler}>
            New Post
          </Button>
        </section>
        <section className="feed">
          {this.state.postsLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {this.state.posts.length <= 0 && !this.state.postsLoading ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
          ) : null}
          {!this.state.postsLoading && (
            <Paginator
              onPrevious={this.loadPosts.bind(this, 'previous')}
              onNext={this.loadPosts.bind(this, 'next')}
              lastPage={Math.ceil(this.state.totalPosts / 2)}
              currentPage={this.state.postPage}
            >
              {this.state.posts.map(post => (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.creator.name}
                  date={new Date(post.createdAt).toLocaleDateString('en-US')}
                  title={post.title}
                  image={post.imageUrl}
                  content={post.content}
                  onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                  onDelete={this.deletePostHandler.bind(this, post._id)}
                />
              ))}
            </Paginator>
          )}
        </section>
      </Fragment>
    );
  };
};

export default Feed;
