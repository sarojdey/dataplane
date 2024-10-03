export const convertToHumanReadable = (isoString) => {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  return date.toLocaleTimeString("en-US", options);
};
