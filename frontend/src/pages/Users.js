import { useState, useEffect } from 'react';
import Axios from 'axios';

const Users = () => {
    const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/users')
        .then(response => {
              setListOfUsers(response.data);
          })
    }, [])

    return(
        <div className="users">
            <h1>Users</h1>
            <ul>
                {listOfUsers.map(user => {
                    return <li>
                        <h1>Name: {user.name}</h1>
                        <h1>Age: {user.age}</h1>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Users;