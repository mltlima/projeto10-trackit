import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import UserContext from "./userContext";
import styled from "styled-components";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";

export default function Today() {
    require("dayjs/locale/pt-br");
    dayjs.locale("pt-br");
    const date = dayjs();
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", 
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        promise.then((response) => {
            setUser({...user, todayHabits: response.data});
            percentageCalculation();

        }).catch((error) => console.log(error))
    }, []);

    function percentageCalculation() {
        const habitsDone = user.todayHabits?.filter((habit) => {
            return habit.done === true;
        });
        const percentage = (habitsDone.length / user.habits?.length) * 100;
        console.log(percentage)
        setUser({...user, percentage: percentage});
    }

    return (
        <>
            <Header/>
                <Test>
                    <h1>{date.format("dddd, DD/MM")}</h1>
                    {user.habits?.length < 1 ? <p>"Nenhum hábito concluído ainda"</p> : <p>{user?.percentage}</p>}
                </Test>
            <Footer/>
        </>
    )
}

const Test = styled.div`
    margin-top: 100px;
`