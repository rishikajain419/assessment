const express = require("express");
const router = express.Router();

// connecting to service
const blogService = require("../../services/blogService");

/* POST blogs */
/**
 * @swagger
 * /api/blogs:
 *    post:
 *      tags:
 *        - Posts
 *      description: Create a new blog
 *    responses:
 *      '201':
 *        description: Successfully created Blog
 */

router.post("/", (req, res, next) => {
  // dealing with req body
  console.log(req.body);
  console.log("method:" + req.query._method);

  blogService.createBlog(req, function (err, data) {
    if (!err) {
      // res.json(data);
      res.render("add-blog");
    } else {
      res.json(err);
    }
  });
});

router.post("/:id", (req, res, next) => {
  // dealing with req body
  if (req.query._method == "PUT") {
    req.method = "PUT";
    req.url = req.path;
    next();
  }
});

/* GET blogs listing. */
 /**
 * @swagger
 * /api/blogs:
 *  get:
 *    tags:
 *      - Posts
 *    summary: Lists all the blogs
 *    description: Use to get all blogs
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", (req, res, next) => {
  blogService.getBlogs((err, data) => {
    if (!err) {
      res.render("view-blogs", { blogs: data });
      // res.json(data);
    } else {
      res.json(err);
    }
  });
});

/* GET blogs/1 . */
/**
 * @swagger
 /api/blogs/{id}:
 *  get:
 *   tags:
 *    - Posts
 *   summary: listing a single post
 *   description: to display a blog with a particular id
 *   produces:
 *    - appication/json
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: id of the blog
 *      schema:
 *       $ref: '#/definitions/blogPost'
 *   responses:
 *    '200':
 *     description: A successful response
 *    '500':
 *     description: Failed in getting a blog
 */
router.get("/:id", (req, res, next) => {
  // URL Param is: id
  let req_method = req.query._method;
  if (req.query._method == "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
    next();
  } else if (req.query._method === "UPDATE") {
    req.method = "PUT";
    req.url = req.path;
    next();
  } else {
    blogService.getBlogById(req.params.id, (err, data) => {
      if (!err) {
        if (data && data.isDeleted === false) {
          if (req_method === "EDIT") {
            res.render("update-blog", { detail: data });
          } else {
            res.render("blog-detail.ejs", { detail: data });
          }
        } else {
          res.json({
            Error: "Blog does not exist or the Blog has been deleted",
          });
        }
      } else {
        console.log(err);
        res.json({ status: err });
      }
    });
  }
});

/* PUT blogs/1 */
router.put("/:id", (req, res, next) => {
  console.log(req.params.id); //  working with url param
  console.log(req.body); // req body -- will work with this later

  blogService.updateBlog(req.params.id, req.body, (err, data) => {
    if (!err) {
      if (data) {
        //  res.json(data);
        res.redirect("/api/blogs");
      } else {
        res.json({ error: "error while updating" });
      }
    } else {
      res.json(err);
    }
  });
});

/* DELETE blogs/1 */
router.delete("/:id", (req, res, next) => {
  console.log(req.params.id); // working with url params

  blogService.deleteBlog(req.params.id, (err, data) => {
    if (!err) {
      res.redirect("/api/blogs");
    } else {
      res.json(err);
    }
  });
});

module.exports = router;
