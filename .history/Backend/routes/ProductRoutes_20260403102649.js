const BASE_URL = "http://localhost:3000/api";

// Saare products fetch karo
export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error("Products fetch nahi hue");
  return response.json();
};

// Ek product fetch karo ID se
export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Product nahi mila");
  return response.json();
};