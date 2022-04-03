import Calendar from 'react-calendar';
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import ptBr from "dayjs/locale/pt-br";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";

export default function History() {

    const {user, setUser} = useContext(UserContext);
    const [history, setHistory] = useState([]);
    const [daysHistory, setDaysHistory] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", 
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        promise.then((response) => {
            setHistory(...history, response.data);
            //markDay();
        }).catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        console.log("porque")
        history?.map(day => {
            let completedDay = true;
            day.habits.map(element => {
                if (!element.done) {completedDay = false}
                console.log(element.done)
            });
            setDaysHistory( daysHistory => [...daysHistory, {completedDay: completedDay, day: day.day}]);
        })
    
    }, [history]);


    return (
        <CalendarDiv>
            <Calendar  
            tileClassName={(date) => {
                
                if (daysHistory?.find(day => day.day === dayjs(date.date).format("DD/MM/YYYY") && day.completedDay === true)) {
                    return "completed-day"
                } else  if (daysHistory?.find(day => day.day === dayjs(date.date).format("DD/MM/YYYY") && day.completedDay === false)){
                    return "incomplete-day"
                }
            }} 
            onClickDay={(date) => console.log(date)}/>
        </CalendarDiv>
    )
}


const CalendarDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 100px;

    .completed-day {
        background-color: green;
        color: black;
        border-radius: 99px;
        border: 1px solid #CFCFCF;
    }

    .incomplete-day {
        background-color: #d14624;
        color: black;
        border-radius: 99px;
        border: 1px solid #CFCFCF;
    }
`