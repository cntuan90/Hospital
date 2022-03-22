export type LoginInputs = {
  mailAddress: string,
  password: string,
};

export type ForgetPasswordInputs = {
  mailAddress: string,
};

export type ResetPasswordInputs = {
  newPassword: string,
  confirmCode: string,
};