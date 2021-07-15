import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Card from ".";
import { Animal } from "../../setupTests";

function renderCard(animal: Animal) {
  return render(
    <Card
      key={animal.id}
      image={animal.photos[0]}
      name={animal.name}
      info={{
        id: animal.id,
        breed: {
          primary: animal.breeds.primary,
          mixed: animal.breeds.mixed,
        },
        age: animal.age,
        gender: animal.gender,
        url: animal.url,
      }}
    />
  );
}

describe("the card component", () => {
  let animal = DATA.animals[0];

  it("should render the name of the pet", () => {
    renderCard(animal);
    expect(screen.getByText(/Fido/i)).toBeInTheDocument();
  });

  describe("the breed of the pet", () => {
    it("should contain the word 'Mix' if the pet is mixed breed", () => {
      renderCard(animal);
      expect(
        screen.getByText(/American PitBull Terrier Mix/i)
      ).toBeInTheDocument();
    });

    it("should NOT contain the word 'Mix' if the pet is NOT mixed breed", () => {
      let animal = DATA.animals[1];
      renderCard(animal);

      expect(screen.getByText(/Doberman/i)).toBeInTheDocument();
      expect(screen.queryByText(/Mix/i)).not.toBeInTheDocument();
    });
  });

  it("should render the age of the pet", () => {
    renderCard(animal);
    expect(screen.getByText(/Senior/i)).toBeInTheDocument();
  });

  it("should render the gender of the pet", () => {
    renderCard(animal);
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
  });

  it("should render an image of the pet", () => {
    renderCard(animal);
    screen.debug();
    let image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });
});
