import { useState } from "react";
import "./Home.css";
import About from "./About";
import Faq from "./Faq";
import Account from "./Account";
import EmergencyAlert from "./EmergencyAlert";
import EmergencyContacts from "./EmergencyContacts";
import NotificationsDropdown from "./NotificationsDropdown";
import logo from "./logoCrop2.png";
import logo2 from "./logo.png";

function Navbar({ activePage, setActivePage }) {
  const links = ["Home", "About", "F.A.Q", "Account"];

  return (
    <nav className="navbar">
      <img src={logo} alt="RideWatch Logo" style={{ width: "150px", height: "auto" }} />
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link}>
            <button
              className={`nav-link ${activePage === link ? "active" : ""}`}
              onClick={() => setActivePage(link)}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
      <NotificationsDropdown />
    </nav>
  );
}

function HomePage() {
  const [query, setQuery] = useState("");

  return (
    <main className="home-main">
      <div className="home-content">
        <div className="home-left">
          <h1 className="home-heading">
            Start your safe journey here at RideWatch
          </h1>
          <p className="home-subtext">
            Safe rides begin with one step. Let's get you started.
          </p>
          <div className="search-section">
            <p className="search-label">Decided on where you're headed?</p>
            <div className="search-row">
              <div className="search-input-wrap">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search for routes"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <button className="btn-search">Search</button>
            </div>
            <button className="btn-routes">Routes</button>
          </div>
        </div>
        <div className="home-right">
  <div className="hero-card">
    <img src={logo2} alt="Home Logo" style={{ width: "100%", maxWidth: "400px", height: "auto" }} />
  </div>
  </div>
      </div>
    </main>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home":               return <HomePage />;
      case "About":              return <About />;
      case "F.A.Q":             return <Faq />;
      case "Account":            return <Account setActivePage={setActivePage} />;
      case "EmergencyContacts":  return <EmergencyContacts onBack={() => setActivePage("Account")} />;
      default:                   return <HomePage />;
    }
  };

  return (
    <div className="home-page">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
      <EmergencyAlert />
    </div>
  );
}