import { REGEX } from './index';

export const formatNumber = (number) => {
  return number.toLocaleString('en-US');
};

export const validEmail = (email) => {
  const emailPattern = REGEX.emailPattern;
  return email.match(emailPattern);
};
export const validConfirmEmail = (email, confirmEmail) => {
  return email === confirmEmail ? true : false;
};

export const validPassword = (password) => {
  const passwordPattern = REGEX.passwordPattern;
  return password.match(passwordPattern);
};
