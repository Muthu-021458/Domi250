// frontend/src/App.js
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      form: {
        name: '',
        email: ''
      }
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3002/users');
      this.setState({ users: res.data });
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = this.state.form;
    try {
      await axios.post('http://localhost:3002/users', { name, email });
      this.fetchUsers();
      this.setState({ form: { name: '', email: '' } });
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  render() {
    const { users, form } = this.state;

    return (
      <div>
        <h1>Users</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={this.handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={this.handleChange}
          />
          <button type="submit">Add User</button>
        </form>
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.name} - {u.email}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
