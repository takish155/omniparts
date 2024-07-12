export const checkIsProductPage = (url: string) => {
  const reqUrl = url.split("/");
  reqUrl.shift();

  if (reqUrl.length === 3 && reqUrl[1] === "product") {
    return true;
  }

  return false;
};
