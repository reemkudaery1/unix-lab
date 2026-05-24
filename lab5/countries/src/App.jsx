import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then((res) => {
        console.log("✅ TOTAL COUNTRIES LOADED:", res.data.length);
        setCountries(res.data);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const getFlag = (country) => {
    if (country.name.common === "Syria") {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Syria.svg/512px-Flag_of_Syria.svg.png";
    }
    return country.flags.png;
  };

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const filteredCountries = countries.filter((c) => {
    const matchesSearch = c.name.common.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === "All" || c.region === region;
    return matchesSearch && matchesRegion;
  });

  const stats = {
    total: countries.length,
    europe: countries.filter((c) => c.region === "Europe").length,
    asia: countries.filter((c) => c.region === "Asia").length,
    africa: countries.filter((c) => c.region === "Africa").length,
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🌍 Atlas Dashboard</h1>
        <p style={styles.subtitle}>Explore all countries of the world</p>

        <div style={styles.statsRow}>
          <div style={styles.statCard}>Total<br />{stats.total}</div>
          <div style={styles.statCard}>Europe<br />{stats.europe}</div>
          <div style={styles.statCard}>Asia<br />{stats.asia}</div>
          <div style={styles.statCard}>Africa<br />{stats.africa}</div>
        </div>

        <div style={styles.controls}>
          <input
            style={styles.input}
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            style={styles.input}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option>All</option>
            <option>Africa</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Americas</option>
            <option>Oceania</option>
          </select>
        </div>

        <div style={styles.grid}>
          {filteredCountries.length === 0 && (
            <p style={styles.message}>No countries match your search.</p>
          )}
          {filteredCountries.map((country) => (
            <div
              key={country.cca3}
              style={styles.card}
              onClick={() => setSelected(country)}
            >
              <img src={getFlag(country)} style={styles.flag} alt={country.name.common} />
              <h3 style={styles.countryName}>{country.name.common}</h3>
              <p>🌎 {country.region}</p>
              <button
                style={styles.favButton}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(country.name.common);
                }}
              >
                {favorites.includes(country.name.common) ? "❤️ Saved" : "🤍 Save"}
              </button>
            </div>
          ))}
        </div>

        {selected && (
          <div style={styles.modalOverlay} onClick={() => setSelected(null)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <img src={getFlag(selected)} style={styles.modalFlag} alt={selected.name.common} />
              <h2>{selected.name.common}</h2>
              <p><strong>Region:</strong> {selected.region}</p>
              <p><strong>Population:</strong> {selected.population.toLocaleString()}</p>
              <p><strong>Capital:</strong> {selected.capital?.[0] || "N/A"}</p>
              <button style={styles.closeButton} onClick={() => setSelected(null)}>
                Close
              </button>
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
  container: { maxWidth: "1100px", margin: "0 auto" },
  title: { textAlign: "center", fontSize: "2.5rem", marginBottom: "0", color: "#1e3a8a" },
  subtitle: { textAlign: "center", marginBottom: "30px", color: "#4b5563" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "30px" },
  statCard: { background: "white", padding: "15px", borderRadius: "15px", textAlign: "center", fontWeight: "bold", boxShadow: "0 5px 10px rgba(0,0,0,0.05)" },
  controls: { display: "flex", gap: "15px", marginBottom: "30px" },
  input: { flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "1rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" },
  card: { background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", padding: "18px", borderRadius: "20px", boxShadow: "0 6px 14px rgba(0,0,0,0.08)", cursor: "pointer", transition: "0.2s" },
  flag: { width: "100%", height: "140px", objectFit: "cover", borderRadius: "12px", marginBottom: "12px" },
  countryName: { color: "#1e3a8a", marginBottom: "10px" },
  favButton: { marginTop: "10px", padding: "6px 12px", border: "none", borderRadius: "20px", background: "#e0f2fe", cursor: "pointer" },
  message: { textAlign: "center", marginBottom: "20px", color: "#dc2626", fontWeight: "bold" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modalContent: { background: "white", padding: "25px", borderRadius: "20px", width: "320px", textAlign: "center" },
  modalFlag: { width: "100%", borderRadius: "12px", marginBottom: "15px" },
  closeButton: { marginTop: "15px", padding: "10px 18px", border: "none", borderRadius: "10px", background: "#2563eb", color: "white", cursor: "pointer", fontSize: "1rem" }
};

export default App;