import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCount, deleteProduct, increaseCount } from "../store/products";
import { formatCurrency } from "../utils";
import EmptyCart from "./EmptyCart";

function Checkout() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.shoppingcart.products);

  const deleteItem = (product) => {
    dispatch(deleteProduct(product));
  };

  const increaseQuantity = (index) => {
    dispatch(increaseCount(index));
  };

  const decreaseQuantity = (index) => {
    dispatch(decreaseCount(index));
  };

  const calculateSubTotal = () => {
    let price = 0;
    products?.forEach((product) => {
      price += product.price * product.quantity;
    });
    return price;
  };

  const calculateTotal = () => {
    const total = calculateSubTotal();
    return formatCurrency(total + 2);
  };

  return (
    <>
      {products?.length > 0 ? (
        <div className="max-w-5xl max-md:max-w-xl mx-auto p-4 h-screen">
          <h1 className="text-2xl font-bold text-slate-900">Your Cart</h1>
          <div className="grid md:grid-cols-3 gap-10 mt-8">
            <div className="md:col-span-2 space-y-4">
              {products?.map((product, index) => (
                <div className="flex gap-4 dark:border-gray-700 dark:bg-gray-800 px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                  <div className="flex gap-4">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                      <img
                        src={product.images[0]}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-white">
                          {product.title}
                        </h3>
                        <p className="text-sm text-white mt-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center gap-3">
                        <button
                          type="button"
                          className="flex items-center justify-center w-5 h-5 outline-none rounded-full"
                          onClick={() => decreaseQuantity(index)}
                          disabled={product.quantity === 1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 fill-white"
                            viewBox="0 0 124 124"
                          >
                            <path
                              d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                        <span className="font-semibold text-sm leading-[18px] text-white">
                          {product.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex items-center justify-center w-5 h-5 bg-slate-800 outline-none rounded-full"
                          onClick={() => increaseQuantity(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 fill-white"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col">
                    <div className="flex items-start gap-4 justify-end">
                      <button onClick={() => deleteItem(product)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mt-auto">
                      {formatCurrency(product.price)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
              <ul className="text-slate-900 font-medium space-y-4">
                <li className="flex flex-wrap gap-4 text-sm">
                  Subtotal{" "}
                  <span className="ml-auto font-semibold">
                    {formatCurrency(calculateSubTotal())}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Shipping <span className="ml-auto font-semibold">$2.00</span>
                </li>
                <hr className="border-slate-300" />
                <li className="flex flex-wrap gap-4 text-sm font-semibold">
                  Total <span className="ml-auto">{calculateTotal()}</span>
                </li>
              </ul>

              <div className="mt-8 space-y-2">
                <button
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}

export default Checkout;
