function FoodCard({ product }) {
  const {
    product_name,
    brands,
    nutriments,
    image_small_url
  } = product

  const name = product_name || "Unknown Product"
  const brand = brands || "No Brand"

  const calories = nutriments?.['energy-kcal_100g']
  const protein = nutriments?.proteins_100g
  const carbs = nutriments?.carbohydrates_100g
  const fat = nutriments?.fat_100g

  return (
    <div className="food-card">
      <img
        src={image_small_url || "https://via.placeholder.com/150"}
        alt={name}
      />

      <h2>{name}</h2>
      <p className="brand">{brand}</p>

      <div className="nutrition">
        {calories && <p>🔥 {calories} kcal</p>}
        {protein && <p>💪 {protein}g protein</p>}
        {carbs && <p>🍞 {carbs}g carbs</p>}
        {fat && <p>🥑 {fat}g fat</p>}
      </div>
    </div>
  )
}

export default FoodCard