const fs = require("fs");
const express = require("express");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require("path");
const SSR_Renderer = require("./build/ssr-bundle.js").module.default;

function getURLFromBody(req, res, next) {
  if (path.extname(req.url) === ".html") {
    try {
      const rawFile = fs.readFileSync(`./demo/public${req.url}`);

      res.body = rawFile;
      res.ssr = true;
    } catch (e) {
      res.ssr = false;
    }
  } else {
    res.ssr = false;
  }
  next();
}

function ServerSideRendering(req, res, next) {
  if (res.ssr) {
    //load the file from the file system and then continue
    console.log(SSR_Renderer);
    //console.log(res.body.toString());
    //console.log("SSR:",req.url);
    const dom = new JSDOM(res.body.toString());
    //Mock dispatch event yo jsdom
    dom.window.document.dispatchEvent = eventName => {
      console.log("EVENT DISPATCHED " + eventName);
    };
    //-----
    SSR_Renderer(dom.window.document);
    res.body = Buffer.from(dom.serialize());
    //console.log(dom.serialize());
    res.end(res.body);
  } else {
    next();
  }
}

const app = express();

app.use(getURLFromBody);
app.use(ServerSideRendering);
app.use(express.static("./demo/public"));

app.listen(8081);
console.log("Listening 8081: http://localhost:8081/index.html");
module.exports = ServerSideRendering;
