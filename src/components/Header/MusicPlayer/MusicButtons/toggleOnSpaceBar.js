export const onSpaceBar = (isPaused, audioPlay, audioPause) => {
  if (isPaused) {
    audioPlay();
  } else {
    audioPause();
  }
};
