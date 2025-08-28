export function encode(str) {
  return Buffer.from(str).toString("base64");
}

export function decode(str) {
  return Buffer.from(str, "base64").toString("utf-8");
}

export function isPrimitive(data) {
  return data !== Object(data);
}

export function formatData(data) {
  const order = Object.keys(data[0]);
  return data.map((element) => {
    const converted = this.convertTimestampToDate(element);
    return order.map((key) => converted[key]);
  });
}
