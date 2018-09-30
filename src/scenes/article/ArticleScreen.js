import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as articlesActions from '../../core/articles/ArticlesActions';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.location.pathname.replace('/', '')
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.state.id);
  }

  back() {
    this.props.history.goBack();
  }

  delete() {
    this.props
      .deletePost(this.state.id)
      .then(() => this.props.history.goBack());
  }

  renderItem() {
    const { article } = JSON.parse(this.props.selectedArticle);
    return (
      <div className="container article">
        <h2>
          <p>Title:</p>
          <strong>{article.title}</strong>
        </h2>
        <h2>
          <p>Author:</p>
          <strong>{article.author}</strong>
        </h2>
        <div>{article.content}</div>
        <div>
          Published: <strong>{`${article.published}`}</strong>
        </div>
        <div className="tag-list">
          <p>Tags:</p>
          <strong>{article.tags.toString().replace(',', ', ')}</strong>
        </div>
        <div className="button-container">
          <span className="back" onClick={() => this.back()}>
            <i className="fas fa-chevron-circle-left fa-3x" />
          </span>
          <Link to={`/edit/${this.state.id}`}>
            <span className="edit">
              <i className="fas fa-pen-square" />
            </span>
          </Link>
          <span className="delete" onClick={() => this.delete()}>
            <i className="fas fa-trash" />
          </span>
        </div>
      </div>
    );
  }

  render() {
    const articleWrapper = JSON.parse(this.props.selectedArticle);
    return (
      <div className="full-parent">
        <Header />
        <div className="articles">
          {articleWrapper.article && this.renderItem()}
        </div>
        <Footer />
      </div>
    );
  }
}

ArticleScreen.propTypes = {
  deletePost: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  selectedArticle: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    selectedArticle:
      typeof state.articles.selectedArticle === 'string'
        ? state.articles.selectedArticle
        : '{}'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: id => dispatch(articlesActions.deletePost(id)),
    fetchPost: id => dispatch(articlesActions.fetchPost(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleScreen);
