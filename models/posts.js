const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  isPassed: { type: Boolean, default: false },
  text: { 
    type: String, 
    required: true, 
    minlength: 5,   
    maxlength: 1000   
  },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;