import Calendar from 'react-calendar';
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import ptBr from "dayjs/locale/pt-br";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import { HabitsDiv, MyHabits, HabitsBox } from "./habits";
import Header from "./header";
import Footer from "./footer";

export default function History() {

    const {user, setUser} = useContext(UserContext);
    const [history, setHistory] = useState([]);
    const [daysHistory, setDaysHistory] = useState([]);
    const [showHabitDate, setShowHabitDate] = useState("");

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", 
        {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        promise.then((response) => {
            setHistory(...history, response.data);
        }).catch((error) => console.log(error))
    }, []);

    //Updates every time changes are made to history state
    useEffect(() => {
        history?.map(day => {
            let completedDay = true;
            day.habits.map(element => {
                if (!element.done) {completedDay = false}
            });
            setDaysHistory( daysHistory => [...daysHistory, {completedDay: completedDay, day: day.day}]);
        }) 
    }, [history]);



    function Habit(props) {
        const {habit} = props;

        return(
            <HabitsBox>
                <h4>{habit.name}</h4>
                <p className={habit.done ? "green-text" : null}>{dayjs(habit.date).format("DD/MM/YYYY")}</p>
            </HabitsBox>
        )
    } 
    return (
        <CalendarDiv>
            <Header/>
            <Calendar  
            tileClassName={(date) => {
                
                if (daysHistory?.find(day => day.day === dayjs(date.date).format("DD/MM/YYYY") && day.completedDay === true)) {
                    return "completed-day"
                } else  if (daysHistory?.find(day => day.day === dayjs(date.date).format("DD/MM/YYYY") && day.completedDay === false)){
                    return "incomplete-day"
                }
            }} 
            onClickDay={(value,event) => setShowHabitDate(dayjs(value).format("DD/MM/YYYY"))}/>
            <MyHabits>
                {history.map(day => day.day === showHabitDate ? day.habits.map(habit => <Habit habit={habit}></Habit>) : null)}
            </MyHabits>
            <Footer/>
        </CalendarDiv>
    )
}


const CalendarDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 130px;

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