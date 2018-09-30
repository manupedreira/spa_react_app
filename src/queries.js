export const ARTICLES_QUERY = `{
  articles {
    author
    excerpt
    id
    title
  }
}`;

export function addQuery(article) {
  return `mutation {
    add(
      author: "${article.author}",
      content: ${JSON.stringify(article.content)},
      published: ${article.published},
      tags: ${JSON.stringify(article.tags)},
      title: "${article.title}"
    ) {
      id
    }
  }`;
}

export function deleteQuery(id) {
  return `mutation {
    delete(id: "${id}") {
      author,
      title
    }
  }`;
}

export function findIdQuery(id) {
  return `{
    article(id: "${id}") {
      author,
      content,
      published,
      tags,
      title
    }
  }`;
}

export function updateQuery(id, article) {
  return `mutation {
    update(
      id: "${id}", 
      author: "${article.author}",
      content: ${JSON.stringify(article.content)},
      published: ${article.published},
      tags: ${JSON.stringify(article.tags)},
      title: "${article.title}"
    ) {
      id
    }
  }`;
}
