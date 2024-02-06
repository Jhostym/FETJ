import { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constans";
import type { AuthResponseError } from "../types/type";

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorResponse, setErrorResponse] = useState('')
  const goTo = useNavigate();

  const auth = useAuth();

  async function hadleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
        })
      });

      if (response.ok) {
        console.log('Login successfull');
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
        <h1>Login</h1>

        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <br />

        <button >Login</button>

      </form>
    </DefaultLayout>
  )
}
