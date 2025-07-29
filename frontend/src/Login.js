import React, { useState } from "react";
import { useUser } from "./UserContext";

export default function Login() {
  const [userId, setUserId] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Manager/SignIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userId)
    });
    const data = await res.json();
    if (data.userId) {
      setUser({
        userId: data.userId,
        userType: data.userType,
        firstName: data.firstName,
        lastName: data.lastName
      });
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      window.location.href = data.redirectUrl;
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your ID:
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
}