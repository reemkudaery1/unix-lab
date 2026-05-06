import StudentCard from './StudentCard'

const App = () => {
  const students = [
    { id: 1, name: 'Ahmed', major: 'CS', gpa: 3.8, imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Sara', major: 'SE', gpa: 3.9, imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Mohammed', major: 'AI', gpa: 3.5, imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' }
  ]

  return (
    <div>
      <h1>Student Cards (Extra Credit)</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {students.map(s => <StudentCard key={s.id} {...s} />)}
      </div>
    </div>
  )
}

export default App