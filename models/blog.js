const mongoose = require('./mongo'); //importing connection config
const autoIncrement = require('mongoose-auto-increment');

// mongoose.Schema is a class - creating an obj for it 
var Blog = new mongoose.Schema({
  blogId: Number, 
  author: String,
  title: String,
  blogText: String,
  createdOn : {type: Date, default: Date.now},
  updatedBy : String,
  updatedOn : {type: Date, default: Date.now},
  isDeleted : {type: Boolean, default: 0}
});

Blog.plugin(autoIncrement.plugin, { model: 'Blog', field: 'blogId', startAt: 1 });
// making the above schema as model
module.exports = mongoose.model('Blog', Blog);
