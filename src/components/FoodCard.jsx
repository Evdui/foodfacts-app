import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function FoodCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.code}`, { state: { product } });
  };

  return (
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <CardActionArea onClick={handleClick}>
        {product.image_small_url && (
          <CardMedia
            component="img"
            height="140"
            image={product.image_small_url}
            alt={product.product_name}
            sx={{ objectFit: "contain", p: 1 }}
          />
        )}

        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product.product_name || "No Name"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product.brands || "Unknown Brand"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FoodCard;