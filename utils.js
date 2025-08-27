export function encode(str) {
  return Buffer.from(str).toString("base64");
}

export function decode(str) {
  return Buffer.from(str, "base64").toString("utf-8");
}

export function isPrimitive(data) {
  return data !== Object(data);
}
