import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formType, setFormType] = useState("home");
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const renderForm = () => {
    switch (formType) {
      case "register":
        return <RegisterForm />;
      case "login":
        return <LoginForm />;
      case "appointment":
        return <AppointmentForm addAppointment={addAppointment} />;
      case "viewAppointments":
        return <ViewAppointments appointments={appointments} />;
      case "prescriptions":
        return <Prescriptions />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <AnimatedBackground />

      <TopBar />
      <div className="shell">
        <Sidebar setFormType={setFormType} active={formType} />
        <div className="content">
          <Header />
          <main className="main-content fade-in">{renderForm()}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const AnimatedBackground = () => (
  <div className="background">
    <div className="blob b1" />
    <div className="blob b2" />
    <div className="grid-overlay" />
  </div>
);

const TopBar = () => (
  <div className="topbar glass">
    <div className="brand">
      <span className="brand-badge">🏥</span>
      <span className="brand-text">Patient Tracker</span>
    </div>

    <div className="signature">
      <span className="sig-pre">by</span>
      <span className="sig-name" title="SUBODH ARYAN">SUBODH ARYAN</span>
    </div>
  </div>
);

const Sidebar = ({ setFormType, active }) => (
  <aside className="sidebar glass">
    <div className="sidebar-title">Dashboard</div>
    <nav className="nav">
      <SideBtn label="Home" active={active === "home"} onClick={() => setFormType("home")} icon="🏠" />
      <SideBtn label="Register" active={active === "register"} onClick={() => setFormType("register")} icon="📝" />
      <SideBtn label="Login" active={active === "login"} onClick={() => setFormType("login")} icon="🔐" />
      <SideBtn label="Book" active={active === "appointment"} onClick={() => setFormType("appointment")} icon="📅" />
      <SideBtn label="Appointments" active={active === "viewAppointments"} onClick={() => setFormType("viewAppointments")} icon="📋" />
      <SideBtn label="Prescriptions" active={active === "prescriptions"} onClick={() => setFormType("prescriptions")} icon="💊" />
    </nav>
  </aside>
);

const SideBtn = ({ label, icon, active, onClick }) => (
  <button className={`side-btn ${active ? "active" : ""}`} onClick={onClick}>
    <span className="ic">{icon}</span>
    <span className="tx">{label}</span>
    <span className="chev">›</span>
  </button>
);

const Header = () => (
  <header className="header">
    <h1>Patient Medicine & Appointment Tracker</h1>
    <p className="subtitle">Manage appointments and prescriptions with a sleek, modern interface.</p>
  </header>
);

const Footer = () => (
  <footer className="footer glass">
    <p>© 2025 Patient Tracker · Crafted by <span className="sig-inline">SUBODH ARYAN</span></p>
  </footer>
);

const Home = () => (
  <section className="card hero">
    <h2>Welcome</h2>
    <p>All health essentials in one place—book, track, and manage with ease.</p>
    <div className="hero-stats">
      <div className="stat">
        <div className="stat-num">24/7</div>
        <div className="stat-tx">Access</div>
      </div>
      <div className="stat">
        <div className="stat-num">+99%</div>
        <div className="stat-tx">Uptime</div>
      </div>
      <div className="stat">
        <div className="stat-num">Secure</div>
        <div className="stat-tx">Data</div>
      </div>
    </div>
  </section>
);

const RegisterForm = () => (
  <form className="form card">
    <h2>Create Account</h2>
    <div className="grid-2">
      <FormField label="Name" type="text" required />
      <FormField label="Email" type="email" required />
      <FormField label="Password" type="password" required />
      <FormField label="Age" type="number" required />
      <div className="field">
        <label>Gender</label>
        <select className="input">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <FormField label="Contact" type="tel" required />
    </div>
    <button type="submit" className="btn-primary">Create Account</button>
  </form>
);

const LoginForm = () => (
  <form className="form card">
    <h2>Login</h2>
    <FormField label="Email" type="email" required />
    <FormField label="Password" type="password" required />
    <button type="submit" className="btn-primary">Login</button>
  </form>
);

const FormField = ({ label, type = "text", required }) => (
  <div className="field">
    <label>{label}</label>
    <input className="input" type={type} required={required} />
  </div>
);

const AppointmentForm = ({ addAppointment }) => {
  const [formData, setFormData] = useState({ doctor: "", date: "", time: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment(formData);
    setFormData({ doctor: "", date: "", time: "" });
    alert("Appointment booked successfully!");
  };

  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <div className="grid-3">
        <div className="field">
          <label>Doctor</label>
          <input
            className="input"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            placeholder="Dr. Sharma"
          />
        </div>
        <div className="field">
          <label>Date</label>
          <input
            className="input"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Time</label>
          <input
            className="input"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn-primary">Book Now</button>
    </form>
  );
};

const ViewAppointments = ({ appointments }) => (
  <div className="card">
    <h2>Your Appointments</h2>
    <table className="appointment-table">
      <thead>
        <tr>
          <th>Doctor</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {appointments.length === 0 ? (
          <tr>
            <td colSpan="3" className="empty">No appointments yet.</td>
          </tr>
        ) : (
          appointments.map((a, i) => (
            <tr key={i}>
              <td>{a.doctor}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const Prescriptions = () => (
  <div className="card">
    <h2>Your Prescriptions</h2>
    <p>Prescriptions will be shown here.</p>
    <div className="pill-list">
      <div className="pill glass">Amoxicillin 500mg</div>
      <div className="pill glass">Metformin 850mg</div>
      <div className="pill glass">Atorvastatin 20mg</div>
    </div>
  </div>
);

export default App;
