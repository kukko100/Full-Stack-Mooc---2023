import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginButtonTogglePressed, setLoginButtonTogglePressed] = useState(false)

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }

  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password }})
  }

  const handleLoginButtonToggle = () => {
    if (!loginButtonTogglePressed) {
      setLoginButtonTogglePressed(true)
    } else {
      setLoginButtonTogglePressed(false)
    }
    
  }

  return (
    <div>
      {!loginButtonTogglePressed && 
          <button onClick={handleLoginButtonToggle}>login</button>
      }
      {loginButtonTogglePressed &&
        <div>
          <form onSubmit={submit}>
            <div>
              username <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
            <button onClick={handleLoginButtonToggle}>cancel</button>
          </form>
        </div>
      }
    </div>
  )
}

export default LoginForm