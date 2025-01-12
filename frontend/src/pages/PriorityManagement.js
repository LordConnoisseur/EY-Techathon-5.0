import React, { useState } from "react";

function PriorityManagement() {
  const [priorityQueue, setPriorityQueue] = useState([
    { caller: "Sundaresh", priority: "High" },
    { caller: "Afrin", priority: "Medium" },
  ]);

  const handlePriorityChange = (index, newPriority) => {
    const updatedQueue = [...priorityQueue];
    updatedQueue[index].priority = newPriority;
    setPriorityQueue(updatedQueue);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Priority Management</h1>
      <ul className="space-y-4">
        {priorityQueue.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
          >
            <span>{item.caller}</span>
            <select
              value={item.priority}
              onChange={(e) => handlePriorityChange(index, e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriorityManagement;
