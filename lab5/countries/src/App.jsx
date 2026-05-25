import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => {
        console.log("✅ TOTAL COUNTRIES LOADED:", res.data.length);
        setCountries(res.data);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🌍 Country Information</h1>
        <input
          style={styles.input}
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredCountries.length === 0 && search !== "" && (
          <p style={styles.message}>No countries match your search.</p>
        )}

        {filteredCountries.length === 1 && (
          <div style={styles.countryCard}>
            <img src={filteredCountries[0].flags.png} style={styles.flag} alt={filteredCountries[0].name.common} />
            <h2>{filteredCountries[0].name.common}</h2>
            <p><strong>Region:</strong> {filteredCountries[0].region}</p>
            <p><strong>Population:</strong> {filteredCountries[0].population.toLocaleString()}</p>
            <p><strong>Capital:</strong> {filteredCountries[0].capital?.[0] || "N/A"}</p>
          </div>
        )}

        {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
          <ul style={styles.list}>
            {filteredCountries.map((c) => (
              <li key={c.cca3} style={styles.listItem} onClick={() => setSelected(c)}>
                {c.name.common}
              </li>
            ))}
          </ul>
        )}

        {filteredCountries.length > 10 && (
          <p style={styles.message}>Too many matches, specify another filter.</p>
        )}

        {selected && (
          <div style={styles.modalOverlay} onClick={() => setSelected(null)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <img src={selected.flags.png} style={styles.modalFlag} alt={selected.name.common} />
              <h2>{selected.name.common}</h2>
              <p><strong>Region:</strong> {selected.region}</p>
              <p><strong>Population:</strong> {selected.population.toLocaleString()}</p>
              <p><strong>Capital:</strong> {selected.capital?.[0] || "N/A"}</p>
              <button style={styles.closeButton} onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #dbeafe, #eff6ff, #bfdbfe)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: { maxWidth: "600px", margin: "0 auto" },
  title: { textAlign: "center", fontSize: "2.5rem", marginBottom: "20px", color: "#1e3a8a" },
  input: { width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "1rem", marginBottom: "20px" },
  countryCard: { background: "white", padding: "20px", borderRadius: "20px", textAlign: "center", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" },
  flag: { width: "150px", borderRadius: "10px", marginBottom: "15px" },
  list: { listStyle: "none", padding: 0 },
  listItem: { padding: "10px", borderBottom: "1px solid #ddd", cursor: "pointer" },
  message: { textAlign: "center", color: "#dc2626", marginTop: "20px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modalContent: { background: "white", padding: "20px", borderRadius: "20px", width: "300px", textAlign: "center" },
  modalFlag: { width: "100%", borderRadius: "10px" },
  closeButton: { marginTop: "15px", padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }
};

export default App;