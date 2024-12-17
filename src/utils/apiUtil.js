

export const frametoken = (token) => {
  console.log("frame: " + token)
  return `Bearer ${token}`;
};