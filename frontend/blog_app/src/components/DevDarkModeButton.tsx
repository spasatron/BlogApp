import { useEffect, useState } from "react";

function DevDarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    // Update the body class when isDarkMode changes
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return <button onClick={toggleDarkMode}>Toggle Dark Mode</button>;
}

export default DevDarkModeButton;
