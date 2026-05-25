import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Family",
  });

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const API = "http://localhost:3001/persons";

  // GET DATA
  useEffect(() => {
    axios
      .get(API)
      .then((res) => setContacts(res.data || []))
      .catch((err) => console.log("GET ERROR:", err));
  }, []);

  // TOAST
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  // ADD OR UPDATE
  const addOrUpdateContact = () => {
    if (!form.name || !form.phone) {
      showToast("Please fill name & phone ❗");
      return;
    }

    // UPDATE
    if (editingId) {
      axios
        .put(`${API}/${editingId}`, form)
        .then((res) => {
          setContacts((prev) =>
            prev.map((c) => (c.id === editingId ? res.data : c))
          );
          setEditingId(null);
          setForm({
            name: "",
            phone: "",
            email: "",
            category: "Family",
          });
          showToast("Contact updated ✨");
        })
        .catch((err) => console.log(err));
    }

    // ADD
    else {
      axios
        .post(API, form)
        .then((res) => {
          setContacts((prev) => [...prev, res.data]);
          setForm({
            name: "",
            phone: "",
            email: "",
            category: "Family",
          });
          showToast("Contact added ✅");
        })
        .catch((err) => console.log(err));
    }
  };

  // DELETE
  const deleteContact = (id) => {
    axios
      .delete(`${API}/${id}`)
      .then(() => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        showToast("Deleted 🗑️");
      })
      .catch((err) => console.log(err));
  };

  // EDIT
  const startEdit = (contact) => {
    setEditingId(contact.id);
    setForm({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      category: contact.category,
    });
  };

  // FILTER
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // STATS (FIXED)
  const stats = {
    total: contacts.length,
    family: contacts.filter((c) => c.category === "Family").length,
    work: contacts.filter((c) => c.category === "Work").length,
  };

  return (
    <div style={styles.page}>
      {toast && <div style={styles.toast}>{toast}</div>}

      <div style={styles.container}>
        <h1 style={styles.title}>📱 Phone Book</h1>
        <p style={styles.subtitle}>Your modern contact manager</p>

        {/* STATS */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>Total<br />{stats.total}</div>
          <div style={styles.statCard}>Family<br />{stats.family}</div>
          <div style={styles.statCard}>Work<br />{stats.work}</div>
        </div>

        {/* FORM */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>
            {editingId ? "Edit Contact ✏️" : "Add New Contact ➕"}
          </h3>

          <input
            style={styles.input}
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <select
            style={styles.input}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option>Family</option>
            <option>Friends</option>
            <option>Work</option>
          </select>

          <button style={styles.button} onClick={addOrUpdateContact}>
            {editingId ? "Update Contact ✨" : "Add Contact 🚀"}
          </button>
        </div>

        {/* SEARCH */}
        <input
          style={styles.search}
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LIST */}
        <div style={styles.list}>
          {filteredContacts.length === 0 ? (
            <p style={styles.empty}>No contacts found 📭</p>
          ) : (
            filteredContacts.map((c) => (
              <div key={c.id} style={styles.contactCard}>
                <div style={styles.avatar}>
                  {c.name?.charAt(0).toUpperCase()}
                </div>

                <div style={styles.info}>
                  <div style={styles.name}>👤 {c.name}</div>
                  <div>📞 {c.phone}</div>
                  <div>✉️ {c.email}</div>
                  <div>🏷️ {c.category}</div>
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.edit}
                    onClick={() => startEdit(c)}
                  >
                    ✏️
                  </button>

                  <button
                    style={styles.delete}
                    onClick={() => deleteContact(c.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

/* STYLES (same design but clean) */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg,#dbeafe,#eff6ff,#bfdbfe)",
    fontFamily: "Segoe UI",
  },

  container: {
    maxWidth: "850px",
    margin: "auto",
  },

  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#4b5563",
  },

  statsRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  statCard: {
    flex: 1,
    background: "white",
    padding: "15px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    fontWeight: "bold",
  },

  card: {
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(12px)",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "20px",
  },

  sectionTitle: {
    marginBottom: "15px",
    color: "#1e3a8a",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    background: "linear-gradient(135deg,#2563eb,#60a5fa)",
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: "30px",
    border: "1px solid #ddd",
    marginBottom: "20px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  contactCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    background: "white",
    borderRadius: "18px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.05)",
  },

  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#bfdbfe",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  info: { flex: 1 },

  name: { fontWeight: "bold" },

  actions: {
    display: "flex",
    gap: "8px",
  },

  edit: {
    border: "none",
    background: "#fef9c3",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer",
  },

  delete: {
    border: "none",
    background: "#fee2e2",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    color: "#6b7280",
  },

  toast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#1e3a8a",
    color: "white",
    padding: "12px 18px",
    borderRadius: "12px",
  },
};

export default App;