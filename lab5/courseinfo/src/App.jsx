import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", category: "Family" });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => setContacts(res.data));
  }, []);

  const addOrUpdateContact = () => {
    if (!form.name || !form.phone) return;
    if (editingId) {
      axios.put(`http://localhost:3001/persons/${editingId}`, form).then((res) => {
        setContacts(contacts.map((c) => (c.id === editingId ? res.data : c)));
        setEditingId(null);
      });
    } else {
      axios.post("http://localhost:3001/persons", { ...form, id: Date.now() }).then((res) => {
        setContacts([...contacts, res.data]);
      });
    }
    setForm({ name: "", phone: "", email: "", category: "Family" });
  };

  const deleteContact = (id) => {
    axios.delete(`http://localhost:3001/persons/${id}`).then(() => {
      setContacts(contacts.filter((c) => c.id !== id));
    });
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Phone Book</h1>
        <p style={styles.subtitle}>Manage your contacts easily</p>

        {/* Add Contact Card */}
        <div style={styles.cardGlass}>
          <h3 style={styles.sectionTitle}>{editingId ? "Edit Contact" : "Add Contact"}</h3>
          <input style={styles.input} placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={styles.input} placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input style={styles.input} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select style={styles.input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Family</option>
            <option>Friends</option>
            <option>Work</option>
          </select>
          <button style={styles.addButton} onClick={addOrUpdateContact}>
            {editingId ? "Update Contact" : "Add Contact"} ➕
          </button>
        </div>

        {/* Search Bar */}
        <input style={styles.search} placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} />

        {/* Contacts List */}
        <div style={styles.list}>
          {filteredContacts.length === 0 ? (
            <p style={styles.empty}>No contacts added yet 📭</p>
          ) : (
            filteredContacts.map((c) => (
              <div key={c.id} style={styles.contactCard}>
                <div style={styles.avatar}>{c.name[0]}</div>
                <div style={styles.info}>
                  <div>👤 {c.name}</div>
                  <div>📞 {c.phone}</div>
                  <div>✉️ {c.email}</div>
                  <div>🏷️ {c.category}</div>
                </div>
                <div style={styles.actions}>
                  <button style={styles.edit} onClick={() => { setEditingId(c.id); setForm(c); }}>✏️</button>
                  <button style={styles.delete} onClick={() => deleteContact(c.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { background: "#eef5ff", minHeight: "100vh", display: "flex", justifyContent: "center", padding: "40px 20px" },
  container: { maxWidth: "800px", width: "100%" },
  title: { fontSize: "2.5rem", color: "#1e3a8a", marginBottom: "0", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#4b5563", marginBottom: "30px" },
  cardGlass: { background: "white", padding: "20px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", marginBottom: "30px" },
  sectionTitle: { fontSize: "1.2rem", marginBottom: "15px", color: "#1e3a8a" },
  input: { width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "#f9fafb" },
  addButton: { width: "100%", padding: "12px", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "white", border: "none", borderRadius: "40px", fontWeight: "bold", cursor: "pointer" },
  search: { width: "100%", padding: "12px", borderRadius: "40px", border: "1px solid #e2e8f0", marginBottom: "30px", background: "white" },
  list: { display: "flex", flexDirection: "column", gap: "16px" },
  contactCard: { background: "white", padding: "16px", borderRadius: "20px", display: "flex", gap: "16px", alignItems: "center", boxShadow: "0 5px 10px rgba(0,0,0,0.05)", transition: "0.2s" },
  avatar: { width: "50px", height: "50px", background: "#bfdbfe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem" },
  info: { flex: 1 },
  actions: { display: "flex", gap: "8px" },
  edit: { background: "#fef9c3", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer" },
  delete: { background: "#fee2e2", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer" },
  empty: { textAlign: "center", color: "#6b7280", marginTop: "40px" }
};

export default App;
