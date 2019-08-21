require('ts-node').register();

const path = require('path');
const { Seeder } = require('mongo-seeding');

const config = {
  database: 'mongodb://localhost/dashb',
  dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.resolve('./data-seed/import-data'),
  {
    extensions: ['js', 'json', 'ts'],
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  },
);

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch(err => {
    console.log('Error', err);
  });