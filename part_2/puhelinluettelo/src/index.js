import ReactDOM from 'react-dom'
import App from './App'
import axios from "axios"
import "./index.css"

const promise = axios.get("http://localhost:3001/persons")

axios
  .get("http://localhost:3001/persons")
  .then(response => {
    const persons = response.data
    console.log(persons)
  })

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)