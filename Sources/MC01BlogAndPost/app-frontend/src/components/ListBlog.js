import React, { Component } from 'react'
import Select from 'react-select'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
const axios = require('axios')

export class ListBlog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listBlogs: [],
            newBlog: {
                Title: '',
                Content: ''
            },
            messageNewBlog: '',
            newPost: {
                Title: '',
                Content: '',
                Blog: null
            },
            messageNewPost: '',
            isShowModalEditPost: false,
            currentEditPost: {}
        }

        this.handleClickIntoBlog = this.handleClickIntoBlog.bind(this)
        this.renderListPosts = this.renderListPosts.bind(this)

        this.handleChangeInputTitle = this.handleChangeInputTitle.bind(this)
        this.handleChangeInputContent = this.handleChangeInputContent.bind(this)
        this.handleClickSaveBlog = this.handleClickSaveBlog.bind(this)

        this.handleChangeInputPostTitle = this.handleChangeInputPostTitle.bind(this)
        this.handleChangeInputPostContent = this.handleChangeInputPostContent.bind(this)
        this.handleChangeInputPostBlog = this.handleChangeInputPostBlog.bind(this)
        this.handleClickSavePost = this.handleClickSavePost.bind(this)

        this.toggleModalEditPost = this.toggleModalEditPost.bind(this)
    }

    componentDidMount() {
        let that = this

        axios.get('/Home/ListBlogs')
            .then(function (response) {
                that.setState({
                    listBlogs: response.data.ListBlogs
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleClickIntoBlog(blog) {
        let that = this
        if(blog.data) return

        axios.get(`/Home/ListPostsNew?blogId=${blog.BlogId}`)
            .then(function (response) {
                let {
                    listBlogs
                } = that.state

                blog.listPosts = response.data.ListPosts

                that.setState({
                    listBlogs
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChangeInputTitle(event) {
        let {
            newBlog
        } = this.state

        newBlog.Title = event.target.value

        this.setState({
            newBlog
        })
    }

    handleChangeInputPostTitle(event) {
        let {
            newPost
        } = this.state

        newPost.Title = event.target.value

        this.setState({
            newPost
        })
    }

    handleChangeInputContent(event) {
        let {
            newBlog
        } = this.state

        newBlog.Content = event.target.value

        this.setState({
            newBlog
        })
    }

    handleChangeInputPostContent(event) {
        let {
            newPost
        } = this.state

        newPost.Content = event.target.value

        this.setState({
            newPost
        })
    }

    handleClickSaveBlog() {
        let {
            newBlog,
            listBlogs
        } = this.state

        if (newBlog.Title && newBlog.Title.trim() != '' &&
            newBlog.Content && newBlog.Content.trim() != '') {

            let that = this

            axios.post('/Home/AddNewBlog', newBlog)
                .then(function (response) {

                    let {
                        ListBlogs,
                        IsSuccessAddNewBlog
                    } = response.data

                    let messageNewBlog = ''

                    if (IsSuccessAddNewBlog) {
                        messageNewBlog = 'Add success'
                    } else {
                        messageNewBlog = 'Error'
                    }

                    for (var newBlog of ListBlogs) {
                        for (var blog of listBlogs) {
                            if (newBlog.BlogId === blog.BlogId) {
                                newBlog.data = blog.data
                            }
                        }
                    }

                    that.setState({
                        listBlogs: ListBlogs,
                        messageNewBlog,
                        newBlog: {
                            Title: '',
                            Content: ''
                        }
                    })

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Input your infor")
        }
    }

    handleChangeInputPostBlog(selectedOption) {
        let {
            newPost
        } = this.state

        newPost.Blog = selectedOption

        this.setState({
            newPost
        })
    }

    handleClickSavePost() {
        let {
            newPost,
            listBlogs
        } = this.state

        if (newPost.Title && newPost.Title.trim() != '' &&
            newPost.Content && newPost.Content.trim() != '' &&
            newPost.Blog != null) {

            let that = this
            newPost.BlogId = newPost.Blog.value

            axios.post('/Home/AddNewPost', newPost)
                .then(function (response) {

                    let {
                        ListPosts,
                        IsSuccessAddNewPost
                    } = response.data

                    let messageNewPost = ''

                    if (IsSuccessAddNewPost) {
                        messageNewPost = 'Add success'
                    } else {
                        messageNewPost = 'Error'
                    }

                    let currentBlog = listBlogs.filter((blog) => {
                        return blog.BlogId == newPost.BlogId
                    })[0]
                    currentBlog.listPosts = ListPosts

                    that.setState({
                        listBlogs,
                        messageNewPost: '',
                        newPost: {
                            Title: '',
                            Content: '',
                            Blog: null
                        }
                    })

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Input your infor")
        }
    }

    renderListPosts(listPosts) {
        let that = this
        let divItems = null

        if (listPosts) {
            divItems = listPosts.map((post) => {
                return (
                    <li>
                        <h6>{post.Content}</h6>
                        <Button color="warning" onClick={that.toggleModalEditPost.bind(that, post)}>Edit {post.Title}</Button>{' '}
                    </li>
                )
            })
        }

        return (
            <ul>{divItems}</ul>
        )
    }

    toggleModalEditPost(post) {
        if (!post) post = {}
        let {
            isShowModalEditPost
        } = this.state
        isShowModalEditPost = !isShowModalEditPost
        this.setState({
            isShowModalEditPost,
            currentEditPost: post
        })
    }

    render() {

        let {
            listBlogs,
            newBlog,
            messageNewBlog,
            newPost,
            messageNewPost,
            isShowModalEditPost,
            currentEditPost
        } = this.state

        let divItems = null
        let that = this

        let options = []

        if (listBlogs) {
            divItems = listBlogs.map((blog) => {
                return (
                    <li className="list-group-item" onClick={that.handleClickIntoBlog.bind(that, blog)}>
                        <h4>{blog.Title}</h4>
                        <p>{blog.Content}</p>
                        {blog.listPosts ? that.renderListPosts(blog.listPosts) : null}
                    </li>    
                )
            })

            options = listBlogs.map((blog) => {
                return {
                    value: blog.BlogId,
                    label: blog.Title
                }
            })
        }

        return (
            <div>
                <h3>Add New Blog</h3>
                <div>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" className="form-control"
                            value={newBlog.Title}
                            onChange={this.handleChangeInputTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <input type="text" className="form-control"
                            value={newBlog.Content}
                            onChange={this.handleChangeInputContent}
                        />
                    </div>
                    {messageNewBlog ? <p>{messageNewBlog}</p> : null}
                    <button type="button" className="btn btn-success" onClick={this.handleClickSaveBlog}>Add new blog</button>
                </div>

                <hr />

                <h3>Add New Post</h3>
                <div>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" className="form-control"
                            value={newPost.Title}
                            onChange={this.handleChangeInputPostTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <input type="text" className="form-control"
                            value={newPost.Content}
                            onChange={this.handleChangeInputPostContent}
                        />
                    </div>
                    <div className="form-group">
                        <label>Blog:</label>
                        <Select
                            value={newPost.Blog}
                            onChange={this.handleChangeInputPostBlog}
                            options={options}
                        />
                    </div>
                    {messageNewPost ? <p>{messageNewPost}</p> : null}
                    <button type="button" className="btn btn-success" onClick={this.handleClickSavePost}>Add new post</button>
                </div>

                <hr/>

                <h3>ListBlog Component</h3>
                <ul className="list-group col-md-6">{divItems}</ul>

                {
                    //show modal edit post
                }
                <Modal isOpen={isShowModalEditPost} toggle={that.toggleModalEditPost}>
                    <ModalHeader>Edit {currentEditPost.Title}</ModalHeader>
                    <ModalBody>
                        {currentEditPost.Content}
                </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={that.toggleModalEditPost}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={that.toggleModalEditPost}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}