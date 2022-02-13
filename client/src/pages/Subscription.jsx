import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import DeleteModal from "../components/DeleteModal";
import { motion } from "framer-motion";
import { Pause, Play, Circle } from "react-feather";
import moment from "moment";

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

export default function Subscription() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  let params = useParams();

  const { loading, error, data } = useQuery(FETCH_SINGLE_SUBSCRIPTION_QUERY, {
    variables: { id: params.subscriptionId },
  });

  const [deleteSubscription] = useMutation(DELETE_SUBSCRIPTION_MUTATION, {
    variables: { id: params.subscriptionId },
    refetchQueries: [
      {
        query: FETCH_USER_SUBSCRIPTIONS_QUERY,
        variables: { username: user.username },
      },
      "getUserSubscriptions",
    ],
    update(_, result) {
      navigate("/subscriptions", { replace: true });
    },
  });

  const [updateSubscriptionSuspension] = useMutation(
    UPDATE_SUBSCRIPTION_SUSPENSION,
    {
      variables: {
        id: params.subscriptionId,
        isSuspended: data && !data.getSubscription.isSuspended,
      },
      refetchQueries: [
        {
          query: FETCH_USER_SUBSCRIPTIONS_QUERY,
          variables: { username: user.username },
        },
        "getUserSubscriptions",
      ],
      update(_, result) {
        navigate("/subscriptions", { replace: true });
      },
    }
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const onClick = (e) => {
    e.preventDefault();
    deleteSubscription();
  };

  const onClickSuspenion = (e) => {
    e.preventDefault();
    updateSubscriptionSuspension();
  };

  const getMonthsOfset = (date, date2) => {
    const dateDif = new Date(date) - new Date(date2);
    return Math.ceil(dateDif / 2629746000)
  }

  return (
    <div>
      {loading || error ? (
        <div>
          <div className="my-12 w-1/2 mx-auto p-2 bg-gray-200 rounded-lg sm:p-2 flex flex-col sm:flex-row gap-5 select-none justify-center items-center">
            <h1 className="text-4xl mx-1 font-bold p-4"></h1>
          </div>
          <LoadingSkeleton />
        </div>
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
        >
          <div className="w-full mx-auto flex flex-row lg:flex-col gap-5 select-none justify-center items-center bg-gradient-to-br from-slate-300 via-slate-600 to-black text-white">
            <div className="flex flex-row py-6 w-1/2">
              <Link to={"/subscriptions"} className="float-left">
                <h3 className="transition ease-in duration-200 text-lg w-24 font-bold rounded-full p-2 text-center bg-white text-black hover:scale-90 hover:cursor-pointer">
                  Back
                </h3>
              </Link>
            </div>
            <div className="p-12 flex items-center justify-center flex-col">
              <h1 className="text-5xl font-semibold mx-1">
                {data.getSubscription.subscriptionName}
              </h1>
              <h1 className="text-5xl mx-1 font-bold rounded-lg pt-4">
                {formatter.format(data.getSubscription.price)}{" "}
                <span className="text-2xl mx-1">/ month</span>
              </h1>
              <div className="mt-3">
                {data.getSubscription.isSuspended ? (
                  <span className="text-sm bg-white text-black uppercase px-2 py-1 rounded font-semibold">
                    inactive
                  </span>
                ) : null}
              </div>
              <div className="mt-3">
                {data.getSubscription.isSuspended ? (
                  null
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <span className="flex items-center justify-center gap-1 text-sm text-white px-2 py-1 rounded font-semibold">
                      <Circle
                        size={14}
                        className="fill-green-400 stroke-transparent"
                      />
                      Due{" "}
                      <span>
                        {moment(data.getSubscription.firstPayment)
                          .add(getMonthsOfset(Date.now(), data.getSubscription.firstPayment), "months")
                          .startOf('hour')
                          .fromNow()}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="w-full mx-auto mt-8 flex flex-col lg:flex-col gap-2 select-none items-center">
              <div className="flex flex-row pt-6 w-1/2">
                <h1 className="text-xl font-semibold">Start date</h1>
              </div>
              <div className="flex flex-row w-1/2">
                <h1 className="text-xl text-gray-400">
                  {moment(data.getSubscription.firstPayment).format("LL")}
                </h1>
              </div>
            </div>
            {!data.getSubscription.isSuspended ? (
              <div className="w-full mx-auto mt-8 flex flex-col lg:flex-col gap-2 select-none items-center">
                <div className="flex flex-row pt-6 w-1/2">
                  <h1 className="text-xl font-semibold">Yearly Spending</h1>
                </div>
                <div className="flex flex-row w-1/2">
                  <h1 className="text-xl text-gray-400">
                    {formatter.format(data.getSubscription.price * 12)}
                  </h1>
                </div>
              </div>
            ) : (
              <div className="w-full mx-auto mt-8 flex flex-col lg:flex-col gap-2 select-none items-center">
                <div className="flex flex-row pt-6 w-1/2">
                  <h1 className="text-xl font-semibold">Yearly Savings</h1>
                </div>
                <div className="flex flex-row w-1/2">
                  <h1 className="text-xl text-gray-400">
                  {formatter.format(data.getSubscription.price * 12)}
                  </h1>
                </div>
              </div>
            )}{" "}
          </div>
          <div className="fixed bottom-10 flex items-center justify-center mx-auto w-full">
            <DeleteModal onClick={onClick} />
            <div className="flex">
              {!data.getSubscription.isSuspended ? (
                <button
                  type="submit"
                  className="transition ease-in duration-200 text-red-700 font-bold py-2 px-4 rounded-full mx-auto hover:bg-red-100 hover:scale-90"
                  onClick={onClickSuspenion}
                >
                  <div className="flex flex-row items-center justify-center">
                    <span>
                      <Pause color="rgb(185 28 28)" size={18} />
                    </span>
                    <span className="py-2 px-2 rounded-full">Suspend</span>
                  </div>
                </button>
              ) : (
                <button
                  type="submit"
                  className="transition ease-in duration-200 text-green-700 font-bold py-2 px-4 rounded-full mx-auto hover:bg-green-100 hover:scale-90"
                  onClick={onClickSuspenion}
                >
                  <div className="flex flex-row items-center justify-center">
                    <span>
                      <Play color="rgb(21 128 61)" size={18} />
                    </span>
                    <span className="py-2 px-2 rounded-full">Resume</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

const FETCH_SINGLE_SUBSCRIPTION_QUERY = gql`
  query getSubscription($id: ID!) {
    getSubscription(id: $id) {
      id
      subscriptionName
      username
      price
      createdAt
      isSuspended
      firstPayment
    }
  }
`;

const DELETE_SUBSCRIPTION_MUTATION = gql`
  mutation deleteSubscription($id: ID!) {
    deleteSubscription(id: $id)
  }
`;

const FETCH_USER_SUBSCRIPTIONS_QUERY = gql`
  query getUserSubscriptions($username: String!) {
    getUserSubscriptions(username: $username) {
      id
      subscriptionName
      price
      createdAt
    }
  }
`;

const UPDATE_SUBSCRIPTION_SUSPENSION = gql`
  mutation updateSubscriptionSuspenion($id: ID!, $isSuspended: Boolean!) {
    updateSubscriptionSuspenion(id: $id, isSuspended: $isSuspended) {
      id
      subscriptionName
      username
      price
      createdAt
      isSuspended
      firstPayment
    }
  }
`;
