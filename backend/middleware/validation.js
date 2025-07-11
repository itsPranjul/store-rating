const validateName = (name) => name && name.length >= 20 && name.length <= 60;
const validateAddress = (address) => !address || address.length <= 400;
const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(password);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

module.exports = {
  validateName,
  validateAddress,
  validatePassword,
  validateEmail,
};
