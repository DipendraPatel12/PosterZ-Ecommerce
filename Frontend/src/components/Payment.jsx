import React from "react";
import { useParams } from "react-router";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";

function Payments() {
  const { status } = useParams();
  const dispatch = useDispatch();

  if (status === "success") {
    dispatch(resetCart());
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Icon */}
      <div
        className={`text-6xl ${
          status === "success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status === "success" ? <BsFillCartCheckFill /> : <BiErrorCircle />}
      </div>

      {/* Message */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        {status === "success" ? "Your order has been placed" : "Payment Failed"}
      </h2>

      {/* CTA Button */}
      <button
        className={`mt-6 px-6 py-2 text-white text-lg font-medium rounded-md transition 
                    ${
                      status === "success"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
      >
        {status === "success" ? "Shop More" : "Try Again"}
      </button>
    </div>
  );
}

export default Payments;
