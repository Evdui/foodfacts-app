import { useState, useRef } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const requestIdRef = useRef(0)

  const handleSearch = async (query) => {
    setHasSearched(true)
    setLoading(true)
    setResults([])

    const currentRequestId = ++requestIdRef.current

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`

      const response = await fetch(url)
      const data = await response.json()

      if (currentRequestId !== requestIdRef.current) return

      const products = data.products || []

      // ✅ FIXED FILTER (works for all foods)
      const filtered = products.filter(
        (p) => p.product_name || p.brands
      )

      // ✅ fallback so never empty unnecessarily
      const finalResults =
        filtered.length > 0 ? filtered : products

      setResults(finalResults.slice(0, 10))

    } catch (error) {
      console.error("Error:", error)
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false)
      }
    }
  }

  return (
    <div className="app">
      <h1>🥗 FoodFacts</h1>

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
  )
}

export default App