import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from 'components/Store/Context';
import UIButton from 'components/UI/Button/Button';

import './Login.css';

function initialState() {
  return { user: '', password: '' };
}

function login({ user, password }) {
  if (user === 'admin' && password === 'admin') {
    return { token: '1234' };
  }
  return { error: 'Usuário ou senha inválido' };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    const { token, error } = login(values);

    if (token) {
      setToken(token);
      return history.push('/');
    }

    setError(error);
    setValues(initialState);
  }

  return (
    <div className="bg-login">
      <div className="user-login">
      <div className="logo"></div>
        <h1 className="user-login__title">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="user-login__form-control">
            
            <input
              id="user"
              type="text"
              name="user"
              placeholder="Endereço de E-mail"
              onChange={onChange}
              value={values.user}
            />
          </div>
          <div className="user-login__form-control">
            
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Senha"
              onChange={onChange}
              value={values.password}
            />
            <p className="link">Esqueceu sua senha?</p>
          </div>
          {error && (
            <div className="user-login__error">{error}</div>
          )}
          <UIButton
            type="submit"
            theme="contained-green"
            className="user-login__submit-button"
            rounded
          >
            Entrar
          </UIButton>
        </form>
        <p className="text-p">Não está registrado? <span className="span-link">Inscreva-se agora</span></p>
      </div>
    </div>
  );
};

export default UserLogin;
