export const onSpaceBar = (isPaused: boolean, audioPlay: () => void, audioPause: () => void) => {
  if (isPaused) {
    audioPlay();
  } else {
    audioPause();
  }
};
