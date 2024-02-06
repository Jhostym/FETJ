import { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"
import { useAuth } from "../auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import { API_URL } from "../auth/constans";
import { AuthResponseError } from "../types/type";

export default function SignUp() {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorResponse, setErrorResponse] = useState('')

  const auth = useAuth();
  const goTo = useNavigate();

  async function hadleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          username,
          password,
        })
      });

      if (response.ok) {
        console.log('User created');
        setErrorResponse('');
        goTo('/')
      } else {
        console.log("something went wrong")
        const json = await response.json() as AuthResponseError;
        setErrorResponse(json.body.error);
      }

    } catch (error) {
      console.log(error);
    }

  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <DefaultLayout>
      <form className="form" onSubmit={hadleSubmit}>
        <h1>SignUp</h1>

        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <br/>

        <button >Create user</button>

      </form>
    </DefaultLayout>
  )
}



