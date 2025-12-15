const fs = require("fs");
const path = require("path");

function listFiles(dir, level = 0) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const indent = " ".repeat(level * 2);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${file}/`);
      listFiles(fullPath, level + 1);
    } else {
      console.log(`${indent}📄 ${file}`);
    }
  });
}

console.log("📂 Folder Structure:\n");
listFiles(__dirname);
