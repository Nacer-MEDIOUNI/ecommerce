// ProductCard.jsx - Using only actual API data with black Bootstrap classes
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Simple variant options for demonstration (since original data doesn't have variants)
  const [selectedVariant, setSelectedVariant] = useState("standard");
  const variants = [
    { id: "standard", name: "Standard", priceMultiplier: 1, inStock: true },
    { id: "premium", name: "Premium", priceMultiplier: 1.2, inStock: true },
    { id: "deluxe", name: "Deluxe", priceMultiplier: 1.5, inStock: false },
  ];

  const currentVariant = variants.find((v) => v.id === selectedVariant);
  const currentPrice = (
    parseFloat(product.price) * currentVariant.priceMultiplier
  ).toFixed(2);
  const isOutOfStock = !currentVariant.inStock;

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const addProduct = () => {
    if (!isOutOfStock) {
      dispatch(
        addCart({
          ...product,
          selectedVariant: currentVariant.name,
          price: currentPrice,
        })
      );
      toast.success("Added to cart");
    }
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className="card h-100 border-0 shadow-sm position-relative rounded-4">
        {/* Product Image */}
        <div
          className="position-relative overflow-hidden bg-light rounded-top-4"
          style={{ height: "250px" }}
        >
          <img
            src={product.imageUrl || product.image}
            alt={product.title}
            className="card-img-top w-100 h-100"
            style={{ objectFit: "contains" }}
          />

          {/* Out of Stock Badge */}
          {isOutOfStock && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-danger">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="card-body d-flex flex-column p-3">
          {/* Product Name */}
          <h5
            className="card-title mb-2 fw-semibold"
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.3",
              height: "2.6rem",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.title}
          </h5>

          {/* Product Description */}
          <p
            className="card-text text-muted small mb-3 flex-grow-1"
            style={{
              fontSize: "0.875rem",
              height: "3rem",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </p>

          {/* Variant Dropdown */}
          <div className="mb-3">
            <label className="form-label small text-muted mb-1">Variant:</label>
            <select
              className="form-select form-select-sm border-dark rounded-pill"
              value={selectedVariant}
              onChange={handleVariantChange}
            >
              {variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} $
                  {(
                    parseFloat(product.price) * variant.priceMultiplier
                  ).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-3">
            <span className="h5 mb-0 fw-bold text-dark">${currentPrice}</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto">
            <div className="d-grid gap-2">
              <button
                className="btn btn-dark fw-semibold rounded-pill"
                onClick={addProduct}
                disabled={isOutOfStock}
              >
                Add to Cart
              </button>

              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-dark rounded-pill fw-semibold"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
