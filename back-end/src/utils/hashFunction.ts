import crypto from "crypto";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hashFunction = (_id: string) => {
  const hash = crypto.createHash("sha256");
  const code = hash.update(_id).digest("base64");
  return code;
};