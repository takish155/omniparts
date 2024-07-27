export class ExtendedPublicMiddleware {
  private url: string;
  private uuidRegex =
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;

  constructor(url: string) {
    this.url = url;
  }

  private checkIsVerificationPage() {
    const reqUrl = this.url.split("/");
    reqUrl.shift();

    if (
      reqUrl.length === 5 &&
      this.uuidRegex.test(reqUrl[4]) &&
      reqUrl[2] === "verify"
    ) {
      return true;
    }

    return false;
  }

  private checkIsProductPage() {
    const reqUrl = this.url.split("/");
    reqUrl.shift();

    if (reqUrl.length === 3 && reqUrl[1] === "product") {
      return true;
    }

    return false;
  }

  private checkisResetPasswordPage() {
    const reqUrl = this.url.split("/");
    reqUrl.shift();

    if (
      reqUrl.length === 5 &&
      this.uuidRegex.test(reqUrl[4]) &&
      reqUrl[2] === "forgot-password"
    ) {
      return true;
    }

    return false;
  }

  public checkIsPublicPage() {
    return (
      this.checkIsProductPage() ||
      this.checkIsVerificationPage() ||
      this.checkisResetPasswordPage()
    );
  }

  static isUrlPublic(url: string) {
    return new ExtendedPublicMiddleware(url).checkIsPublicPage();
  }
}
