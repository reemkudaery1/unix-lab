const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let persons = [
  { id: "1", name: "Ali Ahmad", number: "0987654321" },
  { id: "2", name: "Sara Muhammed", number: "0932145678" },
  { id: "3", name: "Omar Khaled", number: "0944882233" }
]

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'Contact not found' })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' })
  }
  if (persons.find(p => p.name === name)) {
    return res.status(400).json({ error: 'Name must be unique' })
  }
  const id = String(Math.floor(Math.random() * 1000000))
  const newPerson = { id, name, number }
  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

app.put('/api/persons/:id', (req, res) => {
  const { name, number } = req.body
  const id = req.params.id
  const updatedPerson = { id, name, number }
  persons = persons.map(p => p.id !== id ? p : updatedPerson)
  res.json(updatedPerson)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
