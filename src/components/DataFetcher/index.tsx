import { useContext, useEffect, useState, useCallback } from "react";
import { SearchDataContext } from "../../contexts/SearchData";
import { fetchData } from "../../utils/fetchData";
import { locationExists } from "../../utils/locationExists";

export function DataFetcher(Component: React.FC<any>) {
  return function Wrapper(...props: any[]) {
    const [loading, setLoading] = useState(false);
    const {
      location,
      lastSearchedLocation,
      selectedSpecies,
      distance,
      searchDispatch,
    } = useContext(SearchDataContext);

    useEffect(() => {
      handleSearch();
    }, []);

    const handleSearch = () => {
      if (locationExists(location) || lastSearchedLocation) {
        setLoading(true);
        fetchData(
          locationExists(location) ? location : lastSearchedLocation,
          selectedSpecies,
          distance
        )
          .then((res: any) => {
            res = res.data;
            let data: any = {
              ...res,
              animals: res.animals.filter(
                (animal: any) => animal.status === "adoptable"
              ),
            };
            setLoading(false);
            searchDispatch({ type: "setData", payload: data });
            searchDispatch({ type: "setError", payload: false });
          })
          .catch((err) => {
            setLoading(false);
            searchDispatch({ type: "setError", payload: true });
          });
      } else {
        return;
      }
    };

    return (
      <Component {...props} loading={loading} handleSearch={handleSearch} />
    );
  };
}
