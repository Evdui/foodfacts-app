import { useNavigate } from "react-router-dom";

function SavedPage({ saved = [], dispatch }) {
  const navigate = useNavigate();

  if (saved.length === 0) {
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

      {saved.map(item => (
        <div key={item.code} className="food-card">
          <h3>{item.product_name}</h3>
          <p>{item.brands}</p>

          <button onClick={() => navigate(`/product/${item.code}`)}>
            View Details
          </button>

          <button
            onClick={() =>
              dispatch({ type: "REMOVE", code: item.code })
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default SavedPage;