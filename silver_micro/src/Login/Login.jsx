import React, { useState } from 'react';
import './Login.css';

import ApiClient from '../Api/Api';

function Login(props) {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const connexionClient = new ApiClient.APIClientConnexion();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    connexionClient.sendLogin(formData.username, formData.password)
      .then(response => {
        if (response != null) {
          setTimeout(() => {
            props.setLog(2);
          }, 2000);
          props.setRole(response["role"]);
          sessionStorage.setItem("username", response["username"]);
          setStatus(true);
        } else {
          setFormData({
            username: '',
            password: ''
          });
          setStatus(false);
        }
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      });
  };

  const toggleLoginRegister = props.toggleLoginRegister;

  return (
    <div className="container">
      <div className="login-container">
        <div className='login-form'>
          <h2>CONNEXION</h2>
          <form onSubmit={handleSubmit}>
            <p
              id="logLogin"
              style={{ color: status ? "green" : "red" }}
            >
              {status !== null && (
                status ? "Inscription Reussie, Redirection en cours" : "Erreur de connexion"
              )}
            </p>
            <div>
              <input
                type="text"
                id="usernameLogin"
                name="username"
                onChange={handleChange}
                value={formData.username}
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="passwordLogin"
                name="password"
                onChange={handleChange}
                value={formData.password}
                minLength="6"
                placeholder="Mot de passe"
                autoComplete="current-password"
                required
              />
            </div>
            <div>
              <button type="submit">Se connecter</button>
            </div>
          </form>
        </div>
        <a onClick={toggleLoginRegister}>
          Créer un compte
        </a>
        <div>
          <a onClick={() => props.setLog(2)}>Continuer en tant qu'invité</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
