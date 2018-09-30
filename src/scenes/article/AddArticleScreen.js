import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as articlesActions from '../../core/articles/ArticlesActions';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);

    const location = props.location.pathname.split('/');

    this.state = {
      action: location[1],
      article: {
        title: '',
        author: '',
        content: '',
        published: false,
        tags: ''
      },
      disabled: true,
      id: (location[1] === 'edit' && location.pop()) || '',
      received: false
    };

    this.setInput = this.setInput.bind(this);
  }

  async componentDidMount() {
    if (this.state.id !== '' && !this.state.received) {
      this.props.fetchPost(this.state.id).then(response => {
        const selectedArticle = JSON.parse(response).article;
        this.setState({
          ...this.state,
          article: {
            ...selectedArticle,
            tags: selectedArticle.tags.toString().replace(',', ', ')
          },
          received: true
        });
      });
    }
  }

  back() {
    this.props.history.goBack();
  }

  sendQuery() {
    const article = {
      title: this.state.article.title.trim(),
      author: this.state.article.author.trim(),
      content: this.state.article.content.trim(),
      published: this.state.article.published,
      tags: this.state.article.tags
        .trim()
        .replace(', ', ',')
        .split(',')
    };
    if (this.state.action === 'edit' && !this.state.disabled) {
      this.props
        .updatePost(this.state.id, article)
        .then(() => this.props.history.push('/'));
    } else if (!this.state.disabled) {
      this.props.addPost(article).then(() => this.props.history.push('/'));
    }
  }

  setInput(event) {
    const article = this.state.article;
    let value = event.target.value;
    if (event.target.name === 'published') {
      value = event.target.value === 'true';
    }
    const modifiedArticle = {
      ...article,
      [event.target.name]: value
    };
    const disabled = this.validateArticle(modifiedArticle);
    this.setState({
      ...this.state,
      article: modifiedArticle,
      disabled
    });
  }

  validateArticle(article) {
    const { title, author, content, tags } = article;
    let disabled = true;
    if (
      title.trim() !== '' &&
      author.trim() !== '' &&
      content.trim() !== '' &&
      tags.trim() !== ''
    ) {
      disabled = false;
    }
    return disabled;
  }

  renderItem() {
    const article = this.state.article;
    return (
      <div className="container addArticle">
        <h2>
          <p>Title:</p>
          <input
            value={article.title}
            name="title"
            type="text"
            onChange={this.setInput}
            autoFocus
          />
        </h2>
        <h2>
          <p>Author:</p>
          <input
            value={article.author}
            name="author"
            type="text"
            onChange={this.setInput}
          />
        </h2>
        <div>
          <p>Content:</p>
          <textarea
            value={article.content}
            name="content"
            rows="15"
            onChange={this.setInput}
          />
        </div>
        <div>
          <p>Published: </p>
          <input
            name="published"
            type="radio"
            value="true"
            checked={this.state.article.published}
            onChange={this.setInput}
          />
          <p>True</p>
          <input
            name="published"
            type="radio"
            value="false"
            checked={!this.state.article.published}
            onChange={this.setInput}
          />
          <p>False</p>
        </div>
        <div className="tag-list">
          <p>Tags:</p>
          <input name="tags" value={article.tags} onChange={this.setInput} />
        </div>
        <div className="button-container">
          <span className="back" onClick={() => this.back()}>
            <i className="fas fa-chevron-circle-left fa-3x" />
          </span>
          <span
            className={`save${this.state.disabled ? ' disabled' : ''}`}
            onClick={() => this.sendQuery()}
          >
            <i className="fas fa-save" />
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="full-parent">
        <Header />
        <div className="articles">{this.renderItem()}</div>
        <Footer />
      </div>
    );
  }
}

ArticleScreen.propTypes = {
  addPost: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  selectedArticle: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired
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
    addPost: article => dispatch(articlesActions.addPost(article)),
    fetchPost: id => dispatch(articlesActions.fetchPost(id)),
    updatePost: (id, article) =>
      dispatch(articlesActions.updatePost(id, article))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleScreen);
