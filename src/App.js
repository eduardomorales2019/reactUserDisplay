import "./index.css";
import React, { useState, useEffect } from "react";

// We have to create States for Proyect.

function App() {
  const [loading, setLoading] = useState(false);
  const [people, setpeople] = useState(null);
  const [title, setTitle] = useState("name");

  const [value, setValue] = useState("random Person");

  return (
    <div>
      <h1>Person display App </h1>
    </div>
  );
}

export default App;
