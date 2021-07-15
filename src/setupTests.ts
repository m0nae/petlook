import "@testing-library/jest-dom";

declare global {
  var DATA: Data;
}

// this is the shape of the individual pet data that is returned
// from the PetFinder API (minus the other properties that aren't
// used in the site/codebase)
export interface Animal {
  id: number;
  name: string;
  breeds: {
    primary: string;
    secondary: string | null;
    mixed: boolean;
    unknown: boolean;
  };
  age: string;
  photos: string[];
  gender: string;
  url: string;
}
interface Data {
  animals: Animal[];
}

global.DATA = {
  animals: [
    {
      id: 52328202,
      name: "Fido",
      breeds: {
        primary: "American Pitbull Terrier",
        secondary: "Siberian Husky",
        mixed: true,
        unknown: false,
      },
      age: "Senior",
      photos: ["fido-photo-1", "fido-photo-2"],
      gender: "Male",
      url: "https://www.example.com/fido",
    },
    {
      id: 52328203,
      name: "Sunny",
      breeds: {
        primary: "Doberman",
        secondary: null,
        mixed: false,
        unknown: false,
      },
      photos: ["sunny-photo-1", "sunny-photo-2"],
      age: "Young",
      gender: "Female",
      url: "https://www.example.com/sunny",
    },
  ],
};
