/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const includeDir  = "./src";

const htmlRoot    = "html";
const jsRoot      = "js";
const cssRoot     = "css";



const entries = [
  {
    html:   { filename: "index.html" },
    js:     { filename: "sample"      , src: "sample.ts"    },
    css:    { filename: "index_style" , src: "index.scss"   },
  },
  {
    html:   { filename: "sub/sub.html" },
    js:     { filename: "sub/sub"       , src: "sub.ts" },
  },
];



// eslint-disable-next-line no-undef
module.exports = {
    entries,
    includeDir,
    htmlRoot,
    jsRoot,
    cssRoot,
};

