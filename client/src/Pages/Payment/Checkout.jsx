import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  const userData = useSelector((state) => state?.auth?.data);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();

    if (!razorpayKey || !subscription_id) {
      toast.error("Something Went Wrong");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#F37254",
      },
      prefill: {
        email: userData.email,
        name: userData.fullName,
      },
      handler: async function (response) {
        // It Internally works by razorpay
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        toast.success("Payment Successfull");

        const res = await dispatch(verifyUserPayment(paymentDetails));

        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    // To Open Payment pop up (also Added Razorpay CDN in index.html page to open the pop up)
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);
  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center rounded-lg relative shadow-[0_0_10px_black]">
          <h1 className="font-bold absolute top-0 w-full text-center p-4 text-2xl bg-orange-500">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center font-semibold mt-4">
            <p className="text-[17px]">
              This Purchase will allow you to access all available course of our
              platform for{" "}
              <span className="text-orange-600 font-bold">
                1 Year Duration{" "}
              </span>
              All the existing and new launched courses will be also available
            </p>
            <hr />

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-orange-500">
              ₹<span>4999</span>
            </p>
            <hr />

            <div className="text-gray-500 font-semibold">
              <p>100% Refund on Cancellation</p>
              <p>* Terms and Conditions Applied *</p>
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 cursor-pointer text-xl font-bold rounded-bl-lg rounded-br-lg p-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
