import { message } from "antd";
import FileSaver from "file-saver";
/**
 * 解析文件流
 * @returns
 */
export function fileStream(response) {
  // 下载类型
  const DOWNLOAD_TYPE = ["application/octet-stream", "application/x-msdownload", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
  // 文件流下载
  const content_type = response.headers["content-type"].split(";");
  const isDownLoad = DOWNLOAD_TYPE.includes(content_type[0]);
  if (isDownLoad) {
    if (response.status !== 200) {
      message.error("下载失败");
      return {
        status: true,
        data: Promise.reject(),
      };
    }
    const fileName = getFileName(response.headers["content-disposition"]);
    const data = response.data;
    // 开始下载
    downloadFileStream(fileName, data);
    message.success("下载成功");
    return {
      status: true,
      data: Promise.resolve({ fileName, data }),
    };
  }
}

/**
 * 获取文件名
 */
export function getFileName(disposition) {
  if (!disposition) return "";
  let fileName = "";
  disposition
    .replace(/\s/g, "")
    .replace(/"/g, "")
    .split(";")
    .map((item) => item.split("="))
    .forEach((item) => {
      if (item.length === 2 && item[0] === "filename") {
        fileName = item[1];
      } else if (item.length === 2 && item[0] === "fileName") {
        fileName = item[1];
      }
    });
  fileName = decodeURIComponent(fileName);
  return fileName;
}

/**
 * 下载文件流
 */
export function downloadFileStream(fileName, fileStream) {
  const blob = new Blob([fileStream], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  FileSaver.saveAs(blob, fileName);
}
