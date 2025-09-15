import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Importance from "../components/Importance";

const Home = () => {
  const categories = [
    { img: "https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593471/movies_bpgxtf.jpg", title: "Movies" },
    { img: "https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593472/ronaldo_kabhyb.jpg", title: "Sports" },
    { img: "https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593491/spritual_av0s4k.jpg", title: "Spiritual" },
    { img: "https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593420/cartoon_ayqq3k.jpg", title: "Cartoon" },
  ];

  const topPicks = [
    { img: "https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593420/comedy_zqvpvg.jpg", title: "Comedy" },
    { img: "https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593420/goal_uixljx.jpg", title: "Goal" },
    { img: "https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593441/movie_h41tbs.jpg", title: "Movie" },
    { img: "https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593472/proud_m4krwg.jpg", title: "Proud" },
  ];

  return (
    <div className="Home bg-gradient-to-b from-gray-100 to-white">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <motion.section 
        className="container mx-auto my-12 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800">Shop By Categories</h2>
          <p className="text-gray-500 text-lg">
            Shop from the best, our Film and TV Posters Collection.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
            >
              <img src={category.img} alt={category.title} className="w-full h-48 object-cover" />
              {/* Transparent Hover Text */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-transparent hover:text-white text-lg font-bold transition-all duration-300"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} // Subtle transparent overlay
              >
                {category.title}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Top Picks Section */}
      <motion.section
        className="container mx-auto my-12 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800">Our Top Picks</h2>
          <p className="text-gray-500 text-lg">All New Designs, Same Old Details.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {topPicks.map((pick, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={pick.img} alt={pick.title} className="w-full h-48 object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Importance />
      <Footer />
    </div>
  );
};

export default Home;
