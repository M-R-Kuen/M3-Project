export const userValidation = (input) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.name) {
    errors.name = "name is required";
  }
  if (!input.email || !emailRegex.test(input.email)) {
    errors.email = "email is required";
  }
  if (!input.birthdate) {
    errors.birthdate = "birthdate is required";
  }
  if (!input.nId) {
    errors.nId = "nId is required and must be a number";
  }
  if (!input.username) {
    errors.username = "username is required";
  }
  if (!input.password) {
    errors.password = "password is required";
  }
  return errors;
};

export default userValidation;
