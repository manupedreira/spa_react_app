import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from "graphql";
import db from "./db";

const articleType = new GraphQLObjectType({
  name: "Article",
  description: "This represents a Article",
  fields: () => ({
    author: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    excerpt: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    },
    published: {
      type: GraphQLBoolean
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    title: {
      type: GraphQLString
    }
  })
});

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is a root query",
  fields: () => ({
    articles: {
      type: new GraphQLList(articleType),
      resolve() {
        return db.Article.find();
      }
    },
    article: {
      type: articleType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return db.Article.findById(args.id);
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    add: {
      type: articleType,
      args: {
        author: {
          type: GraphQLString
        },
        content: {
          type: GraphQLString
        },
        published: {
          type: GraphQLBoolean
        },
        tags: {
          type: new GraphQLList(GraphQLString)
        },
        title: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        const article = {
          author: args.author,
          content: args.content,
          excerpt: args.content.slice(0, 350),
          published: args.published,
          tags: args.tags,
          title: args.title
        };
        return db.Article.create(article);
      }
    },
    delete: {
      type: articleType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return db.Article.findByIdAndRemove(args.id);
      }
    },
    update: {
      type: articleType,
      args: {
        id: { type: GraphQLString },
        author: {
          type: GraphQLString
        },
        content: {
          type: GraphQLString
        },
        published: {
          type: GraphQLBoolean
        },
        tags: {
          type: new GraphQLList(GraphQLString)
        },
        title: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        const article = {
          author: args.author,
          content: args.content,
          excerpt: args.content.slice(0, 350),
          id: args.id,
          published: args.published,
          tags: args.tags,
          title: args.title
        };
        return db.Article.findByIdAndUpdate(args.id, article);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
