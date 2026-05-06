import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Dashboard from "./component/dashboard/Dashboard";
import Chat from "./component/chat/Chat";
import ProtectedRoute from "./component/auth/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;