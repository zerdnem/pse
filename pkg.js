const pkg = require("pkg");
pkg.exec(["pse.js", "--target", "host", "--output", "pse.exe"]);
pkg.exec(["multi.js", "--target", "host", "--output", "multi.exe"]);
