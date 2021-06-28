import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import SelectSpecies from "./pages/SelectSpecies";
import { SearchDataProvider } from "./contexts/SearchData";
import SelectLocation from "./pages/SelectLocation";

function App() {
  return (
    <SearchDataProvider>
      <Router>
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/select-location">
            <SelectLocation />
          </Route>
          <Route path="/select-species">
            <SelectSpecies />
          </Route>
          <Route path="/">
            <div>Landing Page</div>
          </Route>
        </Switch>
      </Router>
    </SearchDataProvider>
  );
}

export default App;
