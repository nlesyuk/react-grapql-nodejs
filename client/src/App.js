
import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS, GET_USER, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutation/user';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  });
  const [newUser] = useMutation(CREATE_USER); // return cortage
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  console.log('12', loadingOneUser ? 'loading' : oneUser)

  useEffect(() => {
    if (!loading) {
      setUsers(data?.getAllUsers)
    }
  }, [data])

  if (loading) return <h1>Loading...</h1>

  const addUser = (e) => {
    e.preventDefault();

    newUser({
      variables: {
        input: { // $input
          username, age // what we should send to server
        }
      }
    }).then(({ data }) => {
      console.log('pp', data)
      setUsername('')
      setAge(0)
    })
  }

  const getAll = (e) => {
    e.preventDefault()
    refetch()
  }


  return (
    <div className="main">
      <form>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="number" value={age} onChange={e => setAge(+e.target.value)} />
        <button className="btn" type="button" onClick={(e) => addUser(e)}>Create user</button>
        <button className="btn" type="button" onClick={(e) => getAll(e)}>Get users</button>
      </form>
      <ul>
        {
          users && users.map(user => <li>{user.id}. {user.username} - {user.age}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
