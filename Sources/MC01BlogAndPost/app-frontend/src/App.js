import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux';

import { simpleAction } from './actions/simpleAction'
import { fetchBlogs } from './actions/blogAction'

import { push } from 'connected-react-router'
import { routes } from './router'
import { ListBlog } from './components/ListBlog'

let logo = '/app-frontend/dist/images/logo.svg'



class App extends Component {

    constructor(props) {
        super(props)

        this.handleClickSimpleAction = this.handleClickSimpleAction.bind(this)
        this.handleClickLink = this.handleClickLink.bind(this)
    }

    componentDidMount() {
        this.props.fetchBlogs()
    }

    handleClickSimpleAction(event) {
        this.props.simpleAction()
    }

    handleClickLink() {
        this.props.push(routes.blogDetail.path.replace(':id', 19))
    }

    render() {

        let { listBlogs } = this.props.blogReducer
        let divBlogItems = null
        if (listBlogs) {
            divBlogItems = listBlogs.map((blog, idx) => {
                return (
                    <li className="list-group-item" key={idx}>{blog.Title}</li>
                )
            })
        }

        return (
            <div className="App container">

                <h2>List blogs from API</h2>
                <ul className="list-group col-md-6">
                    {divBlogItems}
                </ul>

                <a
                    className="App-link"
                    onClick={this.handleClickLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    Go to blog detail
                    </a>

                <hr/>

                <ListBlog />
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    router: state.router,
    blogReducer: state.blogReducer
})

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction()),
    push: (data) => dispatch(push(data)),
    fetchBlogs: () => dispatch(fetchBlogs())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
