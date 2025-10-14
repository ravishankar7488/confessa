const express=require("express");
const app=express();
const mongoose=require("mongoose");
const method_override=require("method-override");
const path=require("path");
const ejsMate= require("ejs-mate");
const Post=require("./models/posts.js"); //Post Model
const flash= require("connect-flash")
const ExpressError= require("./utils/ExpressError.js"); //ExpressError
const wrapAsync= require("./utils/wrapAsync.js")
const sessions=require("express-session");
require('dotenv').config();

const cookieParser=require("cookie-parser");
app.use(method_override("_method"));
app.engine("ejs", ejsMate);
app.use(cookieParser("devil"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));

main().then(()=>{console.log("connected to confession");}).catch((err)=>{console.log(err);})
async function main(){
  await mongoose.connect(process.env.MONGO_URI)
}

//connect-flash
app.use(sessions())
app.use(flash())

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  next();
})

app.use("/admin",(req,res,next)=>{
   user=req.signedCookies.user;
   if(user==process.env.USERNAME){
    next();
   }
   else{
    throw new ExpressError(500, "ACCESS DENIED")
   }
})

app.get("/", wrapAsync(async(req,res)=>{
let Posts = await Post.find({}).sort({ createdAt: -1 });
  user=req.signedCookies.user;
  res.render("index.ejs",{Posts,user, query: "notavailable"})
}))

app.get("/create", (req,res)=>{
  res.render("create.ejs")
})
app.post("/create", wrapAsync( async(req,res)=>{
  let {text}=req.body;
  let newPost=new Post({text:text})
  await newPost.save();
  req.flash("success", "Confession Created! Waiting for Admin Approval⌛")
  res.redirect("/");
}))

app.get("/adminlogin", (req,res)=>{
  res.render("login.ejs")
});

app.post("/adminlogin", (req,res)=>{
  let {username, password}=req.body;

  if(username==process.env.USERNAME && password==process.env.PASSWORD){
    res.cookie("user",process.env.USERNAME,{signed:true});
    req.flash("success", "Welcome Lucifer, Happy to see you here!")
    res.redirect("/")
  }
  else{
    req.flash("error", "Invalid Credentials")
    res.redirect("/adminlogin")
  }
});

app.patch("/admin/pass/:id",wrapAsync( async(req,res)=>{
  let {id}=req.params;
  await Post.findByIdAndUpdate(id,{isPassed: true})
  req.flash("success", "Confession Posted")
  res.redirect("/admin/newconfessions")
}))

app.delete("/admin/reject/:id",wrapAsync( async(req,res)=>{
let {id}=req.params;
await Post.findByIdAndDelete(id);
req.flash("success", "Confession Deleted")
res.redirect("/")
}))

app.get("/logout", (req,res)=>{
  res.clearCookie("user");
  req.flash("success", "Logged out successfully, See you soon!")
  res.redirect("/")
})

app.get("/admin/newconfessions",wrapAsync( async(req,res)=>{
  let Posts=await Post.find({isPassed:false})
  user=req.signedCookies.user;
  res.render("newconfessions.ejs", {Posts,user})
}))

app.post("/search", async(req,res)=>{
  let {query}=req.body;
let Posts = await Post.find({
  $or: [
    { text: { $regex: query, $options: 'i' } },
  ]
}).sort({ createdAt: -1 });

user=req.signedCookies.user;
res.render("index.ejs", {Posts, user, query})
})

//error handling middlewares
app.use((req,res,next)=>{
  next(new ExpressError(404, "Page Not Found"))
});

app.use((err, req, res, next)=>{
  let {status=500, message="Something went wrong"}=err;
  user=req.signedCookies.user;
  res.render("error.ejs", {status, message});
});


app.listen(3000, ()=>{
  console.log("Server listening at 3000")
})









