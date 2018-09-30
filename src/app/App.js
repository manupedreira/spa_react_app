import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as articlesActions from '../core/articles/ArticlesActions';
import MainViewScreen from '../scenes/mainView/MainViewScreen';
import ArticleScreen from '../scenes/article/ArticleScreen';
import AddArticleScreen from '../scenes/article/AddArticleScreen';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="full-sized">
        <Route exact path="/" component={MainViewScreen} />
        <Route exact path="/:id" component={ArticleScreen} />
        <Route path="/add" component={AddArticleScreen} />
        <Route path="/edit/:id" component={AddArticleScreen} />
      </div>
    );
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(articlesActions.fetchPosts())
  };
}

export default withRouter(
  connect(
    '',
    mapDispatchToProps
  )(App)
);
