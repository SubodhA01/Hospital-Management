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
      <Header setFormType={setFormType} />
      <main className="main-content">{renderForm()}</main>
      <Footer />
    </div>
  );
};

const Header = ({ setFormType }) => (
  <header className="header">
    <h1>Patient Medicine & Appointment Tracker</h1>
    <nav>
      <button onClick={() => setFormType("home")}>Home</button>
      <button onClick={() => setFormType("register")}>Register</button>
      <button onClick={() => setFormType("login")}>Login</button>
      <button onClick={() => setFormType("appointment")}>Book Appointment</button>
      <button onClick={() => setFormType("viewAppointments")}>View Appointments</button>
      <button onClick={() => setFormType("prescriptions")}>Prescriptions</button>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2025 Patient Medicine & Appointment Tracker</p>
  </footer>
);

const Home = () => (
  <section className="home">
    <h2>Welcome to the Patient Tracker</h2>
    <p>Easily manage your appointments and prescriptions.</p>
  </section>
);

const RegisterForm = () => (
  <form className="form">
    <h2>Register</h2>
    <label>
      Name: <input type="text" required />
    </label>
    <label>
      Email: <input type="email" required />
    </label>
    <label>
      Password: <input type="password" required />
    </label>
    <label>
      Age: <input type="number" required />
    </label>
    <label>
      Gender:
      <select>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </label>
    <label>
      Contact: <input type="tel" required />
    </label>
    <button type="submit">Submit</button>
  </form>
);

const LoginForm = () => (
  <form className="form">
    <h2>Login</h2>
    <label>
      Email: <input type="email" required />
    </label>
    <label>
      Password: <input type="password" required />
    </label>
    <button type="submit">Login</button>
  </form>
);

const AppointmentForm = ({ addAppointment }) => {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment(formData);
    setFormData({ doctor: "", date: "", time: "" }); // Reset form
    alert("Appointment booked successfully!");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <label>
        Doctor: <input type="text" name="doctor" value={formData.doctor} onChange={handleChange} required />
      </label>
      <label>
        Date: <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>
      <label>
        Time: <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      </label>
      <button type="submit">Book</button>
    </form>
  );
};

const ViewAppointments = ({ appointments }) => (
  <div className="appointments">
    <h2>Your Appointments</h2>
    <table>
      <thead>
        <tr>
          <th>Doctor</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={index}>
            <td>{appointment.doctor}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Prescriptions = () => (
  <div className="prescriptions">
    <h2>Your Prescriptions</h2>
    <p>Prescriptions will be shown here.</p>
  </div>
);

export default App;
