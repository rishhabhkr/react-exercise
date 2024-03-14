import { ReactElement, useEffect, useState } from "react";
import { Product } from "../types";
import "./ProductCard.css";
import { ProductModal } from "../Modal";
export const ProductCard = (): ReactElement => {
  const [products, setProducts] = useState<Product[]>();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
    fetchProducts();
  }, []);

  console.log(products);
  const handleClick = (clickedProduct: Product) => {
    setSelectedProduct(clickedProduct);
    setIsModalOpen(true)
  };

  const handleCloseModal =()=>{
    setIsModalOpen(false)
  }

  return (
    <div className="productContainer">
      {products &&
        products?.map((item) => {
          return (
            <div
              id={`${item.id}`}
              className="productCard"
              key={item.id}
              onClick={() => handleClick(item)}
            >
              <img src={item.image} className="productImage" alt={item.title} />
              <h2 className="productTitle">{item.title}</h2>
              <p className="productDescription" onClick={()=> setIsModalOpen(false)}>{item.description}</p>
              <p>{`$${item.price}`}</p>
            </div>
          );
        })}
      {isModalOpen && <ProductModal product={selectedProduct!} onClose={handleCloseModal}/>}
    </div>
  );
};
