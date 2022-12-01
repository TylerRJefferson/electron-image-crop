import fs from "fs";

export function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader(); // creates reader
    // what to do when file is done reading
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file); // read the file
  });
}
