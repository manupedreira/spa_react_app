import request from '../../request';
import * as queries from '../../queries';

export function fetchArticles() {
  return {
    type: 'FETCH_ARTICLES'
  };
}

export function fetchArticle() {
  return {
    type: 'FETCH_ARTICLE'
  };
}

export function receiveArticles(data) {
  return {
    type: 'RECEIVE_ARTICLES',
    payload: data
  };
}

export function receiveArticle(data) {
  return {
    type: 'RECEIVE_ARTICLE',
    payload: data
  };
}

export function addPost(article) {
  console.log(queries.addQuery(article));
  return function(dispatch) {
    return request(queries.addQuery(article)).then(() => {
      dispatch(fetchPosts());
    });
  };
}

export function deletePost(id) {
  return function(dispatch) {
    return request(queries.deleteQuery(id)).then(() => {
      dispatch(fetchPosts());
    });
  };
}

export function fetchPosts() {
  return function(dispatch) {
    return request(queries.ARTICLES_QUERY)
      .then(response => JSON.stringify(response.data.articles, null, 2))
      .then(data => {
        dispatch(receiveArticles(data));
      });
  };
}

export function fetchPost(id) {
  return function(dispatch) {
    return request(queries.findIdQuery(id))
      .then(response => JSON.stringify(response.data, null, 2))
      .then(data => {
        dispatch(receiveArticle(data));
        return data;
      });
  };
}

export function updatePost(id, article) {
  return function(dispatch) {
    return request(queries.updateQuery(id, article)).then(() => {
      dispatch(fetchPosts());
    });
  };
}
