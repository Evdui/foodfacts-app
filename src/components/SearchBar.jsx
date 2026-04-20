import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    if (query.trim().length < 2) {
      setError("Enter at least 2 characters");
      return;
    }

    setError("");
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-wrap">
        <input
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>

      {error && <p className="validation-error">{error}</p>}
    </form>
  );
}

export default SearchBar;