import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../img/formularia.png'; // Asegúrate de tener esta ruta correcta
import '../App.css'; // Asegúrate de que el archivo CSS esté importado con la ruta correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verificar si el usuario ya está logueado y redirigirlo al Dashboard
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/dashboard'); // Si hay un usuario en localStorage, redirigir
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Guardar el usuario en localStorage
        localStorage.setItem('user', JSON.stringify(userCredential.user));

        // Navegar al Dashboard
        navigate('/dashboard');
      })
      .catch((error) => {
        setError('Error al iniciar sesión');
      });
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo Formularia" />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

