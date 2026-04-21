import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DetailPage({ saved = [], dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSaved = saved.some(p => p.code === barcode);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );

        if (!cancelled) {
          setProduct(res.data.product);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [barcode]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{product.product_name}</h2>
      <p>{product.brands}</p>

      <button
        onClick={() =>
          isSaved
            ? dispatch({ type: "REMOVE", code: barcode })
            : dispatch({ type: "ADD", product })
        }
      >
        {isSaved ? "Remove from Saved" : "Save to My List"}
      </button>

      <h3>Nutrition (per 100g)</h3>
      <ul>
        <li>Energy: {product.nutriments?.energy} kcal</li>
        <li>Fat: {product.nutriments?.fat} g</li>
        <li>Carbs: {product.nutriments?.carbohydrates} g</li>
        <li>Protein: {product.nutriments?.proteins} g</li>
      </ul>
    </div>
  );
}

export default DetailPage;