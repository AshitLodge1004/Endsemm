import { useState } from 'react';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (isLogin) {
      const savedUser = localStorage.getItem(email);
      const user = savedUser ? JSON.parse(savedUser) : null;

      if (user && user.password === password) {
        alert(`Welcome, ${user.name}! Login successful.`);
      } else {
        alert('Invalid email or password.');
      }
      return;
    }

    if (localStorage.getItem(email)) {
      alert('This email is already registered.');
      return;
    }

    const newUser = { name, email, password };
    localStorage.setItem(email, JSON.stringify(newUser));
    alert('Registration successful! Please log in.');

    setIsLogin(true);
    setName('');
    setEmail('');
    setPassword('');
  }

  function toggleForm() {
    setIsLogin(!isLogin);
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <main className="container">
      <section className="form-box">
        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="subtitle">
          {isLogin ? 'Login to continue' : 'Register to get started'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              Full name
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength="6"
              required
            />
          </label>

          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>

        <p className="toggle">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          {' '}
          <button className="text-button" type="button" onClick={toggleForm}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </section>
    </main>
  );
}

export default App;
