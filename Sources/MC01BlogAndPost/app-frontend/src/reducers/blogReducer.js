import { FETCH_BLOGS } from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_BLOGS:
            return {
                listBlogs: action.payload.data
            }
        default:
            return state
    }
}