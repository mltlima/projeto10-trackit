import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
import logo from './assets/logo.svg';

export default function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        image: '',
        password: '',
    });

    function registerUser(event) {
        event.preventDefault();

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", (userData));            
            promise.then(() => {
                navigate('/');
            }).catch((error) => {
                console.log(error);
                setUserData({
                    email: '',
                    password: '',
                });
                setLoading(false);
                alert('Erro ao logar usuário');
            });
            setLoading(true);
        }

    return (
        <LoginDiv>
            <img src={logo} alt="TrackIt logo"/>
            <InputForm onSubmit={registerUser}>
                <input type="text" placeholder="nome" onChange={(e) => setUserData({...userData, name: e.target.value})} required disabled={loading}/>
                <input type="email" placeholder="email" onChange={(e) => setUserData({...userData, email: e.target.value})} required disabled={loading}/>
                <input type="password" placeholder="senha" onChange={(e) => setUserData({...userData, password: e.target.value})} required disabled={loading}/>
                <input type="text" placeholder="foto" onChange={(e) => setUserData({...userData, image: e.target.value})} required disabled={loading}/>
                <button type="submit">{loading ? <ThreeDots type="ThreeDots" color="#FFFFFF" height={50} width={80}/> : <p>Cadastrar</p>}</button>
            </InputForm>
            <Link to="/"><h1>Já tem uma conta? Faça login!</h1></Link>
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
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
    }

`