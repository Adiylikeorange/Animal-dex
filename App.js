// src/App.js
import React, { useState } from "react";
import "./App.css";
import { ANIMALS } from "./animalsData";

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // Get unique types from animals (Mammal, Bird, Fish, etc.)
  const types = ["All", ...new Set(ANIMALS.map((a) => a.type))];

  // Filter animals based on search and type
  const filteredAnimals = ANIMALS.filter((animal) => {
    const matchesName = animal.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesType =
      selectedType === "All" || animal.type === selectedType;
    return matchesName && matchesType;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐾 AnimalDex</h1>
        <p>A simple Pokédex-style viewer for animals</p>
      </header>

      <section className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="type-select"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </section>

      <main className="main-content">
        <section className="grid">
          {filteredAnimals.length === 0 ? (
            <p className="empty-text">No animals found.</p>
          ) : (
            filteredAnimals.map((animal) => (
              <div
                key={animal.id}
                className={
                  "card" +
                  (selectedAnimal && selectedAnimal.id === animal.id
                    ? " card-selected"
                    : "")
                }
                onClick={() => setSelectedAnimal(animal)}
              >
                <div className="card-emoji">{animal.emoji}</div>
                <h2 className="card-title">{animal.name}</h2>
                <p className="card-subtitle">{animal.type}</p>
                <p className="card-habitat">{animal.habitat}</p>
              </div>
            ))
          )}
        </section>

        <section className="details">
          {selectedAnimal ? (
            <>
              <h2>
                {selectedAnimal.emoji} {selectedAnimal.name}
              </h2>
              <p>
                <strong>Type:</strong> {selectedAnimal.type}
              </p>
              <p>
                <strong>Habitat:</strong> {selectedAnimal.habitat}
              </p>
              <p>
                <strong>Diet:</strong> {selectedAnimal.diet}
              </p>
              <p>
                <strong>Fun Fact:</strong> {selectedAnimal.fact}
              </p>
            </>
          ) : (
            <p className="details-placeholder">
              ➤ Click an animal card to see more details here.
            </p>
          )}
        </section>
      </main>

      <footer className="footer">
        Made with React · Local temporary project (npm start)
      </footer>
    </div>
  );
}

export default App;
