const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require("path");
const SSR_Renderer = require("../src/example-bundle.js").library.default;

function ServerSideRendering(req,res,next){
    if (path.extname(req.url) === ".html") {
        console.log("SSR:",req.url);
        const dom = new JSDOM(res.body.toString());
        SSR_Renderer(dom.window.document);
        res.body=Buffer.from(dom.serialize());
    }
    next();
}

module.exports = ServerSideRendering;
