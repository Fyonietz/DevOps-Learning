import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("Checking...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch("/api/v1/health");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        setStatus(data.status ?? "Healthy");
      } catch (error) {
        setStatus("Disconnected");
        console.error("Backend health check failed:", error);
      } finally {
        setLoading(false);
      }
    }

    checkBackend();
  }, []);

  return (
    <main>
      <h1>This is for DevOps CI/CD integration (Success)</h1>

      <h1>
        Backend Status: {loading ? "Checking..." : status}
      </h1>
    </main>
  );
}
