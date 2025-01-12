import React, { useState } from "react";

function SearchInterface() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // Simulate an API call
    const mockResults = [
      { id: 1, title: "Article 1", snippet: "Details about Article 1..." },
      { id: 2, title: "Article 2", snippet: "Details about Article 2..." },
    ];
    setResults(mockResults); // Replace with real API integration
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Knowledge Base Search</h2>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles..."
          className="border rounded px-4 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Search
        </button>
      </div>
      <ul>
        {results.map((result) => (
          <li key={result.id} className="mb-2">
            <h3 className="font-semibold">{result.title}</h3>
            <p>{result.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchInterface;
