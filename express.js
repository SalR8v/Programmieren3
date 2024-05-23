const express = require("express");
const app = express();

app.get("/", function(req, res){
   res.send("Hello world");
});

app.get("/google/:search", function(req, res){
    const search = req.params.search;
    res.redirect('https://google.com/search?q=' + search);
});

app.get("/name/:name", function(req, res){
    const name = req.params.name;
    res.send("<h1>Hello " + name + "</h1>");
});

app.get("/*", function(req, res){
    res.status(404).send("404 Not Found");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
