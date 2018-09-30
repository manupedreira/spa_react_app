import { combineReducers } from 'redux';
import ArticlesReducer from '../core/articles/ArticlesReducer';

export default combineReducers({
  articles: ArticlesReducer
});
