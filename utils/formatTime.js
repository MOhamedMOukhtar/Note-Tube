export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const parts = [];

  if (hours > 0) {
    parts.push(hours);
  }

  parts.push(hours > 0 ? String(minutes).padStart(2, "0") : minutes);

  parts.push(String(seconds).padStart(2, "0"));

  return parts.join(":");
};
