import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import logo from './assets/logo.svg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function submitLogin() {
        
    }

    return(
        <LoginDiv>
            <img src={logo} alt="TrackIt logo"/>
            <InputForm onSubmit={submitLogin}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} disabled={loading} required/>
                <input type="password" placeholder="senha" onChange={(e) => setPassword(e.target.value)} disabled={loading} required/>
                <button type="submit">{loading ? <ThreeDots type="ThreeDots" color="#FFFFFF" height={48} width={303}/> : <p>Entrar</p>}</button>
            </InputForm>
            <Link to="/signUp"><h1>Não tem uma conta? Cadastre-se!</h1></Link>
        </LoginDiv>
    )
}

const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin: 68px 0 32px;
    }

    h1 {
        margin-top: 25px;
        font-size: 14px;
    }
`

const InputForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;

    input {
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        outline: none;
        padding: 10px;
        font-size: 20px;
        height: 45px;
        margin-bottom: 6px;
    }

    input::placeholder{
        color: #DBDBDB;
    }

    button {
        height: 45px;
        background-color: #52B6FF;
        border-radius: 5px;
        border: none;
        color: #FFFFFF;
    }

`