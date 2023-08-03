export function getNormalTime(hours: number, minutes: number) {
  const h = hours >= 10 ? hours : `0${hours}`;
  const m = minutes >= 10 ? minutes : `0${minutes}`;
  return `${h}:${m}`;
}