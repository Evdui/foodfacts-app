import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/savedSlice";

function SavedPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.saved.items);

  if (savedItems.length === 0) {
    return (
      <div className="page">
        <h2>Saved Items</h2>
        <p>No items saved yet.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Saved Items</h2>

      {savedItems.map((item) => (
        <div key={item.code}>
          <h3>{item.product_name}</h3>
          <p>{item.brands}</p>

          <button onClick={() => navigate(`/product/${item.code}`)}>
            View Details
          </button>

          <button onClick={() => dispatch(removeItem(item.code))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default SavedPage;