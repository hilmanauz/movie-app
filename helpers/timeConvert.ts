export default function time_convert(num: number) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return hours && minutes
    ? hours + "h " + minutes + "m"
    : hours && !minutes
    ? hours + "h"
    : minutes + "m";
}