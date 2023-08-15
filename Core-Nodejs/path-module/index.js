const path = require('node:path');

console.log(__dirname);
console.log(__filename);

// basename
console.log(path.basename(__dirname));
console.log(path.basename(__filename));

// extenion
console.log(path.extname(__dirname));
console.log(path.extname(__filename));

// path.join

//path.parse()
// path.format()
// path.isAbsolute()