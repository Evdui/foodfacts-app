import { useNavigate } from "react-router-dom";

function FoodCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="food-card"
      onClick={() => navigate(`/product/${product.code}`)}
    >
      <div className="card-image">
        <img
          src={product.image_small_url || "https://via.placeholder.com/150"}
          alt={product.product_name}
        />
      </div>

      <div className="card-content">
        <h3>{product.product_name || "No Name"}</h3>
        <p>{product.brands || "Unknown Brand"}</p>
      </div>
    </div>
  );
}

export default FoodCard;