import { resolve } from "path";

import imageToBase64 from "image-to-base64";

const pathFile = resolve("src/static/avatar.png");

export const saveImage = async (): Promise<string | undefined> => {
  try {
    const image = await imageToBase64(pathFile);
    return image;
  } catch (err) {
    return;
  }
};

