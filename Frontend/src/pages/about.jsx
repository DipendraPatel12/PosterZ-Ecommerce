import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();
  
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const stats = [
    { number: "1000+", label: "Unique Artworks", icon: "🎨" },
    { number: "500+", label: "Happy Customers", icon: "😊" },
    { number: "50+", label: "Art Categories", icon: "🏷️" },
    { number: "99%", label: "Satisfaction Rate", icon: "⭐" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Quality First",
      description: "We believe in providing only the highest quality prints and artwork that stand the test of time."
    },
    {
      icon: "💡",
      title: "Creative Innovation",
      description: "Constantly exploring new artistic styles and techniques to bring fresh perspectives to your walls."
    },
    {
      icon: "🤝",
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We're here to help you find the perfect piece for your space."
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "Committed to eco-friendly printing processes and sustainable business practices."
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "With over 10 years in the art industry, Alex founded PosterZ to make quality artwork accessible to everyone."
    },
    {
      name: "Sarah Chen",
      role: "Head of Curation",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Sarah's keen eye for design helps curate our diverse collection of prints and artwork."
    },
    {
      name: "Michael Rodriguez",
      role: "Quality Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Michael ensures every print meets our rigorous quality standards before reaching your door."
    },
    {
      name: "Emma Wilson",
      role: "Customer Experience Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Emma leads our customer support team, ensuring every customer has an exceptional experience."
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started as a small passion project to make quality art accessible to everyone."
    },
    {
      year: "2021",
      title: "First Milestone",
      description: "Reached 100+ artworks and served our first 1000 customers."
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Expanded to multiple categories and introduced custom printing services."
    },
    {
      year: "2023",
      title: "Recognition",
      description: "Won 'Best Online Art Store' award and reached 10,000+ happy customers."
    },
    {
      year: "2024",
      title: "Innovation",
      description: "Launched AR preview feature and sustainable printing initiatives."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10"></div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
              ✨ About PosterZ
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bringing Art to Life
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              We're passionate about making quality artwork accessible to everyone, transforming spaces one poster at a time.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => navigate('/collection')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Explore Our Collection
              </button>
              <button
                onClick={() => document.getElementById('story').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 rounded-xl text-gray-700 hover:text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-50"
              >
                Learn Our Story
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="py-16 bg-white/60 backdrop-blur-sm border-y border-gray-200/50"
        initial={{ opacity: 0 }}
        animate={isStatsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        id="story"
        ref={storyRef}
        className="py-20"
        initial={{ opacity: 0 }}
        animate={isStoryInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -100 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
                alt="Art Gallery"
                className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 100 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 rounded-full text-sm font-medium mb-4">
                  Our Journey
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Our Story
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  PosterZ was born from a simple belief: everyone deserves to live surrounded by beautiful art. What started as a small passion project has grown into a trusted destination for art lovers worldwide.
                </p>
                <p>
                  We noticed that quality artwork was often expensive and inaccessible. So we set out to change that by partnering with talented artists and using innovative printing technology to create museum-quality prints at affordable prices.
                </p>
                <p>
                  Today, we're proud to have transformed thousands of spaces and helped people express their unique personalities through art. Every poster tells a story, and we're here to help you tell yours.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200/50">
                <h4 className="font-semibold text-gray-800 mb-3">Our Mission</h4>
                <p className="text-gray-600">
                  "To democratize art by making high-quality, affordable artwork accessible to everyone, while supporting artists and sustainable practices."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-600/10 text-purple-600 rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Milestones & Growth
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative z-10 shadow-lg"></div>
                </div>
                
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <motion.section
        ref={valuesRef}
        className="py-20"
        initial={{ opacity: 0 }}
        animate={isValuesInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/10 to-blue-600/10 text-green-600 rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do, from curating artwork to serving customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                initial={{ opacity: 0, y: 50 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        className="py-20 bg-white/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={isTeamInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500/10 to-purple-600/10 text-pink-600 rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Meet the Artists Behind PosterZ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals dedicated to bringing you the best art experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already discovered the perfect artwork for their homes
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => navigate('/collection')}
                className="px-8 py-4 bg-white text-blue-600 hover:text-blue-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Browse Collection
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border-2 border-white/30 hover:border-white/50 text-white rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </section>
    </div>
  );
};

export default About;