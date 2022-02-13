import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "react-feather";

import LoadingSkeleton from "../components/LoadingSkeleton";
import SubscriptionCard from "../components/SubscriptionCard";

import { AuthContext } from "../context/auth";

export default function Dashboard() {
  let totalSubscriptionPrice = 0.0;
  const { user } = React.useContext(AuthContext);
  const [selected, setSelected] = React.useState({
    weekly: false,
    monthly: true,
    yearly: false,
  });

  const { loading, error, data } = useQuery(FETCH_USER_SUBSCRIPTIONS_QUERY, {
    variables: { username: user.username },
  });

  if (data) {
    data.getUserSubscriptions.map((sub) => {
      if (!sub.isSuspended) {
        totalSubscriptionPrice += sub.price;
      }
    });
  }

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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {loading || error ? (
        <div>
          <div className="w-1/2 mx-auto p-2 bg-gray-200 rounded-lg sm:p-2 flex flex-col sm:flex-row gap-5 select-none justify-center items-center">
            <h1 className="text-4xl mx-1 font-bold p-4"></h1>
          </div>
          <LoadingSkeleton />
        </div>
      ) : (
        <div>
          {data.getUserSubscriptions.length > 0 ? (
            <div>
              <div className="w-1/2 mx-auto p-2 sm:p-2 flex flex-col gap-5 select-none justify-center items-center">
                <h1 className="text-5xl mx-1 font-bold rounded-lg">
                  {selected.monthly ? formatter.format(totalSubscriptionPrice) : selected.weekly ? formatter.format(totalSubscriptionPrice / 4) : formatter.format(totalSubscriptionPrice * 12)}
                </h1>
                <div
                  className="bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 text-white py-2 px-3 rounded-full font-semibold drop-shadow-lg"
                >
                  <a
                    onClick={() =>
                      setSelected({
                        weekly: true,
                        monthly: false,
                        yearly: false,
                      })
                    }
                    className={
                      selected.weekly
                        ? "bg-white py-2 px-2 text-black rounded-full"
                        : "py-1 px-2 text-white hover:cursor-pointer"
                    }
                  >
                    Weekly
                  </a>
                  <a
                    onClick={() =>
                      setSelected({
                        weekly: false,
                        monthly: true,
                        yearly: false,
                      })
                    }
                    className={
                      selected.monthly
                        ? "mx-4 bg-white py-2 px-2 text-black rounded-full"
                        : "mx-4 py-1 px-2 text-white hover:cursor-pointer"
                    }
                  >
                    Monthly
                  </a>
                  <a
                    onClick={() =>
                      setSelected({
                        weekly: false,
                        monthly: false,
                        yearly: true,
                      })
                    }
                    className={
                      selected.yearly
                        ? "bg-white py-2 px-2 text-black rounded-full"
                        : "py-1 px-2 text-white hover:cursor-pointer"
                    }
                  >
                    Yearly
                  </a>
                </div>
              </div>
              {data.getUserSubscriptions &&
                data.getUserSubscriptions.map((sub) => (
                  <SubscriptionCard sub={sub} key={sub.id} />
                ))}
            </div>
          ) : (
            <div>
              <div className="w-1/2 mx-auto p-2 sm:p-2 flex flex-col sm:flex-row gap-5 select-none justify-center items-center">
                <h1 className="text-5xl mx-1 font-bold rounded-lg">
                  ${totalSubscriptionPrice.toFixed(2)}
                </h1>
              </div>
              <div className="hidden lg:flex my-12 w-1/2 mx-auto p-2 sm:p-2 sm:flex-row lg:flex-col gap-5 select-none justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 455.881 455.881"
                  className="w-1/3 h-1/3 fill-slate-300"
                >
                  <path d="M321.218 257.555c15.516-20.46 23.717-44.881 23.717-70.624 0-31.563-12.379-61.151-34.857-83.314-22.474-22.158-52.261-34.124-83.828-33.668-30.591.433-59.412 12.708-81.154 34.564-21.741 21.855-33.867 50.741-34.145 81.335-.238 26.228 8.011 51.088 23.855 71.894 25.721 33.776 39.887 75.149 39.887 116.498v45.244c0 20.069 16.327 36.396 36.396 36.396h33.854c20.069 0 36.396-16.328 36.396-36.396v-45.241c.001-41.806 13.691-82.157 39.879-116.688zm-174.478-8.9c-13.808-18.132-20.997-39.803-20.79-62.67.499-54.935 45.588-100.26 100.512-101.037 27.553-.37 53.493 10.035 73.084 29.352 19.597 19.321 30.389 45.116 30.389 72.632 0 22.442-7.147 43.729-20.669 61.56-27.593 36.385-42.45 78.833-43.058 122.93h-76.536c-.627-43.669-15.817-87.161-42.932-122.767zm42.953 165.746v-6.072l76.647 8.781v2.374c0 1.25-.13 2.468-.336 3.659l-76.311-8.742zm0-21.17v-6.809h76.647v15.59l-76.647-8.781zm21.396 47.65c-8.057 0-15.082-4.48-18.731-11.077l64.567 7.397a21.27 21.27 0 0 1-11.981 3.679h-33.855z" />
                  <path d="M153.776 198.213a76.76 76.76 0 0 1-.827-11.983 7.5 7.5 0 0 0-7.431-7.568c-4.114-.036-7.53 3.289-7.568 7.431a91.79 91.79 0 0 0 .99 14.333 7.501 7.501 0 0 0 8.525 6.312 7.501 7.501 0 0 0 6.311-8.525zM197.913 312.135a7.5 7.5 0 0 0 7.126-9.844 237.946 237.946 0 0 0-36.82-69.994 75.768 75.768 0 0 1-7.016-11.079 7.5 7.5 0 1 0-13.325 6.889 90.891 90.891 0 0 0 8.408 13.278 222.98 222.98 0 0 1 34.504 65.591 7.502 7.502 0 0 0 7.123 5.159zM306.746 212.613a7.5 7.5 0 0 0-9.855 3.921 75.018 75.018 0 0 1-9.139 15.643 7.5 7.5 0 0 0 11.952 9.063 90.13 90.13 0 0 0 10.963-18.772 7.499 7.499 0 0 0-3.921-9.855zM227.941 111.938c41.352 0 74.994 33.643 74.994 74.995 0 2.351-.108 4.72-.321 7.041a7.5 7.5 0 0 0 14.937 1.371c.254-2.775.384-5.605.384-8.412 0-49.623-40.371-89.995-89.994-89.995a7.5 7.5 0 0 0 0 15zM227.941 57a7.5 7.5 0 0 0 7.5-7.5v-42a7.5 7.5 0 0 0-15 0v42a7.5 7.5 0 0 0 7.5 7.5zM152.065 71.82a7.497 7.497 0 0 0 10.245 2.746 7.5 7.5 0 0 0 2.746-10.245l-20.99-36.36a7.5 7.5 0 0 0-12.991 7.499l20.99 36.36zM388.22 272.115l-36.36-20.99a7.498 7.498 0 0 0-10.245 2.746 7.5 7.5 0 0 0 2.746 10.245l36.36 20.99a7.498 7.498 0 0 0 10.245-2.746 7.5 7.5 0 0 0-2.746-10.245zM67.661 104.366l36.36 20.99a7.498 7.498 0 0 0 10.245-2.746 7.5 7.5 0 0 0-2.746-10.245l-36.36-20.99a7.499 7.499 0 0 0-10.245 2.746 7.5 7.5 0 0 0 2.746 10.245zM408.68 180.74h-42a7.5 7.5 0 0 0 0 15h42a7.5 7.5 0 0 0 0-15zM96.7 188.24a7.5 7.5 0 0 0-7.5-7.5h-42a7.5 7.5 0 0 0 0 15h42a7.5 7.5 0 0 0 7.5-7.5zM348.117 126.362a7.465 7.465 0 0 0 3.743-1.006l36.36-20.99a7.5 7.5 0 0 0-7.499-12.991l-36.36 20.99a7.5 7.5 0 0 0 3.756 13.997zM104.021 251.125l-36.36 20.99a7.5 7.5 0 0 0 7.499 12.991l36.36-20.99a7.5 7.5 0 0 0-7.499-12.991zM293.571 74.566a7.498 7.498 0 0 0 10.245-2.746l20.99-36.36a7.5 7.5 0 0 0-12.991-7.499l-20.99 36.36a7.5 7.5 0 0 0 2.746 10.245z" />
                </svg>
                <h1 className="text-xl mx-1 rounded-lg">
                  Doesn't look like there are any subscriptions yet.
                </h1>
              </div>
            </div>
          )}
          <Link
            to="/subscriptions/new"
            className="fixed h-16 w-16 transition ease-in duration-200 mx-auto font-semibold lg:fixed lg:bottom-10 lg:left-1/3 lg:right-1/3 flex items-center p-4 justify-center hover:scale-90 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white border-2 border-purple-500 text-lg focus:outline-none"
          >
            <Plus />
          </Link>
        </div>
      )}
    </motion.div>
  );
}

const FETCH_USER_SUBSCRIPTIONS_QUERY = gql`
  query getUserSubscriptions($username: String!) {
    getUserSubscriptions(username: $username) {
      id
      subscriptionName
      price
      createdAt
      isSuspended
      firstPayment
    }
  }
`;
