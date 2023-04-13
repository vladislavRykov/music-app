const convertToTime: Function = (sec: number): { minutes: string; seconds: string } => {
  const minutes = String(Math.floor(sec / 60));
  const secondsB = Math.floor(sec % 60);
  const seconds = secondsB < 10 ? `0${secondsB}` : `${secondsB}`;
  return { minutes, seconds };
};
export default convertToTime;
