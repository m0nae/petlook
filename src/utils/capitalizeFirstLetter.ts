export function capitalizeFirstLetter(str: string) {
  if (typeof str !== "string") {
    return;
  } else {
    let words = str.split(" ");
    let newWords = words.map((word) => {
      let letters = word.split("");
      let firstLetter = letters[0];
      firstLetter = firstLetter.toUpperCase();

      return firstLetter.concat(letters.splice(1).join(""));
    });
    return newWords.join(" ");
  }
}
