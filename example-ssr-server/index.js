const express = require("express");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require("path");
const SSR_Renderer = require("../demo-build-ssr/example-bundle.js");

function ServerSideRendering(req,res,next){
    if (path.extname(req.url) === ".html") {
      //load the file from the file system and then continue
        console.log("SSR:",req.url);
        const dom = new JSDOM(res.body.toString());
        //SSR_Renderer(dom.window.document);
        res.body=Buffer.from(dom.serialize());
    }
    next();
}


const app = express();
app.use(ServerSideRendering);

app.listen(8081);
console.log("Listening 8081: http://localhost:8081/index.html");
module.exports = ServerSideRendering;
