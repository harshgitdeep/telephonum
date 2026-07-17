import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Telephonum</h1>
      <p>AI-powered Conversation Intelligence Platform</p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;