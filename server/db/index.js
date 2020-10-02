const mongoose = require('mongoose');

const user = process.env.MONGO_ATLAS_USER;
const pass = process.env.MONGO_ATLAS_PASS;
const dbname = process.env.MONGO_ATLAS_DB;

const dbConnectionUrl = `mongodb+srv://${user}:${pass}@fizzydata.iqivl.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose
  .connect(dbConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((e) => {
    console.error('Connection Error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
