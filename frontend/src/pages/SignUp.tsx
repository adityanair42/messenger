import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { personIcon } from "../icons/personIcon";
import { lockIcon } from "../icons/lockIcon";
import { useRef } from "react";
import { BACKEND_URL } from "../config/BACKEND_URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function signup() {
    try {
      await axios.post(BACKEND_URL + "/signup", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      navigate("/login");
    } catch (error) {
      console.error("Signup failed");
    }
  }

  return (
    <div className="rounded-xl min-w-48 p-8">
      <div>
        <div className="flex justify-center py-6 text-3xl my-5 font-[600]">
          SIGN UP
        </div>
      </div>
      <Input reference={usernameRef} placeholder="Username" color="" startIcon={personIcon()} />
      <Input reference={passwordRef} placeholder="Password" color="" startIcon={lockIcon()} />
      <Button onClick={signup} text="SIGN UP" />
      <div className="text-center mt-4">
        <span className="text-gray-600">Already have an account? </span>
        <button onClick={() => navigate("/login")} className="text-black underline">
          Log in
        </button>
      </div>
    </div>
  );
}
