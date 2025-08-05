export enum LoginErrors {
  LoginCancelled = "Login cancelled",
}

export default class LoginError extends Error {
  constructor(message: LoginErrors) {
    super(message)
    this.name = "LoginError"
  }
}
