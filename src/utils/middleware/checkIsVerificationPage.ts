export const checkIsVerificationPage = (url: string) => {
  const reqUrl = url.split("/");
  reqUrl.shift();

  const uuidRegex =
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;

  if (reqUrl.length === 5 && uuidRegex.test(reqUrl[4])) {
    return true;
  }

  return false;
};
