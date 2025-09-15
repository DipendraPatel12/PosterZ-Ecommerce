import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Importance = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" });
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" });
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" });

  const features = [
    {
      icon: "🎨",
      title: "Artistic Expression",
      description: "Every piece tells a unique story, enriching lives with beauty and meaning."
    },
    {
      icon: "🏠",
      title: "Space Transformation",
      description: "Transform any room into a reflection of your personality and style."
    },
    {
      icon: "💝",
      title: "Emotional Connection",
      description: "Art sparks emotions and creates lasting memories in your space."
    },
    {
      icon: "🌟",
      title: "Quality Craftsmanship",
      description: "Premium materials and printing techniques for lasting beauty."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 rounded-full text-sm font-medium mb-6">
            Why Choose PosterZ
          </span>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Art That Transforms Lives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how the right artwork can revolutionize your space and elevate your everyday experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.section
          ref={ref3}
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={isInView3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* First Section: Image Left - Text Right */}
        <motion.section
          ref={ref1}
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={isInView1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -100 }}
              animate={isInView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593171/imp_xjperw.webp"
                  alt="Importance of Art"
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                Premium Quality
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 100 }}
              animate={isInView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 rounded-full text-sm font-medium">
                  Cultural Significance
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Why is this Important?
                </h3>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Understanding the importance of artwork helps us appreciate creativity, culture, and history. Each piece tells a unique story, enriching our lives with beauty and meaning.
                </p>
                <p>
                  Posters are more than just decorations—they tell stories, spark emotions, and transform spaces. Whether it's an inspiring quote, a breathtaking landscape, or a nostalgic movie poster, every piece adds personality and meaning to your surroundings.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    95%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Customer Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    1000+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Unique Artworks</div>
                </div>
              </div>

              {/* Benefits list */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50">
                <h4 className="font-semibold text-gray-800 mb-4">Key Benefits:</h4>
                <div className="space-y-2">
                  {[
                    "Enhances creativity and inspiration",
                    "Reflects personal style and taste",
                    "Creates conversation starters",
                    "Adds emotional depth to spaces"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 flex-shrink-0"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Second Section: Text Left - Image Right */}
        <motion.section
          ref={ref2}
          initial={{ opacity: 0 }}
          animate={isInView2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-6 lg:order-1"
              initial={{ opacity: 0, x: -100 }}
              animate={isInView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-600/10 text-purple-600 rounded-full text-sm font-medium">
                  Space Enhancement
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Enhance Your Space
                </h3>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Art transforms spaces, adding character and depth. Choosing the right piece can elevate the ambiance of any environment, making it more inviting and personal.
                </p>
                <p>
                  A well-placed poster can inspire creativity in a workspace, bring warmth to a living room, or set the perfect mood in a bedroom. Whether you prefer minimalist elegance, vibrant energy, or nostalgic charm, every poster tells a story.
                </p>
                <p className="font-medium text-gray-700">
                  Let your walls reflect your passions, dreams, and personality—because your space should feel like home, and every detail matters.
                </p>
              </div>

              {/* Room types */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
                <h4 className="font-semibold text-gray-800 mb-4">Perfect for Every Room:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { room: "Living Room", icon: "🛋️" },
                    { room: "Bedroom", icon: "🛏️" },
                    { room: "Office Space", icon: "💼" },
                    { room: "Kitchen", icon: "🍳" },
                    { room: "Bathroom", icon: "🛁" },
                    { room: "Hallway", icon: "🚪" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                      <span className="mr-2">{item.icon}</span>
                      {item.room}
                    </div>
                  ))}
                </div>
              </div>

              {/* Design styles */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { style: "Minimalist", color: "from-gray-400 to-gray-600" },
                  { style: "Vibrant", color: "from-orange-400 to-red-600" },
                  { style: "Nostalgic", color: "from-amber-400 to-yellow-600" }
                ].map((item, index) => (
                  <div key={index} className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                    <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-full mx-auto mb-2`}></div>
                    <div className="text-xs font-medium text-gray-700">{item.style}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative group lg:order-2"
              initial={{ opacity: 0, x: 100 }}
              animate={isInView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-3xl blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dwen6kq4r/image/upload/v1740593177/imp2_mx39kj.jpg"
                  alt="Enhance Your Space"
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                Transform Spaces
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Space?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Explore our collection and find the perfect artwork that speaks to your soul
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 hover:text-blue-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Browse Collection
                </button>
                <button className="px-8 py-4 border-2 border-white/30 hover:border-white/50 text-white rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Importance;