import _ from 'lodash';
import Faker from 'faker';
import bluebird from 'bluebird';
import mongoose from 'mongoose';

mongoose.Promise = bluebird;

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect('mongodb://localhost:27017/billin', {
    useMongoClient: true,
  });
};

mongoose.connection.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
  setTimeout(connectWithRetry, 5000);
});

mongoose.connect('mongodb://localhost:27017/billin', {
  useMongoClient: true,
});

mongoose.set('debug', true);

const Article = mongoose.model('Article', {
  author: String,
  content: String,
  excerpt: String,
  published: Boolean,
  tags: [String],
  title: String,
});

Article.remove({}, (err) => {
  if (!err) {
    _.times(10, () => {
      const content = `
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
`;
      return Article.create({
        author: Faker.name.findName(),
        content,
        excerpt: content.slice(0, 350),
        published: Faker.random.boolean(),
        tags: [Faker.random.words(), Faker.random.words()],
        title: Faker.name.title(),
      });
    });
  }
});

export default { Article };
