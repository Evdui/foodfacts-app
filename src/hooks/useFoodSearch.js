import { useState } from "react";
import axios from "axios";

function useFoodSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchFood = async (query) => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const fetchData = async () => {
        return await axios.get(
          "https://world.openfoodfacts.org/cgi/search.pl",
          {
            params: {
              search_terms: query,
              json: 1,
              page_size: 10,
            },
          }
        );
      };

      let products = [];
      let attempts = 0;

      // 🔥 Retry up to 3 times
      while (products.length === 0 && attempts < 3) {
        console.log("API attempt:", attempts + 1);

        const res = await fetchData();
        products = res.data.products || [];

        if (products.length === 0) {
          await new Promise((res) => setTimeout(res, 400));
        }

        attempts++;
      }

      console.log("FINAL PRODUCTS:", products);

      setResults(products);
    } catch (err) {
      console.error("API ERROR:", err);
      setResults([]);
    }

    setLoading(false);
  };

  return { results, loading, searchFood };
}

export default useFoodSearch;