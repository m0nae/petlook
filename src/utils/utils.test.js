import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

jest.mock("axios", () => jest.fn());

describe("the capitalizeFirstLetter function", () => {
  it("should capitalize the first letter of a single word", () => {
    let str = capitalizeFirstLetter("hello");

    expect(str).toBe("Hello");
  });

  it("should capitalize the first letter of multiple words", () => {
    let str = capitalizeFirstLetter("hello world");

    expect(str).toBe("Hello World");
  });

  it("should capitalize the first letter of every word even if a word is already capitalized", () => {
    let str = capitalizeFirstLetter("Hello world");

    expect(str).toBe("Hello World");
  });

  it("should return words with capitalized first letter even if their first letters are already capitalized", () => {
    let str = capitalizeFirstLetter("Hello World");

    expect(str).toBe("Hello World");
  });

  it("should return words that are in all caps with their first letter still capitalized", () => {
    let str = capitalizeFirstLetter("HELLO WORLD");

    expect(str).toBe("HELLO WORLD");
  });

  it("should return words that are in all caps EXCEPT for their first letter, still in all caps with their first letter capitalized", () => {
    let str = capitalizeFirstLetter("hELLO wORLD");

    expect(str).toBe("HELLO WORLD");
  });
});
