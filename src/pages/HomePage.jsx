import { useState } from "react";
import SearchBar from "../components/SearchBar";
import useFoodSearch from "../hooks/useFoodSearch";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FoodCard from "../components/FoodCard";

function HomePage() {
  const { results, loading, searchFood } = useFoodSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query) => {
    setHasSearched(true);
    searchFood(query);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Title */}
      <Typography variant="h5" align="center" gutterBottom>
        Search Nutrition Info
      </Typography>

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading */}
      {loading && (
        <Typography align="center" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      )}

      {/* Initial State */}
      {!loading && !hasSearched && (
        <Typography align="center" sx={{ mt: 2 }}>
          Search for food to see nutrition info
        </Typography>
      )}

      {/* No Results */}
      {!loading && hasSearched && results.length === 0 && (
        <Typography align="center" sx={{ mt: 2 }}>
          No results found
        </Typography>
      )}

      {/* Results Grid */}
      {!loading && results.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {results.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.code}>
              <FoodCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HomePage;