import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import "../styles.css";

import heroOne from "../event1/f746d35c-22c6-4199-9f87-577b65ae9e1e.jfif";
import heroTwo from "../event1/526afd83-566a-420f-9d9f-002b45f5d762.jfif";
import heroThree from "../event1/96d2eabe-b55d-40fa-b27d-ab1f79b1001e.jfif";
import weddingImage from "../event1/20246b7b-2258-43aa-bfe2-1baa3f6869cf.jfif";
import showerImage from "../event1/a05748a9-0b98-447c-a6c9-887188d387f6.jfif";
import birthdayImage from "../event1/bb359b9d-97a7-484c-ad63-59ac3d24fa6a.jfif";
import privateImage from "../event1/15c82ae5-4390-4439-a539-476f9963bf3c.jfif";
import galleryOne from "../event1/ae3f7781-6903-4eb0-ac32-b31a7dabab39.jfif";
import galleryTwo from "../event1/b93c563d-12b9-4b42-9d37-ab055b7d5d63.jfif";

const slides = [
  {
    image: heroOne,
    label: "Wedding preparation",
    title: "Galah Events",
    body: "We prepare beautiful, polished celebrations across Rwanda with thoughtful decor, coordinated setup, and a calm team that makes the day feel effortless.",
    alt: "Elegant event table setup by Galah Events"
  },
  {
    image: heroTwo,
    label: "Bridal shower styling",
    title: "Soft, memorable rooms",
    body: "From floral backdrops to warm table details, every setup is shaped around the people being celebrated.",
    alt: "Floral celebration decor in Rwanda"
  },
  {
    image: heroThree,
    label: "Birthdays & private events",
    title: "Prepared with care",
    body: "We bring the pieces together, style the space, and keep the event day setup feeling smooth from start to finish.",
    alt: "Styled event preparation detail"
  }
];

const services = [
  {
    image: weddingImage,
    title: "Weddings",
    text: "Reception styling, ceremony backdrops, tables, florals, and guest areas.",
    alt: "Wedding reception styling"
  },
  {
    image: showerImage,
    title: "Bridal Showers",
    text: "Soft, photogenic setups for intimate celebrations and gift moments.",
    alt: "Bridal shower decor setup"
  },
  {
    image: birthdayImage,
    title: "Birthdays",
    text: "Statement corners, cake tables, balloon accents, and themed decor.",
    alt: "Birthday event styling"
  },
  {
    image: privateImage,
    title: "Private Events",
    text: "Simple, elegant styling for dinners, proposals, family events, and parties.",
    alt: "Private event preparation"
  }
];

const gallery = [
  { image: heroTwo, alt: "Vertical floral event detail" },
  { image: heroOne, alt: "Galah Events table styling" },
  { image: galleryOne, alt: "Celebration decor detail" },
  { image: heroThree, alt: "Prepared event venue" },
  { image: galleryTwo, alt: "Styled party corner" },
  { image: birthdayImage, alt: "Decor setup with warm tones" }
];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const closeNav = () => setIsOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""} ${isOpen ? "is-open" : ""}`}>
      <a className="brand" href="#top" aria-label="Galah Events home" onClick={closeNav}>
        <span className="brand-mark">G</span>
        <span>
          <strong>Galah Events</strong>
          <small>Rwanda</small>
        </span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-nav"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`site-nav ${isOpen ? "is-open" : ""}`} id="site-nav">
        <a href="#services" onClick={closeNav}>Services</a>
        <a href="#gallery" onClick={closeNav}>Gallery</a>
        <a href="#process" onClick={closeNav}>Process</a>
        <a href="#quote" onClick={closeNav}>Request a Quote</a>
      </nav>
    </header>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5600);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <AnimatePresence mode="wait">
        <motion.div
          className="hero-slide"
          key={slide.image}
          initial={{ opacity: 0, x: 90, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -90, scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={slide.image}
            alt={slide.alt}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6.2, ease: "easeOut" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="eyebrow">{slide.label} in Rwanda</p>
            <h1 id="hero-title">{slide.title}</h1>
            <p>{slide.body}</p>
          </motion.div>
        </AnimatePresence>
        <div className="hero-actions">
          <a className="button primary" href="#quote">Get a Quote</a>
          <a className="button secondary" href="#gallery">View Gallery</a>
        </div>
        <div className="slide-controls" aria-label="Homepage slides">
          {slides.map((item, index) => (
            <button
              className={index === activeSlide ? "is-active" : ""}
              key={item.label}
              type="button"
              aria-label={`Show ${item.label}`}
              aria-current={index === activeSlide}
              onClick={() => setActiveSlide(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  useLenis();

  return (
    <>
      <Header />
      <main id="top">
        <Hero />

        <section className="intro section-pad" aria-labelledby="intro-title">
          <div>
            <p className="eyebrow">From empty space to memorable room</p>
            <h2 id="intro-title">Decor designed around your people, your story, and your venue.</h2>
          </div>
          <p>
            Inspired by luxury event decor houses, Galah Events keeps the experience focused:
            refined styling, reliable setup, and a small collection of services for private
            celebrations that deserve care from the first idea to the final candle.
          </p>
        </section>

        <section className="feature-strip" aria-label="Galah Events promises">
          <article>
            <span>01</span>
            <h3>We Deliver & Setup</h3>
            <p>Our team handles venue preparation, decor placement, and packdown support.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Custom Styling</h3>
            <p>Color palettes, tablescapes, florals, and backdrops shaped around your event.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Rwanda Based</h3>
            <p>Serving Kigali and nearby venues with local knowledge and flexible planning.</p>
          </article>
        </section>

        <section className="services section-pad" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">What we prepare</p>
            <h2 id="services-title">Focused services for life's warmest gatherings.</h2>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <motion.article
                className="service-card"
                key={service.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <img src={service.image} alt={service.alt} />
                <div>
                  <p>{String(index + 1).padStart(2, "0")}</p>
                  <h3>{service.title}</h3>
                  <span>{service.text}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="gallery section-pad" id="gallery" aria-labelledby="gallery-title">
          <div className="section-heading">
            <p className="eyebrow">Recent looks</p>
            <h2 id="gallery-title">A gallery of Galah Events preparations.</h2>
          </div>
          <div className="masonry">
            {gallery.map((item) => (
              <img src={item.image} alt={item.alt} key={item.alt} />
            ))}
          </div>
        </section>

        <section className="process section-pad" id="process" aria-labelledby="process-title">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2 id="process-title">A simple route from idea to event day.</h2>
          </div>
          <div className="timeline">
            <article>
              <span>Share the vision</span>
              <p>Tell us your event type, date, guest count, venue, and the mood you want guests to remember.</p>
            </article>
            <article>
              <span>Confirm the style</span>
              <p>We shape a focused decor direction with colors, key installations, and setup needs.</p>
            </article>
            <article>
              <span>Prepare the venue</span>
              <p>On the day, Galah Events delivers, styles, adjusts the details, and keeps the setup moving.</p>
            </article>
          </div>
        </section>

        <section className="quote" id="quote" aria-labelledby="quote-title">
          <div className="quote-image">
            <img src={showerImage} alt="Galah Events decorated celebration setup" />
          </div>
          <div className="quote-panel">
            <p className="eyebrow">Request a quote</p>
            <h2 id="quote-title">Let's prepare something beautiful.</h2>
            <p>
              Send your date, venue, and event type. We will help you choose the right
              decor pieces and setup plan for your celebration in Rwanda.
            </p>
            <form action="mailto:hello@galahevents.rw" method="post" encType="text/plain">
              <label>
                Name
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                Event Type
                <select name="event_type" required defaultValue="">
                  <option value="">Choose one</option>
                  <option>Wedding</option>
                  <option>Bridal Shower</option>
                  <option>Birthday</option>
                  <option>Private Event</option>
                </select>
              </label>
              <label>
                Event Date
                <input type="date" name="event_date" />
              </label>
              <label>
                Message
                <textarea name="message" rows="4" placeholder="Venue, guest count, colors, and anything you already know."></textarea>
              </label>
              <button className="button primary" type="submit">Send Request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a className="brand" href="#top" aria-label="Galah Events home">
            <span className="brand-mark">G</span>
            <span>
              <strong>Galah Events</strong>
              <small>Rwanda</small>
            </span>
          </a>
          <p>Wedding, bridal shower, birthday, and private event preparation in Rwanda.</p>
        </div>
        <div>
          <h2>Contact</h2>
          <a href="mailto:hello@galahevents.rw">hello@galahevents.rw</a>
          <span>Kigali, Rwanda</span>
        </div>
        <div>
          <h2>Navigate</h2>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#quote">Request a Quote</a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
