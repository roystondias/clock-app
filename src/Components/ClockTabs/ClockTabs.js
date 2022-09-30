import React from 'react'
import { Tabs } from 'antd';
import StopWatch from '../StopWatch/StopWatch';
// import WorldClock from '../WorldClock/WorldClock';
import Timer from '../Timer/Timer';
import TimeZone from '../WorldClock/TimeZone';

const onChange =(key)=>{
    console.log(key);
}
function ClockTabs(props) {
  return (
    <Tabs
        defaultActiveKey={props.tabKey}
        onChange={onChange}
        items={[
          {
            label: `Stop Watch`,
            key: '1',
            children: <StopWatch></StopWatch>,
          },
          {
            label: `World Clock`,
            key: '2',
            children: <TimeZone></TimeZone>,
          },
          {
            label: `Timer`,
            key: '3',
            children: <Timer></Timer>,
          },
        ]}
      />
  )
}

export default ClockTabs