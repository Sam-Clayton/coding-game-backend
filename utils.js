export function convertTimestampToDate({ created_at, ...otherProperties }) {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
}

export function formatData(data) {
  const order = Object.keys(data[0]);
  return data.map((element) => {
    const converted = convertTimestampToDate(element);
    return order.map((key) => converted[key]);
  });
}

export function encode(str) {
  return Buffer.from(str).toString("base64");
}

export function decode(str) {
  return Buffer.from(str, "base64").toString("utf-8");
}
