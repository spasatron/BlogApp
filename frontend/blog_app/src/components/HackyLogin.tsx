import { useState } from "react";
import { useUser } from "../contexts/UserContext";

function HackyLogin() {
  const { login } = useUser();
  const [formData, setFormData] = useState("");

  const loginWithToken = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };

  return (
    <div>
      <form onSubmit={loginWithToken}>
        <input type="text" value={formData} onChange={handleChange}></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default HackyLogin;
