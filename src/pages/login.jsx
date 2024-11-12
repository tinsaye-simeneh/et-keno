import { useEffect, useRef, useState } from "react";
import { LoginAction } from "../stores/authSlice/authAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const Notification = ({ message, type }) => {
  if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const Login = () => {
  const passWordRef = useRef();
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passWordRef.current.value;

    setDisabled(true);
    try {
      setLoading(true);
      const response = await dispatch(LoginAction({ username, password }));
      if (response.payload) {
        if (response.payload.isActive === true) {
          localStorage.setItem("token", response.payload.token);
          window.location.href = "/";
        } else {
          setLoading(false);
          Notification({
            message: "Your account don't have access, please contact admin",
            type: "error",
          });
          window.location.href = "/login";
        }
      } else {
        setLoading(false);
        Notification({
          message: "Username or Password is incorrect",
          type: "error",
        });
      }
    } catch (error) {
      setLoading(false);
      setDisabled(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-50 md:py-10 dark:bg-gray-900">
      <div
        className="flex flex-col items-center justify-center px-3 py-8 mx-auto md:h-screen lg:py-0"
        style={{
          width: "100vw",
        }}
      >
        <p
          className="flex items-center mb-6 font-semibold text-gray-900 dark:text-white"
          style={{
            fontSize: "2.3rem",
          }}
        >
          Et-Virtual Keno <span className="ml-1 text-orange-600">.</span>
        </p>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Retailer Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  ref={usernameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="shop1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passWordRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                disabled={disabled}
                style={{
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="mr-2 text-white animate-spin" />{" "}
                    Loading...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Don’t have an account yet? Contact Admin
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
