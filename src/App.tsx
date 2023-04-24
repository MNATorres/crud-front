import { useEffect, useState } from 'react';
import './App.css';
import User from './User';


interface User {
  _id: string;
  name: string;
  age: number | string;
  email: string;
}


function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: ""
  });
  const [users, setUsers] = useState<User[]>([]);

  console.log(users)



  const fetchUsers = () =>
    fetch("http://localhost:9000/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
      });


  useEffect(() => {
    fetchUsers();
  }, []);


  const handleInputChange = (event: React.BaseSyntheticEvent) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleAdd = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const { name, age, email } = formData;

    if (name.trim() === "" || age.trim() === "" || email.trim() === "") {
      alert("Por favor, complete todos los campos antes de enviar.");
      return;
    }

    //setList([...list, { name, age, email }]);
    fetch("http://localhost:9000/api/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();

      }).then(() =>{
        fetchUsers();
      })
    setFormData({ name: "", age: "", email: "" });

  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:9000/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Eliminar el usuario de la lista
        setUsers(users.filter((user: User) => user._id !== id));
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleAdd}>
        <label>Name and Surname
          <input name='name' value={formData.name} onChange={handleInputChange} type="text" placeholder='Name and Surname...' />
        </label>
        <label>Age
          <input name='age' value={formData.age} onChange={handleInputChange} type='number' placeholder='Age...' />
        </label>
        <label>Email
          <input name='email' value={formData.email} onChange={handleInputChange} type='email' placeholder='email@example.com' />
        </label>
        <button className='buttonAddForm' type='submit'>Send</button>
      </form>
      <ul>
        {users.map((user) => (
          <User key={user._id} user={user} deleteUser={handleDelete} _id={user._id} />
        ))}
      </ul>
    </div>
  )
}

export default App
