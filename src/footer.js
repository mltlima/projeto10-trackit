import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from "react";
import UserContext from "./userContext";
import "react-circular-progressbar/dist/styles.css";

export default function Footer() {
    const {user, setUser} = useContext(UserContext);
    
    return (
        <FooterStyle>
            <Link to="/habits">Hábitos</Link>
            <Link to="/today">
                <CircularProgressbarWithChildren value={user?.percentage > 0 ? user?.percentage : 0} text={"Hoje"} styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                  })}/>
            </Link>
            <Link to="/">Histórico</Link>
        </FooterStyle>
    )
}

const FooterStyle = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    height: 70px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: #FFFFFF;
    padding: 0 31px 0 36px;

    a{
        color: #52B6FF;
        text-decoration: none;
    }

    a:nth-child(2) {
        width: 91px;
        height: 91px;
        border-radius: 100px;
        margin-bottom: 50px;
        padding: 5px;
        background-color: #52B6FF;
    }
`
