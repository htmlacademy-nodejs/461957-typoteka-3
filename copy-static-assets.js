const shell = require("shelljs");

shell.cp("-R", "src/express/views", "build/express/views/");
shell.cp("-R", "src/express/static", "build/express/static/");
