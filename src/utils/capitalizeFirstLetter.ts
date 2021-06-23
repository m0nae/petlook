export function capitalizeFirstLetter(str: string) {
  if (typeof str !== "string") {
    return;
  } else {
    let letters = str.split("");
    let firstLetter = letters[0];
    firstLetter = firstLetter.toUpperCase();

    return firstLetter.concat(letters.splice(1).join(""));
  }
}
