function isValidTime(timeStr) {
  const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  const match = timeStr.match(timePattern);
  if (!match) {
    return false;
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  const totalMinutes = hours * 60 + minutes;
  const startTime = 8 * 60;
  const endTime = 20 * 60;

  return totalMinutes >= startTime && totalMinutes <= endTime;
}

export const bookingValidation = (input) => {
  const errors = {};

  if (!input.date) {
    errors.date = "date is required";
  }
  if (!input.time || !isValidTime(input.time)) {
    errors.time = "time is required, and must be between 8am and 8pm";
  }
  return errors;
};

export default bookingValidation;
