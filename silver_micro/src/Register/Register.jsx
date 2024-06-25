import React, { useState } from 'react';
import './Register.css';

import ApiClient from '../Api/Api';

function Register(props) {

    const connexionClient = new ApiClient.APIClientConnexion();

    const [status, setStatus] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        connexionClient.sendRegister(formData.username, formData.email, formData.phone, formData.password, formData.confirmPassword)
            .then(response => {
                if (response != null) {
                    setStatus(true);
                    setTimeout(() => {
                        props.setLog(0);
                    }, 2000);
                } else {
                    setStatus(false);
                    setFormData({
                        username: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: ''
                    });
                }
                setTimeout(() => {
                    setStatus(null);
                }, 3000);
            });
    }

    const toggleLoginRegister = props.toggleLoginRegister;

    return (
        <div className="container">
            <div className="register-container">
                <div className='register-form'>
                    <h2>INSCRIPTION</h2>
                    <form onSubmit={handleSubmit}>
                        <p
                            id="logRegister"
                            style={{ color: status ? 'green' : 'red' }}
                        >
                            {status !== null && (
                                 status ? "Inscription Reussie, Redirection en cours" : "Erreur de connexion"
                            )}
                        </p>
                        <div>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" required />
                        </ div>
                        <div>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Adresse e-mail" required />
                        </ div>
                        <div>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Numéro de téléphone" />
                        </ div>
                        <div>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} minLength="6" placeholder="Mot de passe" required />
                        </ div>
                        <div>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} minLength="6" placeholder="Confirmer le mot de passe" required />
                        </ div>
                        <div>
                            <button type="submit" className="submit-button">S'inscrire</button>
                        </ div>
                    </form>
                </div>
                <a id="login-link" onClick={toggleLoginRegister}>
                    Se connecter
                </a>
                <div>
                    <a onClick={() => props.setLog(2)}>Continuer en tant qu'invité</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
