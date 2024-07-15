import { useEffect, useState } from 'react';
import './App.css';
import {EditableText} from '@blueprintjs/core'


function App() {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newWebsite, setNewWebsite] = useState("")


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json() )
        .then((json) => setUsers(json))
    },[])

    function addUser() {
        const name = newName.trim();
        const email = newEmail.trim();
        const website = newWebsite.trim();

        if (name && email && website) {
            fetch("https://jsonplaceholder.typicode.com/users",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        email,
                        website
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8 "
                    }
                }


            ).then((response) => response.json() )
            .then(data => {
                setUsers([...users, data]);
                
                setNewName("");
                setNewEmail("");
                setNewWebsite("");

            })
        }

    }

    function onChangeHandler(id,key,value){
        setUsers((users)=>{
                return users.map(user=>{
                return  user.id ===id?{...user,[key]:value}: user

                 })
        })
    }


    function updateUser(id){
      const user=users.find((user)=> user.id === id)
      fetch(`https://jsonplaceholder.typicode.com/users/10`,
        {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json; charset=UTF-8 "
            }
        }
    ).then((response) => response.json() )
    
    }
function deleteUser(id){

  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
    {
        method: "DELETE",
      
    }
).then(response => response.json() )
.then(data =>{
  setUsers((users)=>{
     return users.filter(user=> user.id !== id)
    
    })
})
}

  return (
    <>
      <div className="App">
        <div className='container'>
          <table className='table table-bordered table-responsive'>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>  Website</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {users.map(user => 
    
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td><EditableText value={user.email} onChange={value=> onChangeHandler(user.id,'email',value)}/></td>
        <td><EditableText value={user.website} onChange={value=> onChangeHandler(user.id,'website',value)}/></td>
        <td>
          <button className='btn btn-primary pr-5' onClick={()=>updateUser(user.id)}>Update</button>
          <button className='btn btn-primary' onClick={()=>deleteUser(user.id)}>Delete</button>
        </td>
      </tr>
    
  )}
</tbody>

            <tfoot>
              <td></td>
              <td>
                <input className='input-group' value={newName} placeholder='enter the  name' onChange={(e)=>{
                  setNewName(e.target.value)
                }}></input>
              </td>
              <td>
                <input className='input-group' value={newEmail} placeholder='enter the author name' onChange={(e)=>{
                  setNewEmail(e.target.value)
                }}></input>
              </td>

              <td>
                <input className='input-group' value={newWebsite} placeholder='enter the year' onChange={(e)=>{
                  setNewWebsite(e.target.value)
                }}></input>
              </td>
              <td>
                <button style={{ backgroundColor: 'green', color: 'white' }} onClick={addUser} className='btn btn-success bg-color-green'>Add User</button>
              </td>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
