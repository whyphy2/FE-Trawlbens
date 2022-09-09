import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    rate: 'rate'
}

export const movieType = {
    popular: 'popular',
}

const requestApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
    getGuestSession: () => {
        const url = "authentication/guest_session/new?api_key="+apiConfig.apiKey;
        return axiosClient.get(url)
    },
    postRate: (idMovie, params) => {
        const url = "movie/"+idMovie+"/rating?api_key="+apiConfig.apiKey+"&guest_session_id="+localStorage.getItem("guest_session_id");
        return axiosClient.post(url, {value : params});
    },
    getMyRate: () => {
        const url = "guest_session/"+localStorage.getItem("guest_session_id")+"/rated/movies?api_key="+apiConfig.apiKey;
        return axiosClient.get(url);
    },
    deleteMyRate : (idMovie) => {
        const url ="/movie/"+idMovie+"/rating?api_key="+apiConfig.apiKey+"&guest_session_id="+localStorage.getItem("guest_session_id");
        return axiosClient.delete(url);
    }
}

export default requestApi;