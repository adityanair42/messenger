import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Signup } from "./pages/SignUp"
import { Login } from "./pages/LogIn"
import { Chats } from "./pages/chats"

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
