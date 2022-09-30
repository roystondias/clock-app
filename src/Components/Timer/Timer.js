import React from 'react'
import { useState, useEffect } from 'react'
import { Button, InputNumber, Modal } from 'antd';


function Timer() {
  const [popUpModal, setPopUpModal] = useState(false)
  const [timer, setTimer] = useState(
    {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  );

  const [timerCounter, setTimerCounter] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [intervalState, setIntervalId] = useState(null);
  const [ErrorText, setErrorText] = useState(false);

  useEffect(() => {
    return () => {
      setTimer({
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      setTimerCounter({
        hours: "0" + 0,
        minutes: "0" + 0,
        seconds: "0" + 0,
      });
      setIntervalId(null);
    }
  }, []);

  const getData = (value, name) => {
    setTimer({
      ...timer,
      [name]: value
    })
  }

  const setData = (hours, minutes, seconds) => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setPopUpModal(true)
      setTimerCounter({
        hours: hours>9?hours:"0" + hours,
        minutes: minutes>9?minutes:"0" + minutes ,
        seconds: seconds>9?seconds:"0" + seconds,
      })
    }
    else {
      setTimerCounter({
        hours: hours>9?hours:"0" + hours,
        minutes: minutes>9?minutes:"0" + minutes ,
        seconds: seconds>9?seconds:"0" + seconds,
      })
    }
  }

  const stopTimer = () => {
    let stop = {
      hours: "0"+0,
      minutes: "0"+0,
      seconds: "0"+0,
    }
    resetTimer(stop);
    setTimerCounter(stop);
  }

  const resetTimer = (newTimer) => {
    setTimer(newTimer);
    clearInterval(intervalState);
    setIntervalId(null)
    setErrorText(false)
  }

  let interval;
  const startTimer = () => {
    let { hours, minutes, seconds } = timer
    if (!hours)
      hours = 0;

    if (!minutes)
      minutes = 0;

    if (!seconds)
      seconds = 0;

    if (parseInt(hours) === 0 && parseInt(minutes) === 0 && parseInt(seconds) === 0) {
      setErrorText(true);
      return;
    }

    if (intervalState !== null) {
      resetTimer(timerCounter);
    } else {
      interval = setInterval(() => {
        console.log(parseInt(hours), parseInt(minutes), parseInt(seconds))
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            if (parseInt(hours) === 0) {
              clearInterval(interval);
              interval = null;
              resetTimer({
                hours:  0,
                minutes: 0,
                seconds: 0,
              });
            } else {
              hours = hours - 1;
              minutes = 59;
              seconds = 59;
            }
          } else {
            minutes = minutes - 1;
            seconds = 59;
          }
        } else {
          seconds = seconds - 1;
        }
        setData(parseInt(hours), parseInt(minutes), parseInt(seconds));
      }, 1000)

      setIntervalId(interval);
    }
  };
  return (
    <div>
      <h3>Timer</h3>
      <div><InputNumber value={timer.hours} max={12} min={0} onChange={(value) => getData(value, "hours")} />:
        <InputNumber value={timer.minutes} max={59} min={0} onChange={(value) => getData(value, "minutes")} />:
        <InputNumber value={timer.seconds} max={59} min={0} onChange={(value) => getData(value, "seconds")} /></div><br></br>
      <div>{timerCounter.hours}:{timerCounter.minutes}:{timerCounter.seconds}</div>
      <Button type="primary" onClick={startTimer}>Start</Button>
      <Button type="primary" onClick={stopTimer} style={{ marginRight: "5px" }}>Reset</Button><br></br>
      {ErrorText ? "Enter some time" : ""}
      <Modal open={popUpModal} okText="OKAY" onCancel={() => setPopUpModal(false)} onOk={() => setPopUpModal(false)}>
        TIME UP!!!!
      </Modal>
    </div>
  )
}

export default Timer;
