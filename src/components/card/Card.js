import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      className: 'card'
    };
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          className: 'card animated'
        }),
      this.props.index * 150
    );
  }

  renderContent() {
    const { index, author, excerpt } = this.props;
    return (
      <Link to={`/${index}`} className={this.state.className} id={index}>
        <h2>
          Author: <strong>{author}</strong>
        </h2>
        <p>{excerpt}</p>
      </Link>
    );
  }

  renderPlus() {
    const { index } = this.props;
    return (
      <Link to={`/add/${index}`} className={this.state.className} id="new">
        <span className="plus">
          <i className="fas fa-plus-circle fa-3x" />
        </span>
      </Link>
    );
  }

  render() {
    return this.props.author ? this.renderContent() : this.renderPlus();
  }
}

Card.propTypes = {
  author: PropTypes.string,
  excerpt: PropTypes.string,
  index: PropTypes.string.isRequired
};

export default Card;
