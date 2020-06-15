import { FETCH_BLOGS } from './types'
import axios from 'axios'

const apiFetchBlog = '/Home/ListBlogs';

export const fetchBlogs = () => {
    return (dispatch) => {
        return axios.get(apiFetchBlog)
            .then(response => {
                let resData = response.data
                if (resData.Success) {
                    dispatch(fetchBlogsSuccess(resData))
                }
            })
            .catch(error => {
                throw (error);
            })
    }
}

export const fetchBlogsSuccess = (data) => {
    return {
        type: FETCH_BLOGS,
        payload: {
            data: data.ListBlogs
        }
    }
}
