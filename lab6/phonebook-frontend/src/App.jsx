import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const Notification = ({ message, type }) => {
  if (!message) return null
  return <div className={`notification ${type}`}>{message}</div>
}

const Search = ({ value, onChange }) => (
  <div className="search-box">
    <input
      type="text"
      placeholder="Search contact..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

const ContactForm = ({ onSubmit, name, email, number, onNameChange, onEmailChange, onNumberChange }) => (
  <form onSubmit={onSubmit} className="contact-form">
    <div className="input-group">
      <input placeholder="Name" value={name} onChange={(e) => onNameChange(e.target.value)} required />
    </div>
    <div className="input-group">
      <input type="email" placeholder="Email" value={email} onChange={(e) => onEmailChange(e.target.value)} required />
    </div>
    <div className="input-group">
      <input placeholder="Phone Number" value={number} onChange={(e) => onNumberChange(e.target.value)} required />
    </div>
    <button type="submit" className="add-btn">➕ Add Contact</button>
  </form>
)

const ContactCard = ({ contact, onEdit, onDelete }) => (
  <div className="contact-card">
    <div className="contact-info">
      <div className="contact-name">👤 {contact.name}</div>
      <div className="contact-email">📧 {contact.email}</div>
      <div className="contact-number">📱 {contact.number}</div>
    </div>
    <div className="contact-actions">
      <button className="edit-btn" onClick={() => onEdit(contact)}>✏️ Edit</button>
      <button className="delete-btn" onClick={() => onDelete(contact.id, contact.name)}>❌ Delete</button>
    </div>
  </div>
)

const App = () => {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [editingContact, setEditingContact] = useState(null)

  useEffect(() => {
    personService.getAll().then(data => setContacts(data))
  }, [])

  const showNotification = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(null), 5000)
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setNumber('')
    setEditingContact(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingContact) {
      const updated = { ...editingContact, name, email, number }
      personService.update(editingContact.id, updated)
        .then(returnedContact => {
          setContacts(contacts.map(c => c.id !== editingContact.id ? c : returnedContact))
          showNotification('Contact updated ✏️')
          resetForm()
        })
        .catch(() => {
          showNotification(`${name} has already been removed`, 'error')
          setContacts(contacts.filter(c => c.id !== editingContact.id))
          resetForm()
        })
    } else {
      const newContact = { name, email, number }
      personService.create(newContact)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact))
          showNotification('Contact added ✅')
          resetForm()
        })
    }
  }

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setContacts(contacts.filter(c => c.id !== id))
          showNotification('Contact deleted ❌')
        })
    }
  }

  const editContact = (contact) => {
    setEditingContact(contact)
    setName(contact.name)
    setEmail(contact.email)
    setNumber(contact.number)
  }

  const filteredContacts = search
    ? contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.number.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      )
    : contacts

  return (
    <div className="container">
      <div className="app-wrapper">
        <h1>📒 Phonebook App</h1>
        <Notification message={message} type={messageType} />
        <Search value={search} onChange={setSearch} />
        
        <h3>➕ Add New Contact</h3>
        <ContactForm
          onSubmit={handleSubmit}
          name={name} email={email} number={number}
          onNameChange={setName}
          onEmailChange={setEmail}
          onNumberChange={setNumber}
        />
        
        <h3>📋 Contacts List</h3>
        <div className="contacts-list">
          {filteredContacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={editContact}
              onDelete={deleteContact}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App