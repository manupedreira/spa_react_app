import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainView from './MainView';

function MainViewScreen(props) {
  return <MainView articles={props.articles} />;
}

MainViewScreen.propTypes = {
  articles: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    articles:
      typeof state.articles.list === 'string' ? state.articles.list : '[]'
  };
}

export default connect(mapStateToProps)(MainViewScreen);
