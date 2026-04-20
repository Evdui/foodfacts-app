import { useState, useRef } from "react";
import axios from "axios";

function useFoodSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  const searchFood = async (query) => {
    if (!query.trim()) return;

    setLoading(true);

    const currentRequestId = ++requestIdRef.current;

    try {
      let response = await axios.get("/api/cgi/search.pl", {
        params: {
          search_terms: query,
          json: 1,
          page_size: 10,
        },
      });

      if (currentRequestId !== requestIdRef.current) return;

      let products = response.data.products || [];

      // 🔥 retry once if empty (API sometimes fails first time)
      if (products.length === 0) {
        const retry = await axios.get("/api/cgi/search.pl", {
          params: {
            search_terms: query,
            json: 1,
            page_size: 10,
          },
        });

        products = retry.data.products || [];
      }

      // ✅ simple + safe filter
      const filtered = products.filter(
        (p) => p.product_name || p.brands
      );

      const finalResults =
        filtered.length > 0 ? filtered : products;

      setResults(finalResults.slice(0, 10));

    } catch (err) {
      console.error(err);

      // fallback instead of error UI
      setTimeout(() => {
        setResults([]);
        setLoading(false);
      }, 1000);

      return;
    }

    setLoading(false);
  };

  return { results, loading, searchFood };
}

export default useFoodSearch;