import FoodCard from "./FoodCard";

function FoodList({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="food-list">
      {products.map((item, index) => (
        <FoodCard key={item.code || index} product={item} />
      ))}
    </div>
  );
}

export default FoodList;