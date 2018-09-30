export default function ArticlesReducer(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_ARTICLES':
      return { ...state, list: action.payload };
    case 'RECEIVE_ARTICLE':
      return { ...state, selectedArticle: action.payload };
    default:
      return state;
  }
}
