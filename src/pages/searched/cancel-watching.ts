export const cancelWatching = (timeout: NodeJS.Timeout) => {
  if (timeout) {
    clearTimeout(timeout);
  }
};
