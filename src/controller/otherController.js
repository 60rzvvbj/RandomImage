import multer from "multer";
import fileService from "../service/fileService.js";
import resultUtil from "../utils/resultUtil.js";
import checkUtil from "../utils/checkUtil.js";
import randomUtil from "../utils/randomUtil.js";
import fs from "fs";
import path from "path";

let upload = multer({ dest: "upload_tmp/" });

const files = fs.readdirSync(path.resolve("runTime/resource"));

function run(app) {
  // 上传图片
  app.post("/other/uploadImg", upload.any(), async function (req, res) {
    let file = req.files[0];

    // 开始上传
    let url = await fileService.uploadImage(file);
    files.push(url.split("=")[1]);

    // 返回结果
    if (url) {
      res.send(resultUtil.success("上传成功", { url }));
    } else {
      res.send(resultUtil.reject("上传失败"));
    }
  });

  app.get("/other/getImage", async function (req, res) {
    // 获取参数
    let fileName = req.query.fileName;

    // 开始获取文件
    fileService.getFile("/resource/" + fileName, res);
  });

  app.get("/other/getRandomImage", async function (req, res) {
    let fileName = files[randomUtil.getIntRandom(0, files.length - 1)];

    // 开始获取文件
    fileService.getFile("/resource/" + fileName, res);
  });
}

export default {
  run,
};
