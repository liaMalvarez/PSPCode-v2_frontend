import validate from 'validate.js';

export const login = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true
  }
};
export const passwordForgot = {
  email: {
    presence: true,
    email: true
  },
};

export const passwordReset = {
  password: {
    presence: true,
    length: {
      minimum: 8,
    },
  },
  passwordConfirmation: {
    presence: true,
    equality: 'password'
  }
};
export const signUp = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
    },
  },
  passwordConfirmation: {
    presence: true,
    equality: 'password'
  }
};

export const validations = constraints =>
  data => validate(data, constraints) || {};
