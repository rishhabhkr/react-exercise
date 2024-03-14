import { useEffect } from "react";
import { Product } from "../types";
import "./Modal.css";

interface ProductModalProps {
  product: Product;
  onClose: ()=>void
}

export const ProductModal: React.FC<ProductModalProps> = ({ product,onClose }) => {
  useEffect(() => {
    async function getProductDetails() {
      const url = process.env.REACT_APP_PRODUCTS_URL;
      await fetch(`${url}/${product?.id}`)
        .then((res) => res.json())
        .then((data) => console.log("Data", data));
    }
    getProductDetails();
  });


  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modalContainer" onClick={handleOverlayClick}>
      <div className="modalContent">
        <img src={`${product.image}` } className='modalImage' alt={product.title}/>
        <div className="productInfoContainer">
        <h1 id="productName">{product.title}</h1>
        <p id="productCategory">{`Category: ${product.category}`}</p>
        <p id="productDescription">{`Description: ${product.description}`}</p>
        <button onClick={onClose} className="closeButton">Close</button>
        </div>
      </div>
     
    </div>
  );
};
