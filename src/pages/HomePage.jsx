import { useState } from "react";
import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import useFoodSearch from "../hooks/useFoodSearch";

function HomePage() {
  const { results, loading, searchFood } = useFoodSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query) => {
    setHasSearched(true);
    searchFood(query);
  };

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>

      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loader"></div>}

      {!loading && !hasSearched && (
        <p>Search for food to see nutrition info</p>
      )}

      {!loading && hasSearched && results.length === 0 && (
        <p>No results found</p>
      )}

      <FoodList products={results} />
    </div>
  );
}

export default HomePage;