import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import moment from "moment";
import { Circle } from "react-feather";


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

export default function SubscriptionCard(props) {
  const {
    id,
    subscriptionName,
    createdAt,
    username,
    price,
    isSuspended,
    firstPayment,
  } = props.sub;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const backgrounds = {
    blueToPurple:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih1.redbubble.net%2Fimage.204977056.3569%2Fpp%2C550x550.u4.jpg&f=1&nofb=1",
    blueToRed:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hamiltonscompounding.com.au%2Fwp-content%2Fuploads%2Fgreen-to-blue-gradient.jpg&f=1&nofb=1",
    multiColor:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flessandmore.com%2Fwp-content%2Fuploads%2F2016%2F08%2FCOVER.jpg&f=1&nofb=1",
  };

  const getMonthsOfset = (date, date2) => {
    const dateDif = new Date(date) - new Date(date2);
    return Math.ceil(dateDif / 2629746000);
  };

  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      className="my-1 w-1/2 mx-auto p-2 sm:p-2 flex flex-col sm:flex-row gap-5 select-none transition ease-in-out hover:cursor-pointer rounded-lg"
    >
      <Link
        to={`/subscriptions/${id}`}
        className="flex flex-col flex-1 gap-5 sm:p-2"
      >
        <div className="flex flex-1 gap-3 transition ease-in-out duration-200 hover:text-gray-600 items-center">
          <div className="p-2 bg-blue-200 rounded-[14px] hidden 2xl:flex">
            <img
              alt="profil"
              src={
                backgrounds[
                  Object.keys(backgrounds)[
                    Math.floor(Math.random() * Object.keys(backgrounds).length)
                  ]
                ]
              }
              className="mx-auto object-cover overflow-hidden rounded-full h-10 w-12"
            />
          </div>
          <div className="flex items-center w-full h-12 rounded-2xl">
            {isSuspended ? (
              <h1 className="text-gray-400 p-3 text-lg font-semibold">
                {subscriptionName}
              </h1>
            ) : (
              <div className="flex flex-col justify-center">
                <h1 className="text-lg font-semibold">
                  {subscriptionName}
                </h1>
                <span className="flex items-center gap-2 text-sm">
                <Circle
                        size={16}
                        className="fill-green-400 stroke-transparent"
                      />
                  Due{" "}
                  {moment(firstPayment)
                    .add(getMonthsOfset(Date.now(), firstPayment), "months")
                    .startOf("hour")
                    .fromNow()}
                </span>
              </div>
            )}
            {isSuspended ? (
              <p className="uppercase bg-gray-200 text-xs font-bold p-1 rounded">
                inactive
              </p>
            ) : null}
          </div>
          <div className="rounded-2xl">
            <motion.p
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              className="p-3 font-semibold text-lg"
            >
              {formatter.format(price)}
            </motion.p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
