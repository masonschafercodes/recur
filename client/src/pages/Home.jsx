import React from "react";
import {
  DollarSign,
  MapPin,
  Eye,
  AlignJustify,
  Pause,
  Tag,
} from "react-feather";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


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


export default function Home() {
  return (
    <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}>
      <div className="flex flex-wrap items-center justify-center my-3 py-10 w-full mx-autofont-mono bg-gradient-to-t from-blue-200">
        <div className="overflow-hidden relative w-3/5">
          <div className="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
              <span className="block">Take control of your</span>
              <span className="block">recurring expenses.</span>
            </h2>
            <p className="text-xl mt-4 font-light">
              With budgeting made easy, you can save time and worry about more
              important things like friends and family.
            </p>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-12 inline-flex rounded-full shadow">
                <Link
                  to='/subscriptions'
                  className="block lg:inline-block mt-4 lg:mt-0 text-md font-semibold bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full"
                >
                  Get Started on WEB
                </Link>
              </div>
            </div>
          </div>
          <img
            src="https://i.ibb.co/gSfynfR/undraw-Mobile-app-re-catg-removebg-preview.png"
            className="absolute h-full max-w-1/2 hidden lg:block right-0 top-0"
            alt="undraw-Mobile-app-re-catg-removebg-preview"
          />
        </div>
      </div>
      <div className="sm:flex flex-wrap justify-center items-center text-center gap-6 my-12">
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6  drop-shadow-lg rounded-lg">
          <div className="flex-shrink-0">
            <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-blue-200 text-blue-600 drop-shadow-lg">
              <DollarSign size={24} />
            </div>
          </div>
          <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold py-4">
            You are wasting money
          </h3>
          <p className="text-md text-gray-500 py-4">
            No more forgetting to cancel a subscription or overpaying for one
            you no longer use!
          </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-white drop-shadow-lg rounded-lg">
          <div className="flex-shrink-0">
            <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-blue-200 text-blue-600 drop-shadow-lg">
              <Eye size={24} />
            </div>
          </div>
          <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold py-4">
            Track what matters most
          </h3>
          <p className="text-md text-gray-500 py-4">
            With budgeting made easy, you can save time and worry about more
            important things like friends and family.
          </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 py-4 bg-white drop-shadow-lg rounded-lg">
          <div className="flex-shrink-0">
            <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-blue-200 text-blue-600 drop-shadow-lg">
              <MapPin size={24} />
            </div>
          </div>
          <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold py-4">
            The one place for subscriptions
          </h3>
          <p className="text-md  text-gray-500 py-4">
            Join the hundreds of people who are tracking their subscriptions
            with Recur.
          </p>
        </div>
      </div>
      <div className="my-12 pb-24 flex flex-col items-center justify-center w-full mx-auto font-mono bg-gradient-to-b from-purple-100 to-purple-200">
        <div className="py-24">
          <h1 className="text-4xl font-bold">Features</h1>
        </div>
        <div className="relative w-3/5 flex flex-row items-center justify-between">
          <div className="drop-shadow-lg rounded-2xl w-64 p-4 py-6 bg-white">
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-blue-300 rounded-xl relative text-white drop-shadow-lg">
                <AlignJustify
                  size={32}
                  className="text-white absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                />
              </div>
              <p className="text-2xl font-bold mb-4 mt-4">Sorting</p>
              <p className="text-center text-sm font-light px-2">
                By creation date, alphabetical order, price or due date
              </p>
            </div>
          </div>
          <div className="drop-shadow-lg rounded-2xl w-64 p-4 py-6 bg-white">
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-pink-400 rounded-xl relative text-white drop-shadow-lg">
                <Pause
                  size={32}
                  className="fill-current text-white absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                />
              </div>
              <p className="text-2xl font-bold mb-4 mt-4">
                Suspend / Resume
              </p>
              <p className="text-center text-sm font-light px-2">
                Want to temporarely suspend a subscription?
              </p>
            </div>
          </div>
          <div className="drop-shadow-lg rounded-2xl w-64 p-4 py-6 bg-white">
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-red-400 rounded-xl relative text-white drop-shadow-lg">
                <Tag
                  size={32}
                  className="fill-current text-white absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                />
              </div>
              <p className="text-2xl font-bold mb-4 mt-4">Tagging</p>
              <p className="text-center text-sm font-light px-2">
                Categorize your subscriptions by an unlimited number of tags.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 flex flex-row gap-12 items-center justify-center w-full mx-auto">
        <div>
          <h1>Roadmap</h1>
        </div>
        <div>
          <h1>Give Feedback</h1>
        </div>
        <div>
          <h1>Privacy</h1>
        </div>
      </div>
      <div className="py-12 flex flex-row gap-12 items-center justify-center w-full mx-auto">
        <div>
          <h1>Made by @masonschafercodes</h1>
        </div>
      </div>
    </motion.div>
  );
}
