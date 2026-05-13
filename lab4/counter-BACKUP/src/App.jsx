import { useState } from 'react'
import Display from './Display'
import Button from './Button'
import './App.css'

const App = () => {
  const [counter, setCounter] = useState(0)
  const inc = () => setCounter(counter + 1)
  const dec = () => setCounter(counter - 1)
  const rst = () => setCounter(0)

  return (
    <div className="counter-card">
      <h1>تطبيق العداد</h1>
      <div className="counter-box">
        <h2>{counter}: العداد</h2>
      </div>
      <div className="buttons-group">
        <Button onClick={inc} text="+1 زيادة" className="btn btn-inc" />
        <Button onClick={dec} text="-1 نقصان" className="btn btn-dec" />
        <Button onClick={rst} text="تصفير" className="btn btn-res" />
      </div>
    </div>
  )
}

export default App
