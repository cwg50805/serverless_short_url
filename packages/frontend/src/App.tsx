import { useState } from "react";

function App() {
  const [targetUrl, setTargetUrl] = useState("");
  const [processingUrl, setProcessingUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleClick = async () => {
    console.log(targetUrl);
    try {
      setProcessingUrl(targetUrl);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ long_url: targetUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortId); // Set the short URL
      } else {
        console.error("Failed to create short URL:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setProcessingUrl("");
    }
  };

  return (
    <>
      <h1>Generate short URL</h1>
      <div className="card">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter target URL"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
          />
          <button onClick={handleClick}>Create Short URL</button>
        </div>

        {processingUrl && <p>Processing URL: {processingUrl}</p>}
        {shortUrl && (
          <div className="url-container">
            <input
              type="text"
              value={`${import.meta.env.VITE_API_URL}/t/${shortUrl}`}
              readOnly
            />
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${import.meta.env.VITE_API_URL}/t/${shortUrl}`
                )
              }
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
