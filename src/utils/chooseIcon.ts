import icon from "../components/Icons";

export default function chooseIcon(species: string) {
  switch (species) {
    case "dog":
      return icon.dog;
    case "cat":
      return icon.cat;
    case "barnyard":
      return icon.pig;
    case "bird":
      return icon.bird;
    case "rabbit":
      return icon.rabbit;
    case "scales, fins, & other":
      return icon.fish;
    case "horse":
      return icon.horse;
    case "small & furry":
      return icon.hamster;
    default:
      return icon.dog;
  }
}
