// 1. connect to model
const Blog = require('../models/blog');
// service methods

// createBlog
exports.createBlog = (req, callback) => {
  console.log(req.body);
  // 2. construct query
  let blogDao = new Blog(req.body);
  // 3. exec query
  blogDao.save( (err, savedBlog ) =>{ // 4. get the status from db 
    if (!err) {
      console.log(`Blog registered successfully with blogId:${savedBlog.blogId}`);
    }
    //  5. Channelise it to the router
    callback(err, savedBlog);
  });
}

// getBlogs
exports.getBlogs = (callback) => {
  
  // 1. construct and exec query 
  Blog.find({isDeleted: false}, (err, blogsList) => {
    if (!err) {
      console.log(`Blogs Loaded successfully :${blogsList.length}`);
    }
    // 2. get the data from db and send it to the router
    callback(err, blogsList);
  });
}

// getBlogById
exports.getBlogById = (_blogId, callback ) => {

  Blog.findOne( {blogId: _blogId } , ( err, blog ) => {
    if(!err){
      console.log(`Blog with Id ${blog.blogId} Loaded Successfully`);
    }
    callback(err, blog);
  });
}



// updateBlog 
exports.updateBlog = (_blogId, blogData, callback) => {
  console.log(_blogId);
  console.log(blogData);

  // 1. construct query and exec 
  Blog.updateOne( { blogId: _blogId }, blogData, (err, status) => {

    let msg = 'Not Updated! Some Error Occured!'; 
    if(!err){
      console.log(status);
      if(status.n = 1 && status.ok == 1){
        msg = 'Updated Successfully!';
      }
    }
    // 2. get the data and send it back to route
    callback(err, status);
  });
}

// deleteBlog 
exports.deleteBlog = ( _blogId, callback) => {
  
     // 1. construct query and exec 
  Blog.updateOne( {blogId:_blogId},{$set : {isDeleted: true}}, (err, status) => {

    let msg = 'Not Deleted! Some Error Occured!'; 
    if(!err){
      console.log(status);
      if(status.n = 1 && status.ok == 1){
        msg = 'Deleted Successfully!';
      }
    }
    // 2. get the data and send it back to route
    callback(err, status);
  });

}




