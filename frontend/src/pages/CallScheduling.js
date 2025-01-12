import React, { useState } from "react";

function CallScheduling() {
  const [schedule, setSchedule] = useState({ caller: "", time: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API integration for scheduling a call
    console.log("Scheduled Call:", schedule);
    alert("Call scheduled successfully!");
    setSchedule({ caller: "", time: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Call Scheduling</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Caller Name</label>
          <input
            type="text"
            value={schedule.caller}
            onChange={(e) => setSchedule({ ...schedule, caller: e.target.value })}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Schedule Time</label>
          <input
            type="datetime-local"
            value={schedule.time}
            onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Schedule Call
        </button>
      </form>
    </div>
  );
}

export default CallScheduling;
