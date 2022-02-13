import React from "react";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_USER_SUBSCRIPTIONS_QUERY } from "../util/graphql";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { AuthContext } from "../context/auth";

export default function NewSubscription() {
  const { user } = React.useContext(AuthContext);
  const [values, setValues] = React.useState({
    subscription: "",
    price: "",
    firstPayment: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [createSubscription] = useMutation(CREATE_SUBSCRIPTION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_SUBSCRIPTIONS_QUERY,
        variables: { username: user.username },
      });
      const newData = {
        getUserSubscriptions: [
          result.data.createSubscription,
          ...data.getUserSubscriptions,
        ],
      };

      proxy.writeQuery({
        query: FETCH_USER_SUBSCRIPTIONS_QUERY,
        data: newData,
        variables: { username: user.username },
      });
      navigate("/subscriptions", { replace: true });
    },
    variables: {
      subscriptionName: values.subscription,
      price: +values.price,
      firstPayment: values.firstPayment,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createSubscription();
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden my-12 flex flex-col justify-center items-center"
    >
      <div className="px-4 py-8 sm:px-10">
        <div className="w-full flex flex-col justify-center">
          <Link to={"/subscriptions"}>
            <h3 className="transition ease-in duration-200 text-md w-24 font-bold mb-6 rounded-full bg-gray-200 p-2 text-center hover:scale-90 hover:cursor-pointer hover:bg-gray-300">
              Back
            </h3>
          </Link>
        </div>
        <div className="relative mt-6">
          <h3 className="text-4xl font-bold text-gray-800">Add Subscription</h3>
        </div>
        <div className="mt-6">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col mb-2">
              <div className=" relative mb-2">
                <label className="relative ml-2 font-bold text-base">
                  Subscription Name
                </label>
                <input
                  type="text"
                  id="add-subscription-name"
                  className="my-3 rounded-full border-transparent flex-1 appearance-none w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="subscription"
                  placeholder="e.g. Netflix"
                  value={values.subscription}
                  onChange={onChange}
                />
              </div>
              <div className=" relative mb-2">
                <label className="ml-2 mb-2 font-bold text-base">Price</label>
                <input
                  type="text"
                  id="add-subscription-name"
                  className="rounded-full mt-2 border-transparent flex-1 appearance-none w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="price"
                  placeholder="e.g. 9.99"
                  value={values.price}
                  onChange={onChange}
                />
              </div>
              <div className=" relative mt-3 mb-2">
                <label className="ml-2 mb-2 font-bold text-base">First Payment Date</label>
                <input
                  type="datetime-local"
                  id="add-subscription-name"
                  className="rounded-full mt-2 border-transparent flex-1 appearance-none w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="firstPayment"
                  placeholder="First Payment Date"
                  value={values.firstPayment}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full my-4">
              <motion.button
                whileHover={{ scale: 0.98 }}
                type="submit"
                className="my-3 py-2 px-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-2/3 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full "
              >
                <span className="text-lg font-semibold">Add Subscription</span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription($subscriptionName: String!, $price: Float!, $firstPayment: String!) {
    createSubscription(subscriptionName: $subscriptionName, price: $price, firstPayment: $firstPayment) {
      id
      subscriptionName
      price
      createdAt
      firstPayment
    }
  }
`;
