import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = React.useState("login"); // login | register
  const [resetMode, setResetMode] = React.useState(false); // forgot password

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      // 🔹 Forgot password API
      if (resetMode) {
        const { data } = await axios.post('/api/user/forgot-password', { email, newPassword: password });

        if (data.success) {
          toast.success("Password has been reset successfully");
          setResetMode(false);
          setPassword("");
        } else {
          toast.error(data.message);
        }
        return;
      }

      // 🔹 Login / Register API
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password
      });

      if (data.success) {
        navigate('/');
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >

        {/* 🔹 Title */}
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {resetMode ? "Reset Password" : state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* 🔹 Name (Register only) */}
        {state === "register" && !resetMode && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        {/* 🔹 Email */}
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        {/* 🔹 Password */}
        <div className="w-full">
          <p>{resetMode ? "New Password" : "Password"}</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        {/* 🔹 Forgot Password link */}
        {state === "login" && !resetMode && (
          <p
            onClick={() => setResetMode(true)}
            className="text-primary text-xs cursor-pointer self-end"
          >
            Forgot password?
          </p>
        )}

        {/* 🔹 Switch Login/Register (hidden in reset mode) */}
        {!resetMode && (
          state === "register" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer"
              >
                click here
              </span>
            </p>
          ) : (
            <p>
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer"
              >
                click here
              </span>
            </p>
          )
        )}

        {/* 🔹 Back to Login (reset mode) */}
        {resetMode && (
          <p
            onClick={() => setResetMode(false)}
            className="text-primary cursor-pointer text-sm"
          >
            Back to login
          </p>
        )}

        {/* 🔹 Button */}
        <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {resetMode
            ? "Reset Password"
            : state === "register"
            ? "Create Account"
            : "Login"}
        </button>

      </form>
    </div>
  );
};

export default Login;
