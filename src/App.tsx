import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
// Comment for test
import {
  Music,
  Headphones,
  Mic,
  Users,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    "./src/images/2.jpg",
    "./src/images/new2.jpg",
    "./src/images/4.jpg",
    "./src/images/6.jpg",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Loading Animation
      const tl = gsap.timeline();
      tl.to(".loading-bar", {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      }).to(loadingRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (loadingRef.current) {
            loadingRef.current.style.display = "none";
          }
        },
      });

      // Hero Animations
      gsap.set(".hero-title", { y: 100, opacity: 0 });
      gsap.set(".hero-subtitle", { y: 50, opacity: 0 });
      gsap.set(".hero-cta", { y: 30, opacity: 0 });

      gsap.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 2.5,
        ease: "power3.out",
      });

      gsap.to(".hero-subtitle", {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 2.8,
        ease: "power3.out",
      });

      gsap.to(".hero-cta", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 3.1,
        ease: "power3.out",
      });

      // Floating Animation for DJ Equipment
      gsap.to(".floating-element", {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Scroll Triggered Animations
      gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
        gsap.fromTo(
          element,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Service Cards Hover Animation
      gsap.utils.toArray(".service-card").forEach((card: any) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

      // Parallax Background
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Music Visualizer Animation
      gsap.to(".visualizer-bar", {
        scaleY: () => gsap.utils.random(0.3, 1.5),
        duration: 0.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.1,
          repeat: -1,
        },
      });

      // Image Slider Auto-play
      const slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);

      // Slider animations
      gsap.utils.toArray(".slider-image").forEach((img: any, index) => {
        gsap.set(img, { opacity: index === 0 ? 1 : 0 });
      });

      return () => clearInterval(slideInterval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.utils.toArray(".slider-image").forEach((img: any, index) => {
      if (index === currentSlide) {
        gsap.to(img, { opacity: 1, duration: 1, ease: "power2.inOut" });
      } else {
        gsap.to(img, { opacity: 0, duration: 1, ease: "power2.inOut" });
      }
    });
  }, [currentSlide]);
  //   gsap.to(".dj-logo", {
  //     opacity: 1,
  //     scale: 1,
  //     duration: 1.2,
  //     ease: "elastic.out(1, 0.5)",
  //     delay: 2.2,
  //     rotate: 360,
  //     boxShadow: "0px 0px 40px 10px #a855f7",
  //   });
  // }, []);

  return (
    <div
      ref={containerRef}
      className='bg-black text-white'
    >
      {/* Loading Screen */}
      <div
        ref={loadingRef}
        className='fixed inset-0 bg-black z-50 flex items-center justify-center'
      >
        <div className='text-center'>
          <div className='mb-8'>
            <Music className='w-16 h-16 text-purple-500 mx-auto animate-pulse' />
          </div>
          <div className='w-64 h-2 bg-gray-800 rounded-full overflow-hidden'>
            <div className='loading-bar h-full bg-gradient-to-r from-purple-500 to-cyan-500 w-0'></div>
          </div>
          <p className='mt-4 text-gray-400'>
            Loading Dj <span style={{ color: "E43636" }}>R</span>ks
            Studio/Academy...
          </p>
        </div>
      </div>

      {/* Image Slider Section */}
      <section className='relative h-screen overflow-hidden flex items-center justify-center'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className='slider-image absolute inset-0 h-full'
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className='absolute inset-0 bg-black/30'></div>
            <img
              src={slide}
              alt={`slide-${index + 1}`}
              className='w-full h-full object-cover opacity-0'
              draggable={false}
            />
          </div>
        ))}

        {/* Navigation Dots */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className='relative min-h-screen flex items-center justify-center overflow-hidden'
      >
        {/* Animated Background */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_50%)]'></div>

        {/* Floating Elements */}
        <div className='absolute top-20 left-10 floating-element'>
          <Headphones className='w-12 h-12 text-purple-400 opacity-30' />
        </div>
        <div
          className='absolute top-40 right-20 floating-element'
          style={{ animationDelay: "1s" }}
        >
          <Mic className='w-10 h-10 text-cyan-400 opacity-30' />
        </div>
        <div
          className='absolute bottom-40 left-20 floating-element'
          style={{ animationDelay: "2s" }}
        >
          <Music className='w-14 h-14 text-purple-500 opacity-30' />
        </div>

        <div className='relative z-10 text-center max-w-4xl mx-auto px-6'>
          <h1 className='hero-title text-2xl md:text-6xl font-bold mb-8'>
            <span className='bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent'>
              DJ RKS STUDIO/ACADEMY
            </span>
            <br />
            <span className='text-white text-sm md:text-3xl'>
              SAMBALPUR & BHUBANESWAR
            </span>
          </h1>
          <p className='hero-subtitle text-sm md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto'>
            "From Studio to Stage - Your Journey Starts Here..."
          </p>
          <a
            href='#ourCourse'
            className='hero-cta bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105'
          >
            Enroll Now
          </a>
        </div>

        {/* Music Visualizer */}
        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='visualizer-bar w-1 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full'
              style={{ height: Math.random() * 40 + 10 }}
            ></div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        className='py-20 px-6 relative'
        style={{
          backgroundImage: `url(${"./src/images/20.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className='max-w-6xl mx-auto'>
          <div className='animate-on-scroll text-center mb-16'>
            <div className='img-cent w-96 mx-auto flex flex-col items-center mb-10'>
              <img
                src='./src/images/11.png'
                alt='Dj Rks Logo'
              />
              <span className='text-slate-900 md:text-white text-xl md:text-2xl mb-5'>
                Course Director & Head Faculty, DJ & Music Producer
              </span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <span className='bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent'>
                About
              </span>
            </h2>
            <p className='text-xl text-gray-800 md:text-white bg-transparent max-w-3xl mx-auto'>
              With a passion born on the dancefloor and over 6 years of
              experience behind the decks, DJ RKS become a name synonymous with
              energy, excellence, and unmatched musical vibe. From electrifying
              college fests and high-end weddings to mentoring aspiring DJs, DJ
              RKS blends technical skill with pure passion. His unique sets,
              powerful remixes, and deep connection with the crowd make every
              event unforgettable. As the founder of DJ RKS Studio & Academy in
              Sambalpur & Bhubaneswar, he’s not only creating music but also
              shaping the next generation of DJs.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='animate-on-scroll text-center'>
              <div className='w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Users className='w-10 h-10' />
              </div>
              <h3 className='text-2xl font-bold mb-4'>500+ Events</h3>
              <p className='text-gray-400'>
                Successfully managed weddings, corporate events, and parties
              </p>
            </div>
            <div className='animate-on-scroll text-center'>
              <div className='w-20 h-20 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Music className='w-10 h-10' />
              </div>
              <h3 className='text-2xl font-bold mb-4'>
                Proffesional DJ Course
              </h3>
              <p className='text-gray-400'>
                Extensive library spanning all genres
              </p>
            </div>
            <div className='animate-on-scroll text-center'>
              <div className='w-20 h-20 bg-gradient-to-br from-pink-600 to-pink-800 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Headphones className='w-10 h-10' />
              </div>
              <h3 className='text-2xl font-bold mb-4'>Premium Equipment</h3>
              <p className='text-gray-400'>
                State-of-the-art sound systems and lighting equipment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Card Section */}

      {/* Course Cards Section */}
      <section
        id='ourCourse'
        className='py-20 px-6 bg-black/70'
      >
        <div className='max-w-6xl mx-auto'>
          <div className='animate-on-scroll text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                Our Courses
              </span>
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Choose the perfect DJ course for your journey, from beginner to
              expert.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {/* Digital Course Card */}
            <div className='animate-on-scroll bg-gradient-to-br from-purple-900/60 to-cyan-900/60 border border-cyan-500/30 rounded-2xl p-8 shadow-lg flex flex-col items-center'>
              <h3 className='text-2xl font-bold mb-4 text-cyan-400'>
                Digital DJ Course
              </h3>
              <ul className='text-gray-300 mb-6 list-disc list-inside text-left'>
                <li>Introduction of Softwares</li>
                <li>Connections & Diagram</li>
                <li>Software Interface Details</li>
                <li>Learn how to export music to USB</li>
                <li>Learn how to make Playlists</li>
                <li>Session, Practices, Lots of Practice</li>
                <li>Exam and Certificate</li>
              </ul>
            </div>

            {/* Basic Course Card */}
            <div className='animate-on-scroll bg-gradient-to-br from-gray-900/60 to-gray-800/60 border border-purple-500/30 rounded-2xl p-8 shadow-lg flex flex-col items-center'>
              <h3 className='text-2xl font-bold mb-4 text-purple-400'>
                Basic DJ Course
              </h3>
              <ul className='text-gray-300 mb-6 list-disc list-inside text-left'>
                <li>Introduction of Djing</li>
                <li>Introduction of Equipments</li>
                <li>Music Genres</li>
                <li>BPM & Cueing</li>
                <li>Song Structure & Beat / Bar Matching</li>
                <li>Mixing & Effects</li>
                <li>Looping & Micing</li>
                <li>Exam and Certificate</li>
              </ul>
            </div>

            {/* Advance Course Card */}
            <div className='animate-on-scroll bg-gradient-to-br from-pink-900/60 to-purple-900/60 border border-pink-500/30 rounded-2xl p-8 shadow-lg flex flex-col items-center'>
              <h3 className='text-2xl font-bold mb-4 text-pink-400'>
                Advance DJ Course
              </h3>
              <ul className='text-gray-300 mb-6 list-disc list-inside text-left'>
                <li>Introduction of Djing & Eqiupments</li>
                <li>Music Genres, BPM & Cueing</li>
                <li>Song Structure & Beat / Bar Matching</li>
                <li>Mixing & Effects</li>
                <li>Looping & Micing</li>
                <li>Digital Djing</li>
                <li>Making Sets</li>
                <li>Advance Djing</li>
                <li>Exam & Certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className='parallax-section py-20 px-6 relative overflow-hidden'>
        <div className='parallax-bg absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10'></div>
        <div className='relative z-10 max-w-6xl mx-auto'>
          <div className='animate-on-scroll text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <span className='bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                Our Services
              </span>
            </h2>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                title: "Wedding DJ",
                description:
                  "Complete wedding entertainment with ceremony, cocktail, and reception music",
                icon: <Music className='w-8 h-8' />,
              },
              {
                title: "Corporate Events",
                description:
                  "Professional DJ services for conferences, galas, and corporate parties",
                icon: <Users className='w-8 h-8' />,
              },
              {
                title: "Private Parties",
                description:
                  "Birthday parties, anniversaries, and intimate celebrations",
                icon: <Headphones className='w-8 h-8' />,
              },
              {
                title: "Sound & Lighting",
                description:
                  "Professional audio equipment and dynamic lighting setups",
                icon: <Mic className='w-8 h-8' />,
              },
              {
                title: "Live Mixing",
                description:
                  "Expert live mixing and beatmatching for seamless entertainment",
                icon: <Music className='w-8 h-8' />,
              },
              {
                title: "MC Services",
                description:
                  "Professional master of ceremonies to keep your event flowing",
                icon: <Mic className='w-8 h-8' />,
              },
            ].map((service, index) => (
              <div
                key={index}
                className='service-card animate-on-scroll bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300'
              >
                <div className='text-purple-400 mb-4'>{service.icon}</div>
                <h3 className='text-2xl font-bold mb-4'>{service.title}</h3>
                <p className='text-gray-400'>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {/* <section className='py-20 px-6 bg-gradient-to-b from-black to-gray-900'>
        <div className='max-w-6xl mx-auto'>
          <div className='animate-on-scroll text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                Recent Events
              </span>
            </h2>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              "Luxury Wedding at Grand Hotel",
              "Corporate Gala Night",
              "Birthday Bash Celebration",
              "Anniversary Party",
              "College Fest 2024",
              "New Year's Eve Party",
            ].map((event, index) => (
              <div
                key={index}
                className='animate-on-scroll bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300'
              >
                <div className='h-48 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl mb-4 flex items-center justify-center'>
                  <Music className='w-16 h-16 text-purple-400' />
                </div>
                <h3 className='text-xl font-bold mb-2'>{event}</h3>
                <p className='text-gray-400'>
                  An unforgettable night filled with music, energy, and dancing.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='animate-on-scroll text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <span className='bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                Get In Touch
              </span>
            </h2>
            <p className='text-xl text-gray-300'>
              Ready to make your event unforgettable? Let's discuss your needs!
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12'>
            <div className='animate-on-scroll'>
              <h3 className='text-2xl font-bold mb-6'>Contact Information</h3>
              <div className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center'>
                    <Phone className='w-6 h-6' />
                  </div>
                  <div>
                    <p className='font-semibold'>Phone</p>
                    <p className='text-gray-400'>+91 84800 91898</p>
                    <p className='text-gray-400'>+91 93371 91561</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-full flex items-center justify-center'>
                    <Mail className='w-6 h-6' />
                  </div>
                  <div>
                    <p className='font-semibold'>Email</p>
                    <p className='text-gray-400'>djrksstudio@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <h4 className='text-lg font-semibold mb-4'>Follow Us</h4>
                <div className='flex space-x-4'>
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform'>
                    <a href='https://www.instagram.com/djrks_studio?igsh=NDNsejM0ZXZyOWNj'>
                      <Instagram className='w-5 h-5' />
                    </a>
                  </div>
                  <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform'>
                    <a href='https://www.facebook.com/share/1F5m8S14XA/'>
                      <Facebook className='w-5 h-5' />
                    </a>
                  </div>
                  <div className='w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform'>
                    <a href='https://youtube.com/@djrks933?si=1cwbFo_Xeewy9fzP'>
                      <Youtube className='w-5 h-5' />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className='animate-on-scroll'>
              <form className='space-y-6'>
                <div>
                  <input
                    type='text'
                    placeholder='Your Name'
                    className='w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors'
                  />
                </div>
                <div>
                  <input
                    type='email'
                    placeholder='Your Email'
                    className='w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors'
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Event Date'
                    className='w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors'
                  />
                </div>
                <div>
                  <textarea
                    placeholder='Tell us about your event'
                    rows={4}
                    className='w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors resize-none'
                  ></textarea>
                </div>
                <button
                  type='submit'
                  className='w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02]'
                >
                  Send Message
                </button>
              </form>
            </div> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 px-6 border-t border-gray-800'>
        <div className='max-w-6xl mx-auto text-center'>
          <p className='text-gray-400'>
            © 2025 DJ Rohit Studio. All rights reserved. | Making events
            unforgettable since 2022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
