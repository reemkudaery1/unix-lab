import React from "react";
import { useNavigate } from "react-router-dom";

const InfoRow = ({ label, value }) => (
  <div style={styles.row}>
    <span style={styles.label}>{label}:</span>
    <span style={styles.value}>{value}</span>
  </div>
);

export default function CourseInformation() {
  const navigate = useNavigate();

  const [course] = React.useState({
    name: "Web Development",
    code: "WEB101",
    instructor: "Dr. Ahmad",
    credits: 3,
    description: "This course introduces HTML, CSS, and React basics."
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Course Information</h2>
        <InfoRow label="Course Name" value={course.name} />
        <InfoRow label="Course Code" value={course.code} />
        <InfoRow label="Instructor" value={course.instructor} />
        <InfoRow label="Credits" value={course.credits} />
        <div style={styles.row}>
          <span style={styles.label}>Description:</span>
          <span style={styles.value}>{course.description}</span>
        </div>
        <button
          style={styles.button}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#1e40af"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#2563eb"}
          onClick={() => navigate("/next")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    width: "420px",
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "20px",
    boxShadow: "0 25px 40px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.2s ease"
  },
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#1e293b"
  },
  row: {
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap"
  },
  label: {
    fontWeight: "bold",
    color: "#000000",
    marginRight: "12px"
  },
  value: {
    color: "#4a5568",
    textAlign: "right"
  },
  button: {
    marginTop: "24px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "40px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s ease"
  }
};