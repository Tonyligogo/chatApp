import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute>
                <HomePage />
              </ProtectedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
