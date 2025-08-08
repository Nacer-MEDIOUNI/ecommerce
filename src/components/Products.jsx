/* eslint-disable */
// Products.jsx - Using only API data
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        // Use your actual products.json data
        const response = await fetch("/data/products.json");
        const products = await response.json();

        if (componentMounted) {
          setData(products);
          setFilter(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        // Fallback to FakeStore API if local products.json fails
        try {
          const response = await fetch("https://fakestoreapi.com/products/");
          const products = await response.json();

          if (componentMounted) {
            setData(products);
            setFilter(products);
            setLoading(false);
          }
        } catch (fallbackError) {
          console.error("Error loading fallback products:", fallbackError);
          if (componentMounted) {
            setLoading(false);
          }
        }
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-4 text-center">
          <Skeleton height={40} width={300} className="mx-auto" />
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <Skeleton height={250} />
              <div className="card-body">
                <Skeleton height={20} className="mb-2" />
                <Skeleton height={15} count={2} className="mb-3" />
                <Skeleton height={30} className="mb-2" />
                <Skeleton height={25} className="mb-2" />
                <Skeleton height={40} />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    setActiveFilter(cat);
    if (cat === "all") {
      setFilter(data);
    } else {
      const updatedList = data.filter((item) => item.category === cat);
      setFilter(updatedList);
    }
  };

  const ShowProducts = () => {
    return (
      <>
        {/* Filter Buttons */}
        <div className="col-12 mb-4">
          <div className="text-center px-3">
            <div className="d-flex flex-wrap justify-content-center gap-2 my-4">
              <button
                type="button"
                className={`btn rounded-pill btn-sm px-4 ${
                  activeFilter === "all" ? "btn-dark" : "btn-outline-dark"
                }`}
                onClick={() => filterProduct("all")}
              >
                All Products
              </button>
              <button
                type="button"
                className={`btn rounded-pill btn-sm px-4 ${
                  activeFilter === "men's clothing"
                    ? "btn-dark"
                    : "btn-outline-dark"
                }`}
                onClick={() => filterProduct("men's clothing")}
              >
                Men's Clothing
              </button>
              <button
                type="button"
                className={`btn rounded-pill btn-sm px-4 ${
                  activeFilter === "women's clothing"
                    ? "btn-dark"
                    : "btn-outline-dark"
                }`}
                onClick={() => filterProduct("women's clothing")}
              >
                Women's Clothing
              </button>
              <button
                type="button"
                className={`btn rounded-pill btn-sm px-4 ${
                  activeFilter === "jewelery" ? "btn-dark" : "btn-outline-dark"
                }`}
                onClick={() => filterProduct("jewelery")}
              >
                Jewelery
              </button>
              <button
                type="button"
                className={`btn rounded-pill btn-sm px-4 ${
                  activeFilter === "electronics"
                    ? "btn-dark"
                    : "btn-outline-dark"
                }`}
                onClick={() => filterProduct("electronics")}
              >
                Electronics
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        {filter.length > 0 ? (
          filter.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <h4>No products found</h4>
              <p>Try adjusting your filters or check back later.</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-5 fw-bold mb-3">Our Products</h1>
          <p className="lead text-muted">
            Discover our amazing collection of products
          </p>
          <hr className="w-25 mx-auto" />
        </div>
      </div>

      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;

