/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from "fs";

export function saveImage(newFileName: string, base64data: any) {
  fs.writeFile(newFileName, base64data, "base64", (err) => {
    if(err) {
      console.error(err);
    } else {
      console.log("---- Success ----");
    }
  });
}
export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
