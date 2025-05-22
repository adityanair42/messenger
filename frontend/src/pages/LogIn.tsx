import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { personIcon } from "../icons/personIcon";
import { lockIcon } from "../icons/lockIcon";
import { useRef } from "react";
import { BACKEND_URL } from "../config/BACKEND_URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function login() {
    try {
      // Clear any existing token first
      localStorage.removeItem("token");
      
      const response = await axios.post(BACKEND_URL + "/login", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/chats", { replace: true });
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="rounded-xl min-w-48 p-8">
      <div>
        <div className="flex justify-center py-6 text-3xl my-5 font-[600]">
          LOG IN
        </div>
      </div>
      <Input reference={usernameRef} placeholder="Username" color="" startIcon={personIcon()} />
      <Input reference={passwordRef} placeholder="Password" color="" startIcon={lockIcon()}/>
      <Button onClick={login} text="LOG IN"></Button>
    </div>
  );
}
