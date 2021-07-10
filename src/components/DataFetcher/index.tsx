import { useContext, useEffect, useState, useCallback } from "react";
import { SearchDataContext } from "../../contexts/SearchData";
import { fetchData } from "../../utils/fetchData";
import { locationExists } from "../../utils/locationExists";

export function DataFetcher(Component: React.FC<any>) {
  return function Wrapper(...props: any[]) {
    const [loading, setLoading] = useState(false);
    const { location, selectedSpecies, distance, searchDispatch } =
      useContext(SearchDataContext);

    useEffect(() => {
      handleSearch();
    }, []);

    const handleSearch = () => {
      console.log("handle search called");
      if (locationExists(location)) {
        setLoading(true);
        console.log("both location and species exist!");
        fetchData(location, selectedSpecies, distance)
          .then((res: any) => {
            console.log(res);
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
