const StudentCard = ({ name, major, gpa, imageUrl }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      margin: '10px',
      width: '250px',
      display: 'inline-block',
      textAlign: 'center'
    }}>
      <img src={imageUrl} alt={name} style={{ width: '100px', borderRadius: '50%' }} />
      <h3>{name}</h3>
      <p>Major: {major}</p>
      <p>GPA: {gpa}</p>
      <p>{gpa >= 3.5 ? 'Excellent' : 'Good'}</p>
    </div>
  )
}

export default StudentCard