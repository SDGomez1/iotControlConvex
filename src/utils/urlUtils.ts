export function formatUrl(title: string, id: string) {
  const camelCaseTitle = title
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join("");

  return `${camelCaseTitle}_${id}`;
}

export function deFormatUrl(url: string) {
  return url.split("_")[1];
}
