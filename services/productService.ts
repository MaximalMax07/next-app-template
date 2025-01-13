export const getProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  const data = await response.json();
  return data.products;
};

export const addProduct = async (product: { name: string; price: number }) => {
  const response = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};