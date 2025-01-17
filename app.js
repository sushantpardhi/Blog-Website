const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

///Conecting to Database
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://sgpardhi:sgpardhi@cluster0.0zofmkp.mongodb.net/blogDB");

const blogSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", blogSchema);

const posts = [];

///Home Page

app.get("/", function(req,res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.post("/", function(req,res){
  
});


///About Page

app.get("/about", function(req,res){
  res.render("about", {
    aContent: aboutContent
  });
});

app.post("/about", function(req,res){

});


///Contact Page

app.get("/contact", function(req,res){
  res.render("contact", {
    cContent: contactContent
  });
});

app.post("/contact", function(req,res){

});


///Compose Page

app.get("/compose", function(req,res){
  res.render("compose");
  
});

app.post("/compose", function(req,res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });

  post.save();

  res.redirect("/");

});


app.get("/posts/:postId", function(req,res){

  const requiredPostId = req.params.postId;

  var requestedTitle = _.lowerCase(req.params.postName);

  Post.findOne({_id: requiredPostId}, function(err, post){

    res.render("post", {
 
      pTitle: post.title,
 
      pContent: post.content
 
    });
 
  });

  posts.forEach(function(post){

    var storedTitle = post.title;
    var storedContent = post.content;

    // var myTruncatedString = storedContent.substring(0,100);

    // console.log(myTruncatedString);

    if(requestedTitle === _.lowerCase(storedTitle)){
      res.render("post", {
        pTitle: storedTitle,
        pContent: storedContent
      });
    }else{
      console.log("Match Not Found");
    }
  });
}); 






app.listen(3000, function () {
  console.log("Server started on port 3000");
});
