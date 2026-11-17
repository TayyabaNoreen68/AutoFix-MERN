
import { useEffect, useState } from "react";
import {
  getWelcomeMessage,
  signupUser,
  loginUser,
} from "./services/api";
import "./App.css";

const services = [
  {
    icon: "🔧",
    title: "General Repair",
    description: "Professional repair services to keep your vehicle running smoothly.",
    price: "Expert Service",
  },
  {
    icon: "🛢️",
    title: "Oil Change",
    description: "Keep your engine healthy with regular oil and filter replacement.",
    price: "Quick Service",
  },
  {
    icon: "🔍",
    title: "Car Inspection",
    description: "Complete vehicle inspection to identify problems before they grow.",
    price: "Full Checkup",
  },
  {
    icon: "🛞",
    title: "Tire Services",
    description: "Tire checking, replacement and maintenance for safer driving.",
    price: "Safety First",
  },
  {
    icon: "🔋",
    title: "Battery Service",
    description: "Battery testing and replacement to keep your car powered.",
    price: "Reliable Care",
  },
  {
    icon: "🚘",
    title: "Engine Service",
    description: "Professional engine diagnostics and maintenance solutions.",
    price: "Expert Care",
  },
];

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState("");
  const [authNotice, setAuthNotice] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    const fetchBackendMessage = async () => {
      try {
        const data = await getWelcomeMessage();
        setMessage(data);
      } catch (error) {
        setError("Backend connection is unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchBackendMessage();
  }, []);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthNotice("");
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  const closeAuth = () => {
    setAuthMode("");
    setAuthNotice("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setAuthNotice("");
    setAuthLoading(true);

    try {
      let response;

      if (authMode === "signup") {
        response = await signupUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
      } else {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      }

      localStorage.setItem("token", response.token);

      setAuthNotice(
        authMode === "signup"
          ? "Account created successfully!"
          : "Login successful!"
      );

    } catch (error) {
      setAuthNotice(error.message || "Something went wrong. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">A</span>
          <span>Auto<span>Fix</span></span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button
            className="login-btn"
            onClick={() => openAuth("login")}
          >
            Login
          </button>

          <button
            className="primary-btn nav-signup"
            onClick={() => openAuth("signup")}
          >
            Sign Up <span>→</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              YOUR TRUSTED CAR CARE PARTNER
            </div>

            <h1>
              Keep Your Car
              <br />
              <span>Running Perfectly.</span>
            </h1>

            <p className="hero-description">
              Reliable automotive services, expert mechanics and quality
              care. Everything your car needs, all in one place.
            </p>

            <div className="hero-buttons">
              <a href="#services" className="primary-btn">
                Explore Services <span>→</span>
              </a>

              <a href="#about" className="secondary-btn">
                Learn More
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <span>👨🏻</span>
                <span>👨🏽</span>
                <span>👩🏻</span>
              </div>

              <div>
                <strong>Quality Car Care</strong>
                <small>Professional service you can trust</small>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-circle circle-one"></div>
            <div className="visual-circle circle-two"></div>

            <div className="floating-card top-card">
              <span className="floating-icon">🛠️</span>
              <div>
                <strong>Expert Mechanics</strong>
                <small>Professional Care</small>
              </div>
            </div>

            <div className="car-illustration">
              <div className="car-glow"></div>
              <span className="car-emoji">🚘</span>
            </div>

            <div className="floating-card bottom-card">
              <span className="check-icon">✓</span>
              <div>
                <strong>Quality Assured</strong>
                <small>Your car is in safe hands</small>
              </div>
            </div>

            <div className="visual-label">AUTO CARE REDEFINED</div>
          </div>
        </section>

        <section className="features-strip">
          <div className="feature-item">
            <span>🔧</span>
            <div>
              <strong>Expert Mechanics</strong>
              <small>Skilled professionals</small>
            </div>
          </div>

          <div className="feature-item">
            <span>⚡</span>
            <div>
              <strong>Quick Service</strong>
              <small>Save your valuable time</small>
            </div>
          </div>

          <div className="feature-item">
            <span>🛡️</span>
            <div>
              <strong>Trusted Quality</strong>
              <small>Reliable car care</small>
            </div>
          </div>

          <div className="feature-item">
            <span>💬</span>
            <div>
              <strong>Customer Support</strong>
              <small>Here to help you</small>
            </div>
          </div>
        </section>

        <section className="services-section section" id="services">
          <div className="section-heading">
            <div className="eyebrow">WHAT WE OFFER</div>
            <h2>Our Professional <span>Services</span></h2>
            <p>
              From routine maintenance to major repairs, we provide
              comprehensive care for your vehicle.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <span className="service-tag">{service.price}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contact" className="service-link">
                  Get Service <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section section" id="about">
          <div className="about-visual">
            <div className="about-icon">🚗</div>
            <div className="about-sticker">
              <strong>AutoFix</strong>
              <span>DRIVE WITH CONFIDENCE</span>
            </div>
          </div>

          <div className="about-content">
            <div className="eyebrow">ABOUT AUTOFIX</div>
            <h2>
              We Care About
              <br />
              <span>Your Journey.</span>
            </h2>

            <p>
              AutoFix is designed to make vehicle maintenance simple,
              convenient and reliable. Our goal is to connect customers
              with quality automotive services.
            </p>

            <div className="about-points">
              <div><span>✓</span> Professional vehicle care</div>
              <div><span>✓</span> Reliable service solutions</div>
              <div><span>✓</span> Customer-focused experience</div>
            </div>

            <a href="#contact" className="primary-btn">
              Contact Us <span>→</span>
            </a>
          </div>
        </section>

        <section className="how-section section">
          <div className="section-heading">
            <div className="eyebrow">SIMPLE PROCESS</div>
            <h2>How It <span>Works</span></h2>
            <p>Getting your car serviced has never been easier.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon">📝</div>
              <h3>Choose a Service</h3>
              <p>Select the automotive service your vehicle needs.</p>
            </div>

            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon">📅</div>
              <h3>Contact Us</h3>
              <p>Get in touch with our team to discuss your requirements.</p>
            </div>

            <div className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon">🚘</div>
              <h3>Get Your Car Fixed</h3>
              <p>Get professional care and enjoy a smoother journey.</p>
            </div>
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div>
            <div className="eyebrow">LET'S GET STARTED</div>
            <h2>Your Car Deserves the Best Care.</h2>
            <p>Get in touch with AutoFix and take care of your vehicle.</p>
          </div>

          <button
            className="cta-button"
            onClick={() => openAuth("signup")}
          >
            Get Started <span>→</span>
          </button>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-icon">A</span>
          <span>Auto<span>Fix</span></span>
        </a>

        <p>Making every journey better, one service at a time.</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="backend-status">
          <span className={`status-dot ${error ? "offline" : loading ? "checking" : "online"}`}></span>
          {loading
            ? "Connecting to Backend..."
            : error
              ? "Backend Offline"
              : "Backend Connected"}
        </div>

        {message && (
          <small className="backend-message">
            API Response: {message}
          </small>
        )}

        <div className="footer-bottom">
          © {new Date().getFullYear()} AutoFix. All rights reserved.
        </div>
      </footer>

      {authMode && (
        <div className="modal-overlay" onClick={closeAuth}>
          <div
            className="auth-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeAuth}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-brand">
              <span className="brand-icon">A</span>
              AutoFix
            </div>

            <h2>
              {authMode === "login" ? "Welcome Back!" : "Create Your Account"}
            </h2>

            <p>
              {authMode === "login"
                ? "Login to continue with AutoFix."
                : "Join AutoFix for better vehicle care."}
            </p>

            <form onSubmit={handleAuthSubmit}>
              {authMode === "signup" && (
                <>
                  <label>
                    Full Name
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </label>

                  <label>
                    Phone Number
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </>
              )}

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength="6"
                  required
                />
              </label>

              <button
                className="primary-btn auth-submit"
                type="submit"
                disabled={authLoading}
              >
                {authLoading
                  ? "Please wait..."
                  : authMode === "login"
                    ? "Login →"
                    : "Create Account →"}
              </button>
            </form>

            {authNotice && (
              <div className="auth-notice">
                {authNotice}
              </div>
            )}

            <div className="auth-switch">
              {authMode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={() =>
                  openAuth(authMode === "login" ? "signup" : "login")
                }
              >
                {authMode === "login" ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
