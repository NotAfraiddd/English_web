export const NOTIFY = {
  blog: 1,
  comment: 2,
  course: 3,
};

export const ACTIVE_TAB = {
  write: 1,
  preview: 2,
};

export const SCREEN = {
  dashboard: 0,
  blog: 1,
  comment: 2,
};

export const NOTIFY_MESSAGE = {
  CREATE_SUCCESS: 'Create success',
  UPDATE_SUCCESS: 'Upate success',
  DELETE_SUCCESS: 'Delete success',
  CREATE_FAILED: 'Create failed',
  UPDATE_FAILED: 'Upate failed',
  DELETE_FAILED: 'Delete failed',
  ADD_ANSWER: 'Maximum 4 questions',
  ADD_WORD: 'Maximum 5 questions',
  ADD_QUESTION: 'Maximum 6 questions',
  ADD_QUESTION_9: 'Must 9 questions',
  CREATE_BLOG_SUCCESS: ' Create blog success',
  CREATE_BLOG_FAILED: ' Create blog failed',
  APPROVE_SUCCESS: 'Approve success',
  APPROVE_FAILED: 'Approve failed',
  REJECT_SUCCESS: 'Reject success',
  REJECT_FAILED: 'Reject failed',
};

export const ERROR_MESSAGE = {
  EMAIL_EMPTY: 'Your email is empty',
  EMAIL_SYNTAX: 'Your email is not correct syntax',
  PASSWORD_EMPTY: 'Your password is empty',
  PASSWORD_SYNTAX:
    'Password contains at least 1 uppercase, at least 1 number and at least 8 characters',
  CONFIRM_PASSWORD_EMPTY: 'Your confirm password is empty',
  CONFIRM_PASSWORD_SYNTAX: 'Your confirm password is not same password',
  OTP_EMPTY: 'Your OTP is empty',
  OTP_SYNTAX: 'Your OTP is not same OTP sended',
};

export const UI = {
  UI_LISTENING: 1,
  UI_READING: 2,
};

export const REGEX = {
  emailPattern: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
  passwordPattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
};

export const URL = `localhost:9090`;

export const SOCKET = {
  COMMENT: 1,
  REPLY_COMMENT: 2,
  REPORT: 3,
  NOTIFY_BLOG: 4,
  REACT: 5,
  REACT_COMMENT: 6,
  REACT_COMMENT_REPLY: 7,
  NOTIFY_COMMENT_REPORTED_FROM_ADMIN: 8,
  NOTIFY_BLOG_PENDING: 9,
  NOTIFY_COURSE_PENDING: 10,
  REJECTED_COMMENT_REPORTED_FROM_ADMIN: 11,
  REJECTED_BLOG_PENDING: 12,
  REJECTED_COURSE_PENDING: 13,
};

export const LEVEL = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
};

export const TYPE_COURSE = {
  LISTENING: 1,
  READING: 2,
};
