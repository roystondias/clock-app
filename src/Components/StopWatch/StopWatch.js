import React from 'react'
import { Button } from 'antd';
import LapList from './LapList';
import './StopWatch.css'
import { useState, useEffect } from 'react';


function StopWatch() {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [stopWatchCount, setStopWatchCount] = useState(0);
    const [lapListData, setLapListData] = useState([])

    const onStartButtonClick = () => {
        setIsActive(!isActive);
        setIsPaused(false);
    }

    const onLapButtonClick = () => {
        let minutesValue = ("0" + Math.floor((stopWatchCount / 60000) % 60)).slice(-2)
        let secondsValue = ("0" + Math.floor((stopWatchCount / 1000) % 60)).slice(-2)
        let milliSecondValue = ("0" + ((stopWatchCount / 10) % 100)).slice(-2)
        let string = `${minutesValue}:${secondsValue}:${milliSecondValue}`
        setLapListData([string, ...lapListData, ]);
    }

    const onResetButtonClick = () => {
        setIsActive(false);
        setStopWatchCount(0);
    }
    useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setStopWatchCount((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);


    const deleteLap = (item)=>{
        setLapListData(lapListData.filter(value => value!== item));
    }
    return (
        <div>
            <div> <h1>{("0" + Math.floor((stopWatchCount / 60000) % 60)).slice(-2)}:{("0" + Math.floor((stopWatchCount / 1000) % 60)).slice(-2)}:{("0" + ((stopWatchCount / 10) % 100)).slice(-2)} </h1> </div>
            <Button type="primary" id="stopWatch-button" onClick={onStartButtonClick}>{isActive ? "Pause" : "Start"}</Button>
            <Button type="primary" id="stopWatch-button" onClick={onLapButtonClick}>Lap</Button>
            <Button type="primary" id="stopWatch-button" danger onClick={onResetButtonClick}>Reset</Button>
            <LapList deleteLap={deleteLap} lapListData={lapListData}></LapList>
        </div>
    )
}

export default StopWatch