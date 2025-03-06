export default function isValidTime(timeStr: string) {
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
