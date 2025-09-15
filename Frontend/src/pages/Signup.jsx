import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearAuthState } from "../Redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success("Signup successful! 🎉");
      setTimeout(() => {
        dispatch(clearAuthState()); // ✅ Reset state AFTER showing toast
        navigate("/login"); // ✅ Navigate after clearing state
      }, 1000);
    }
    if (error) {
      toast.error(error);
      dispatch(clearAuthState()); // ✅ Clear error immediately
    }
  }, [success, error, navigate, dispatch]);

  return (
    <div className="relative flex items-center justify-center lg:h-[565px] sm:h-[350px] min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dwen6kq4r/image/upload/v1740594914/Bg_ffhuo9.jpg")`,
          filter: "brightness(50%) blur(2px)",
        }}
      ></div>

      <div className="relative bg-white p-8 rounded-lg shadow-xl w-96 bg-opacity-95 z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Username"
            className="w-full mb-3 p-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-3 p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
