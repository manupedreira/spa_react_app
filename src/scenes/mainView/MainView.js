import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import Footer from '../../components/footer/Footer';

class MainView extends React.Component {
  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(article, index) {
    const { author, excerpt, id } = article;
    return (
      <li key={index}>
        <Card author={author} excerpt={excerpt} index={id} />
      </li>
    );
  }

  render() {
    const articles = JSON.parse(this.props.articles);
    const lastKey = articles.length;
    return (
      <div className="full-parent">
        <Header />
        <ul className="articles">
          {articles.map((article, index) => this.renderItem(article, index))}
          <li key={lastKey}>
            <Card index="add" />
          </li>
        </ul>
        <Footer />
      </div>
    );
  }
}

MainView.propTypes = {
  articles: PropTypes.string
};

export default MainView;
