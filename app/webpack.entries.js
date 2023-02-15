/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */


const entries = [
  {
    html:   { filename: "index.html" },
    js:     { filename: "index"      , src: "index.ts"    },
    css:    { filename: "index_style" , src: "index.scss"   },
  },/*
  {
    html:   { filename: "sub/sub.html" },
    js:     { filename: "sub/sub"       , src: "sub.ts" },
  },*/
];



// eslint-disable-next-line no-undef
module.exports = {
    entries,
    includeDir: "./src",
    htmlRoot: "html",
    jsRoot: "js",
    cssRoot: "css",
};

