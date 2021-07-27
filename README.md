<h1 align="center"><img src="https://user-images.githubusercontent.com/74229895/125763642-7cf0199b-cbe9-44df-b61f-81da229ce299.png" />
</h1>


<h1 align="center">:dog: PetLook :cat:</h1>

<!-- [:sparkles: Live demo :sparkles:](https://petlook.monae.me) -->
<div align="center"><a href="https://petlook.monae.me">:sparkles: Live demo :sparkles:</a></div>
<br />

<div align="center">PetLook is a website built with React that allows users to search for and retrieve pet data using the PetFinder API.</div>

# :camera: Screenshots

<details>
  <summary>Home page</summary>
  <img src="https://user-images.githubusercontent.com/74229895/127043746-30910aaf-9390-4f40-a49c-9b5dcd3aef87.png" />
</details>

<details>
  <summary>Choose species page</summary>
  <img src="https://user-images.githubusercontent.com/74229895/127210988-0d067320-2ed4-4689-97e5-7f8e15435919.png" />
  <img src="https://user-images.githubusercontent.com/74229895/127211057-03bb77d9-1f8d-4a4f-9cce-875bd9559166.png" />
</details>

<details>
  <summary>Choose location page</summary>
  <img src="https://user-images.githubusercontent.com/74229895/127043909-f7bc039d-110d-4f80-bd55-2af461c8562e.png" />
  <img src="https://user-images.githubusercontent.com/74229895/127043935-d3a6bfb0-7d4e-48ad-8adf-f4495bc098c3.png" />
</details>

<details>
  <summary>Search page</summary>
  <img src="https://user-images.githubusercontent.com/74229895/127043968-0882da7f-84fd-4b7d-a211-89bbc3980a6c.png" />
  <img src="https://user-images.githubusercontent.com/74229895/127044036-83e3b7fa-bbca-4be2-9667-26fe679037b1.png" />
  <img src="https://user-images.githubusercontent.com/74229895/127044070-bf415be6-0d3a-4eee-9cfa-9639fbd9d026.png" />
</details>

<details>
  <summary>404 Not Found page</summary>
  <img src="https://user-images.githubusercontent.com/74229895/127044258-ffc3381b-b3c5-4de8-9325-6971bb2fc55a.png" />
</details>

# :computer: Tech Used
* React
* React Router
* Context API
    <details><summary>Why Context?</summary>The Context API seemed very fitting. This project isn't complex enough, in my opinion, to need *global* state management.

    Since searching makes up a solid 90% of the entire functionality of the website, I took the states having to do with the search functionality and threw it into a Context.

    Also, because I have quite a few pieces of state relating to searching, I decided to use the `useReducer` hook instead of multiple `useState` hooks. At first <i>I did</i> use multiple `useState`s, but things quickly got messy as the app grew. 
  </details>
* Geolocation API
* PetFinder API
* Axios
* React Testing Library/Jest



# :brain: Future Features
- [ ] Tweak the GeoLocation functionality
- [ ] Add functionality to the search filters, where users can narrow their list of returned pets by criteria such as whether or not they're housebroken, if they get along with other pets/kids, etc
- [ ] Add end-to-end tests with Cypress

# :house: Local Setup
Clone the repo, install all dependencies, and start the server:
```bash
clone http:this
cd client
npm install
npm start

# The project will load on localhost:3000
```
