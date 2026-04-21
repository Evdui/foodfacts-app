import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, width: "100%", maxWidth: 500 }}>
        <TextField
          fullWidth
          label="Search food..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button variant="contained" type="submit">
          Search
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ width: "100%", maxWidth: 500 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default SearchBar;