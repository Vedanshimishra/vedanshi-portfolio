import React, { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaMoon, FaSun, FaBars, FaArrowUp, FaBriefcase, FaTrophy, FaLightbulb, FaCode, FaDatabase, FaBrain, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaPython, FaJava } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCplusplus, SiNumpy, SiPandas, SiScikitlearn } from "react-icons/si";
import Typical from "react-typical";

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options) => {
  const [entry, setEntry] = useState(null);
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntry(entry);
        observer.current.unobserve(entry.target);
      }
    }, options);

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry];
};


// Reusable Animated Section Component
const AnimatedSection = ({ children, id }) => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = !!entry;

  return (
    <section ref={ref} id={id} className={`py-16 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>
      {children}
    </section>
  );
};


// Main App Component
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navLinks = [
    ["about", "About"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["gallery", "Gallery"],
    ["experience", "Experience"],
    ["achievements", "Achievements"],
    ["leadership", "Leadership"]
  ];
  
  const skillsData = {
    "Languages": [
        { name: "C++", icon: <SiCplusplus className="mr-2"/> },
        { name: "Python", icon: <FaPython className="mr-2"/> },
        { name: "SQL", icon: <FaDatabase className="mr-2"/> },
        { name: "Java", icon: <FaJava className="mr-2"/> }
    ],
    "Web Development": [
        { name: "HTML", icon: <FaHtml5 className="mr-2"/> },
        { name: "CSS", icon: <FaCss3Alt className="mr-2"/> },
        { name: "JavaScript", icon: <FaJsSquare className="mr-2"/> },
        { name: "React", icon: <FaReact className="mr-2"/> }
    ],
    "Data Science & ML": [
        { name: "NumPy", icon: <SiNumpy className="mr-2"/> },
        { name: "Pandas", icon: <SiPandas className="mr-2"/> },
        { name: "Scikit-learn", icon: <SiScikitlearn className="mr-2"/> }
    ],
    "Core Concepts": [
        { name: "Data Structures", icon: <FaCode className="mr-2"/> },
        { name: "Algorithms", icon: <FaBrain className="mr-2"/> }
    ]
  };
  
  const galleryData = [
    {
      title: "Forecasting Dashboard",
      description: "UI for Meal Demand Forecasting",
      image: "/images/project-meal-demand.png",
      alt: "Meal Demand Forecasting UI"
    },
    {
      title: "Genre Classifier",
      description: "App for Music Genre Classification",
      image: "/images/project-music-genre.png",
      alt: "Music Genre Classification App"
    }
  ];


  const renderNavButtons = () => (
    <>
      {navLinks.map(([id, label]) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-300 transition-transform transform hover:scale-110"
        >
          {label}
        </button>
      ))}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="text-2xl p-2 rounded-full hover:bg-purple-700 dark:hover:bg-purple-600 transition-transform transform hover:scale-110"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white font-sans relative">
      <header className="bg-purple-600 dark:bg-purple-800 text-white p-4 md:p-6 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold cursor-pointer hover:text-yellow-300 transition-colors" onClick={() => scrollToSection("hero")}>Vedanshi Mishra</h1>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl focus:outline-none">
              <FaBars />
            </button>
          </div>
          <nav className="hidden md:flex space-x-2 items-center">
            {renderNavButtons()}
          </nav>
        </div>
        {isMenuOpen && (
          <div className="mt-4 flex flex-col md:hidden space-y-2 bg-purple-700 dark:bg-purple-900 p-4 rounded-md animate-fade-in">
            {renderNavButtons()}
          </div>
        )}
      </header>

      <main className="container mx-auto px-4">
        <section id="hero" className="text-center py-20 md:py-32">
             <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                <Typical
                    steps={["Software Developer", 3500, "AI/ML Enthusiast", 3500, "Tech Outreach Advocate", 3500]}
                    loop={Infinity}
                    wrapper="span"
                />
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                B.Tech in ECE-AI at IGDTUW, passionate about building impactful technology and fostering community.
            </p>
             <a
                href="https://drive.google.com/file/d/1HN0dWKXggAcBbGDtHkXDWBjlhX4Rc29J/view?usp=sharing"
                target="_blank" rel="noopener noreferrer"
                className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-transform transform hover:scale-105 shadow-lg"
              >
                Download Resume
              </a>
        </section>


        <AnimatedSection id="about">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">About Me</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                    I’m currently pursuing B.Tech in Electronics and Communication Engineering with specialization in AI from IGDTUW (2023–2027). I thrive on turning complex problems into elegant software solutions and am deeply passionate about full-stack development, AI/ML, and tech outreach.
                </p>
            </div>
        </AnimatedSection>

        <AnimatedSection id="skills">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          <div className="max-w-5xl mx-auto space-y-8">
              {Object.entries(skillsData).map(([category, skills]) => (
                  <div key={category}>
                      <h3 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-400">{category}</h3>
                      <div className="flex flex-wrap gap-3">
                          {skills.map(skill => (
                              <div key={skill.name} className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-md font-medium shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                                  {skill.icon}
                                  <span>{skill.name}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects">
          <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2">Meal Demand Forecasting</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                End-to-end meal forecasting tool using XGBoost, Flask, and Render. Built UI, deployed MVP for inventory prediction.
              </p>
              <a href="https://github.com/Vedanshimishra/DEMAND_FORECASTING" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">View on GitHub &rarr;</a>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2">Music Genre Classification</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                CNN-based audio genre classifier integrated with Spotify API using TensorFlow and Librosa.
              </p>
              <a href="https://github.com/Vedanshimishra/MusicGenreClassification" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">View on GitHub &rarr;</a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="gallery">
          <h2 className="text-3xl font-bold mb-6 text-center">Project Gallery</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {galleryData.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="relative h-56 overflow-hidden">
                            <img src={item.image} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                    </div>
                ))}
           </div>
        </AnimatedSection>

        <AnimatedSection id="experience">
          <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
          <div className="max-w-3xl mx-auto">
            <div className="timeline-item">
              <div className="timeline-dot"><FaBriefcase /></div>
              <div className="timeline-card">
                  <h3 className="text-xl font-semibold">App Development Intern @ IGDTUW</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">June–July 2024</p>
                  <p className="text-gray-700 dark:text-gray-300">Designed and implemented a mobile-first UI for an enterprise resource planning (ERP) system using Flutter, focusing on user experience and responsive design.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"><FaLightbulb /></div>
              <div className="timeline-card">
                  <h3 className="text-xl font-semibold">Research Intern @ IGDTUW</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">June–July 2025</p>
                  <p className="text-gray-700 dark:text-gray-300">Simulated over 30 digital circuits using LTSpice to validate performance metrics, including power, delay, and noise margins, contributing to low-power VLSI research.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="achievements">
            <h2 className="text-3xl font-bold mb-8 text-center">Achievements</h2>
            <div className="max-w-3xl mx-auto">
                <div className="timeline-item">
                    <div className="timeline-dot"><FaTrophy /></div>
                    <div className="timeline-card">
                        <h3 className="text-xl font-semibold">Competitive Programming & Hackathons</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                            <li>Pupil (1014) on Codeforces, 1394 on LeetCode, 400+ problems solved</li>
                            <li>Top 300 in Woodpeckers Hackathon 2024</li>
                            <li>Top 15 in Innovortex Hackathon (Microsoft Azure)</li>
                        </ul>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-dot"><FaTrophy /></div>
                    <div className="timeline-card">
                        <h3 className="text-xl font-semibold">Scholarships & Recognition</h3>
                         <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                            <li>GHCI'24 Scholarship Recipient</li>
                            <li>Delegate @ Harvard HPAIR Asia Conference</li>
                            <li>GSSoC 2024 contributor with 6 pull requests merged</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AnimatedSection>

        <AnimatedSection id="leadership">
          <h2 className="text-3xl font-bold mb-6 text-center">Leadership</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
              <h3 className="text-xl font-semibold mb-2">Public Relations Lead, MLSA IGDTUW</h3>
              <p className="text-gray-600 dark:text-gray-300">Organized and promoted tech events for over 100 students across 4+ colleges, enhancing community engagement and brand visibility.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
              <h3 className="text-xl font-semibold mb-2">Mentor, Desh ke Mentor</h3>
              <p className="text-gray-600 dark:text-gray-300">Guided two students through their JEE preparation journey, providing academic support and holistic development mentorship.</p>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-purple-600 dark:bg-purple-800 text-white p-8 text-center mt-16">
        <p className="mb-2">Contact: <a href="mailto:vedanshimishra3124@gmail.com" className="underline hover:text-yellow-300">vedanshimishra3124@gmail.com</a></p>
        <div className="flex justify-center gap-6 mt-4 text-2xl">
          <a href="https://www.linkedin.com/in/vedanshi-mishra-315572280/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-transform transform hover:scale-110"><FaLinkedin /></a>
          <a href="https://leetcode.com/u/vemigod/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-transform transform hover:scale-110"><SiLeetcode /></a>
          <a href="https://codeforces.com/profile/vemigod" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-transform transform hover:scale-110"><SiCodeforces /></a>
          <a href="https://github.com/Vedanshimishra" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-transform transform hover:scale-110"><FaGithub /></a>
        </div>
      </footer>

      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-transform transform hover:scale-110"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
