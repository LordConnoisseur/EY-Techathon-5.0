import React from "react";

function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>
        <p>Agent: <strong>Nisha</strong></p>
        <p>Calls Today: <strong>25</strong></p>
      </div>
    </header>
  );
}

export default Header;
