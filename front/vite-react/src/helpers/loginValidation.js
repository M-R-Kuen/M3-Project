export const loginValidation = (input) => {
  const errors = {};

  if (!input.username) {
    errors.username = "username is required";
  }
  if (!input.password) {
    errors.password = "password is required";
  }
  return errors;
};

export default loginValidation;
