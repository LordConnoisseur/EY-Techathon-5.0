import React, { useState, useEffect } from "react";

function ClientInteractionHistory() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    // Mock API call to fetch interaction history
    const fetchInteractions = async () => {
      const data = [
        { id: 1, client: "Sundaresh", date: "2025-01-10", type: "Call", status: "Resolved" },
        { id: 2, client: "Afrin", date: "2025-01-09", type: "Chat", status: "Pending" },
      ];
      setInteractions(data);
    };

    fetchInteractions();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client Interaction History</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Client</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction) => (
            <tr key={interaction.id}>
              <td className="px-4 py-2">{interaction.client}</td>
              <td className="px-4 py-2">{interaction.date}</td>
              <td className="px-4 py-2">{interaction.type}</td>
              <td className="px-4 py-2">{interaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientInteractionHistory;
