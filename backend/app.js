const express = require('express');

const app = express();

const bodyParser = require("body-parser")

app.use(bodyParser.json)

app.use((req, res, next) => {
  res.setHeader("Access-control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Header",
    "Origin,  X-Requested-With, Content-Type, Accept ")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH , DELETE , OPTIONS")
  next();

})

app.post("/api/posts" , (req, res , next) => {
const posts = req.body
  console.log(posts)
  res.status(201).json({message: 'Okay'})
});


app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "vmfdpq",
      title: "FIrst ",
      content: "kd"
    }
  ]
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
})


module.exports = app;
