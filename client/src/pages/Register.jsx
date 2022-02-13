import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import React from "react";

import { AuthContext } from "../context/auth";

export default function Register(props) {
  const context = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      navigate("/subscriptions", { replace: true });
    },
    onError: (err) => {
      if (err.graphQLErrors.length > 0) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values,
  });

  React.useEffect(() => {
    if (context.user) {
      navigate("/", { replace: true });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="flex flex-col max-w-md px-4 py-8 sm:px-6 md:px-8 lg:px-10 w-1/2 mx-auto my-12">
      <div className="self-center mb-2 text-3xl font-bold text-black">
        Create a new account
      </div>
      <span className="justify-center text-sm text-center text-gray-500 flex-items-center">
        Already have an account?{" "}
        <a href="/login" className="text-sm underline">
          Sign in
        </a>
      </span>
      <div className="p-6 mt-2">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <label className="ml-2 mb-2 font-bold text-base">Username</label>
              <input
                type="text"
                id="create-account-username"
                className="mb-2 transition ease-in duration-200 bg-gray-200 hover:bg-gray-100 rounded-full border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="username"
                placeholder="username"
                value={values.username}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <label className="ml-2 mb-2 font-bold text-base">Email</label>
              <input
                type="text"
                id="create-account-email"
                className="mb-2 transition ease-in duration-200 bg-gray-200 hover:bg-gray-100 rounded-full border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <label className="ml-2 mb-2 font-bold text-base">Password</label>
              <input
                type="password"
                id="create-account-password"
                className="mb-2 transition ease-in duration-200 bg-gray-200 hover:bg-gray-100 rounded-full border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="password"
                placeholder="password"
                value={values.password}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <label className="ml-2 mb-2 font-bold text-base">
                Confirm Password
              </label>
              <input
                type="password"
                id="create-account-confirm-password"
                className="mb-2 transition ease-in duration-200 bg-gray-200 hover:bg-gray-100 rounded-full border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="confirmPassword"
                placeholder="Confirm"
                value={values.confirmPassword}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex w-full my-4 items-center justify-center">
            <button
              type="submit"
              className="my-3 py-2 px-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full "
            >
              Register
            </button>
          </div>
          <div>
            {Object.keys(errors).length > 0 && (
              <ul className="list-disc px-6 py-2 bg-red-100 rounded border border-1 border-rose-300">
                {Object.values(errors).map((value) => (
                  <li className="mx-2 text-red-700 p-1" key={value}>
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
