const fs = require("fs");
// https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93

const file = fs.createWriteStream("./helloworld.pdf");

for (let i = 0; i < 1e6; i++) {
  file.write(
    "Convert a string into an integer using hash function , use polynomial rolling hashing "
  );
}
