import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data]
        console.log(newUser)
        setUsers(newUser)
      })
      .catch(err => console.error(err))
    form.reset()
  }



  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <button type="submit">Add User</button>
      </form>

      <h3>Users: {users.length}</h3>
      {
        users.map(user => <p key={user._id}>
          {user.email}
          {user.name}
        </p>)
      }
    </div>
  );
}

export default App;
