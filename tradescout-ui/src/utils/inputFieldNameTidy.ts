export const UpperCaseLabel = (label: string) => {
  const splitString = label.split("_");

  const capitalise = splitString.map((word) => {
    const firstLetter = word.charAt(0);
    const rest = word.slice(1);

    return firstLetter.toUpperCase() + rest;
  });

  return capitalise.join(" ");
};
