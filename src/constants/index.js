export const NOTIFY = {
  blog: 1,
  comment: 2,
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
};

export const UI = {
  UI_LISTENING: 1,
  UI_READING: 2,
};

export const REGEX = {
  emailPattern: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
  passwordPattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?!^[ぁ-んァ-ン]+$).{8,}$/,
};
