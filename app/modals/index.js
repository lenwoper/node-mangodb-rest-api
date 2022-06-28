const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise= global.Promise;
const db ={};
db.mongoose=mongoose;
db.url = db.dbConfig;
db.students = require('./student.model.js')(mongoose);
module.exports =db;
