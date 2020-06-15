import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMatchSelector } from 'connected-react-router'
import { routes } from '../router'
import './BlogDetail.css';

class BlogDetail extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log('Run BlogDetail Render', this.props.router)
        const matchSelector = createMatchSelector(routes.blogDetail)
        const match = matchSelector({ router: this.props.router })
        const id = match.params.id
        console.log(id)

        return (
            <div className="BlogDetail">
                Why do we use it?
                It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout. 
                The point of using Lorem Ipsum is that it has a more-or-less normal 
                distribution of letters, as opposed to using 'Content here, content here', 
                making it look like readable English. Many desktop publishing packages and 
                web page editors now use Lorem Ipsum as their default model text, and a 
                search for 'lorem ipsum' will uncover many web sites still in their infancy. 
                Various versions have evolved over the years, sometimes by accident, sometimes 
                on purpose (injected humour and the like).
            </div>
        );
    }
}

const mapStateToProps = state => ({
    router: state.router
})

const mapDispatchToProps = dispatch => ({
    //simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
