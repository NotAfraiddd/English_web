import { REGEX } from './index';

export const formatNumber = (number) => {
  return number.toLocaleString('en-US');
};

export const formatSpacerIntoHyphen = (string) => {
  return string.replace(/\s+/g, '-');
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

export const validConfirmPassword = (password, confirmPassword) => {
  return password == confirmPassword;
};
export const validNumber = (e, isFraction = true) => {
  const charStr = e.key;
  if (charStr.match(/^[a-zA-ZâÂăAƯưƠơÔôđĐ~!@#$%^&*(_=+[{}\]\\;':",/<>?)]$/)) {
    e.preventDefault();
  }
  if (!isFraction && charStr === '.') {
    e.preventDefault();
  }
};
