require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const Men = require("./model/MenModel");
const Women = require("./model/WomenModel");
const Kid = require("./model/KidModel");
const FA = require("./model/FAModel");
const User = require("./model/UserModel");
const Blog = require("./model/BlogModel");
const Enquiry = require("./model/EnquiryModel")
const Usersignup = require("./model/UsersignupModel");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
app.use(cors());
app.use(express.json());


/*SignUp*/
app.post("/signup", async (req, res) => {
  const { email, password, confirmpassword } = req.body;
  let exist = await User.findOne({ email: email });
  //Already exists
  if (exist) {
    return res.status(400).json({ Message: "Email Already Exist" });
  }
  //Password confirmation
  if (password !== confirmpassword) {
    return res
      .status(400)
      .json({ Message: "Password and Confirm Password doesn't Match" });
  }
  const signup = new User(req.body);
  const result = await signup.save();
  res.json({ Message: "Signup Successfull", result: result });
});


/*Login*/

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email: email });
  if (!exists) {
    return res.status(400).json({ Message: "Email doesn't Exist" });
  }
  //Password Match

  if (exists.password !== password) {
    return res.status(400).json({ Message: "Password doesn't Exist" });
  }
  /* res.json({ Message :"Login Successfull"}) */

  //PayLoad

  const payload = {
    user: {
      id: exists._id,
    },
  };
  //JWT Creation
  const token = jwt.sign(payload, "jsonSecret", { expiresIn: "1h" });
  res.json({ Message: "Login Successfull", token: token });
});

/*Protected Routes*/
app.get("/dashboard" , auth , async (req,res) => {
  const exists = await User.findOne({_id: req.user.id})
  if (!exists) {
    return res.status(400).json({ Message: "You are Not Authorized" })
  }
  else{
    res.json(exists)
  }
  
})

/*UserSignUp*/

app.post("/usersignup", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Check if the email already exists
    const exist = await Usersignup.findOne({ email });
    if (exist) {
      return res.status(400).json({ Message: "Email Already Exists" });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ Message: "Password and Confirm Password do not match" });
    }

    // Create new user
    const newUser = new Usersignup({
      username,
      email,
      password,
      confirmPassword, 
    });

    const result = await newUser.save();
    res.status(201).json({ Message: "Signup Successful", result });
  } catch (err) {
    res.status(500).json({ Message: "Server Error", error: err.message });
  }
});

app.get("/usersignup", async (req, res) => {
  const usersignup = await Usersignup.find();
 
    res.send(usersignup);
 
});

app.get("/usersignup/:_id", async (req, res) => {
  const _id = req.params._id;
  const usersignup = await Usersignup.findOne({ _id: _id });
  res.send(usersignup);
});

app.put("/usersignup/:_id", async (req, res) => {
  const _id = req.params._id;
  const usersignup = await Usersignup.updateOne(
    { _id: _id },
    { $set: req.body }
  );
  res.send(usersignup);
});

app.delete("/usersignup/:_id", async (req, res) => {
  const _id = req.params._id;
  const usersignup = await Usersignup.deleteOne({ _id: _id });
  res.send(usersignup);
});

app.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;
  const exists = await Usersignup.findOne({ email: email });
  if (!exists) {
    return res.status(400).json({ Message: "Email doesn't Exist" });
  }
  //Password Match

  if (exists.password !== password) {
    return res.status(400).json({ Message: "Password doesn't Exist" });
  }
    /* res.json({ Message :"Login Successfull"}) */

  //PayLoad

  const payload = {
    user: {
      id: exists._id,
    },
  };
  //JWT Creation
  const token = jwt.sign(payload, "jsonSecret", { expiresIn: "1h" });
  res.json({ Message: "Login Successfull", token: token });
});

/*Protected Routes*/
app.get("/" , auth , async (req,res) => {
  const exists = await Usersignup.findOne({_id: req.user.id})
  if (!exists) {
    return res.status(400).json({ Message: "You are Not Authorized" })
  }
  else{
    res.json(exists)
  }
  
})



/*Mens*/
app.post("/mens", async (req, res) => {
  const men = new Men(req.body);
  const result = await men.save();
  res.send(result);
});

app.get("/mens", async (req, res) => {
  const mens = await Men.find();
  if (mens.length > 0) {
    res.send(mens);
  } else {
    res.send("No Men Data Found");
  }
});

app.get("/mens/:_id", async (req, res) => {
  const _id = req.params._id;
  const men = await Men.findOne({ _id: _id });
  res.send(men);
});

app.put("/mens/:_id", async (req, res) => {
  const _id = req.params._id;
  const men = await Men.updateOne({ _id: _id }, { $set: req.body });
  res.send(men);
});

app.delete("/mens/:_id", async (req, res) => {
  const _id = req.params._id;
  const men = await Men.deleteOne({ _id: _id });
  res.send(men);
});

/*Womens*/


app.post("/womens", async (req, res) => {
  const women = new Women(req.body);
  const result = await women.save();
  res.send(result);
});

app.get("/womens", async (req, res) => {
  const womens = await Women.find();
  if (womens.length > 0) {
    res.send(womens);
  } else {
    res.send("No Women's Data Found");
  }
});

app.get("/womens/:_id", async (req, res) => {
  const _id = req.params._id;
  const women = await Women.findOne({ _id: _id });
  res.send(women);
});

app.put("/womens/:_id", async (req, res) => {
  const _id = req.params._id;
  const women = await Women.updateOne({ _id: _id }, { $set: req.body });
  res.send(women);
});

app.delete("/womens/:_id", async (req, res) => {
  const _id = req.params._id;
  const women = await Women.deleteOne({ _id: _id });
  res.send(women);
});

/*Kids*/


app.post("/kids", async (req, res) => {
  const kid = new   Kid(req.body);
  const result = await kid.save();
  res.send(result);
});

app.get("/kids", async (req, res) => {
  const kids = await Kid.find();
  if (kids.length > 0) {
    res.send(kids);
  } else {
    res.send("No Kid's Data Found");
  }
});

app.get("/kids/:_id", async (req, res) => {
  const _id = req.params._id;
  const kid = await Kid.findOne({ _id: _id });
  res.send(kid);
});

app.put("/kids/:_id", async (req, res) => {
  const _id = req.params._id;
  const kid = await Kid.updateOne({ _id: _id }, { $set: req.body });
  res.send(kid);
});

app.delete("/kids/:_id", async (req, res) => {
  const _id = req.params._id;
  const kid = await Kid.deleteOne({ _id: _id });
  res.send(kid);
});

/*FA*/


app.post("/footwear_and_accessories", async (req, res) => {
  const fa = new   FA(req.body);
  const result = await fa.save();
  res.send(result);
});

app.get("/footwear_and_accessories", async (req, res) => {
  const fa = await FA.find();
  if (fa.length > 0) {
    res.send(fa);
  } else {
    res.send("No footwear_and_accessories Data Found");
  }
});

app.get("/footwear_and_accessories/:_id", async (req, res) => {
  const _id = req.params._id;
  const fa = await FA.findOne({ _id: _id });
  res.send(fa);
});

app.put("/footwear_and_accessories/:_id", async (req, res) => {
  const _id = req.params._id;
  const fa = await FA.updateOne({ _id: _id }, { $set: req.body });
  res.send(fa);
});

app.delete("/footwear_and_accessories/:_id", async (req, res) => {
  const _id = req.params._id;
  const fa = await FA.deleteOne({ _id: _id });
  res.send(fa);
});



/*Blogs*/

app.post("/blogs", async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.send(result);
});

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  if (blogs.length > 0) {
    res.send(blogs);
  } else {
    res.send("No Blogs data Found");
  }
});

app.get("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.findOne({ _id: _id });
  res.send(blog);
});

app.put("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.updateOne({ _id: _id }, { $set: req.body });
  res.send(blog);
});

app.delete("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.deleteOne({ _id: _id });
  res.send(blog);
});


/*Enquiries*/
app.post("/enquiries", async (req, res) => {
  const enquiry = new Enquiry(req.body);
  const result = await enquiry.save();
  res.send(result);
});

app.get("/enquiries", async (req, res) => {
  const enquiries = await Enquiry.find();
  if (enquiries.length > 0) {
    res.send(enquiries);
  } else {
    res.send("No Enquiries Found");
  }
});

app.get("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.findOne({ _id: _id });
  res.send(enquiry);
});

app.put("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.updateOne({ _id: _id }, { $set: req.body });
  res.send(enquiry);
});

app.delete("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.deleteOne({ _id: _id });
  res.send(enquiry);
});

app.listen(4000, () => console.log("API STARTED"));