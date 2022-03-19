import child_process from "child_process";
let exec = child_process.exec;
function open() {
  exec("node src/main.js", function (err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      console.log("==============");
      console.log(err);
    }
    console.log("服务器重启");
    open();
  });
}

console.log("服务器启动");
open();
