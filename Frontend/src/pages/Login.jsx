import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthState } from "../Redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // ✅ Handle toast messages inside `useEffect`
  useEffect(() => {
    dispatch(clearAuthState());
    if (success) {
      toast.success("Login successful! 🎉");
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate, dispatch]);

  return (
    <div className="relative flex items-center justify-center lg:h-[565px] min-h-screen w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dwen6kq4r/image/upload/v1740594914/Bg_ffhuo9.jpg")`,
          filter: "brightness(50%) blur(2px)",
        }}
      ></div>

      {/* Login Form */}
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-96 bg-opacity-95 z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
