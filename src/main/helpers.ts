import fs from "fs";
import { Area } from "react-easy-crop/types";

export function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader(); // creates reader
    // what to do when file is done reading
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file); // read the file
  });
}

function createImage(imageSrc: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = imageSrc;
  })
}

export async function cropImageData(imageSrc: string, croppedAreaPixels: Area) {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const maxSize = Math.max(image.width, image.height);
  canvas.width = maxSize;
  canvas.height = maxSize;
  ctx?.drawImage(image, maxSize / 2 - image.width / 2, maxSize / 2 - image.height / 2);
  const data: any = ctx?.getImageData(0, 0, maxSize, maxSize);
  // now we can set canvas to desired size
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  // now drop img data in with correct position
  ctx?.putImageData(data, 
    Math.round(0 - maxSize / 2 + image.width / 2 - croppedAreaPixels.x),
    Math.round(0 - maxSize / 2 + image.height / 2 - croppedAreaPixels.y)
  );
  const url: any = canvas.toDataURL("image/jpg", 0.8);
  const base64data = url.replace(/^data:image\/png;base64,/, "");
  return base64data;
}
