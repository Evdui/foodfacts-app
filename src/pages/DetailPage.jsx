import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../store/savedSlice";

// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

function DetailPage() {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.saved.items);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSaved =
    savedItems?.some((p) => p.code === barcode) || false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  // Loading state
  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  // Not found
  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Product not found</Typography>
        <Button onClick={() => navigate("/")}>Back</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Back Button */}
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Paper sx={{ p: 3 }}>
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Image */}
          {product.image_url && (
            <Box
              component="img"
              src={product.image_url}
              alt={product.product_name}
              sx={{
                width: 150,
                height: 150,
                objectFit: "contain",
              }}
            />
          )}

          {/* Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {product.product_name || "Unknown Product"}
            </Typography>

            <Typography color="text.secondary" gutterBottom>
              {product.brands || "Unknown Brand"}
            </Typography>

            {/* Save Button */}
            <Button
              variant={isSaved ? "outlined" : "contained"}
              color={isSaved ? "error" : "primary"}
              onClick={() =>
                isSaved
                  ? dispatch(removeItem(barcode))
                  : dispatch(addItem(product))
              }
              sx={{ mt: 1 }}
            >
              {isSaved ? "Remove from Saved" : "Save to My List"}
            </Button>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Nutrition */}
        <Typography variant="h6" gutterBottom>
          Nutrition (per 100g)
        </Typography>

        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography>
            Energy: {product.nutriments?.energy || "-"} kcal
          </Typography>
          <Typography>
            Fat: {product.nutriments?.fat || "-"} g
          </Typography>
          <Typography>
            Carbs: {product.nutriments?.carbohydrates || "-"} g
          </Typography>
          <Typography>
            Protein: {product.nutriments?.proteins || "-"} g
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default DetailPage;