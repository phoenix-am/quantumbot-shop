import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "../store/products";

function ProductsList() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.products.products);
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    setSearchedProducts(list);
  }, []);

  const addItem = (product) => {
    dispatch(addToCart(product));
  };

  const search = (e) => {
    const val = e.target.value;
    const products = [];
    list?.forEach(p => {
      if (p.title.toLowerCase().includes(val.toLowerCase())) {
        products.push(p);
      }
    })

    setSearchedProducts(products);
  }

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white text-lg font-semibold">Products</h2>
          <div class="relative mt-2 mb-4">
            <div class="absolute top-[10px] left-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 fill-white"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded-md pr-12 pl-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search..."
              onChange={search}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {searchedProducts.map((product) => {
            return (
              <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <img
                    className="mx-auto h-44 w-44"
                    src={product.images[0]}
                    alt={product.title}
                  />
                <div>
                  <span
                    className="text-lg font-semibold leading-tight text-gray-900 dark:text-white"
                  >
                    {product.title?.substr(0, 80)}...
                  </span>
                  <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    {product.description?.substr(0, 100)}...
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold leading-tight text-white dark:text-white">
                    ${product.price}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2.5">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => addItem(product)}
                  >
                    <svg
                      className="-ms-2 me-2 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
