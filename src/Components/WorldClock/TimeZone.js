import React from 'react'
import { Select, Button, List } from 'antd';
import { useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons'
const { Option } = Select;



function TimeZone() {
    const options = [
        {
            // label: 'New York',
            key: 'America/New_York',
        },
        {
            // label: 'Japan',
            key: 'Asia/Tokyo',
        },
        {
            // label: 'Dubai',
            key: 'Asia/Dubai',
        },
        {
            // label: 'Australia',
            key: 'Australia/Hobart',
        },
        {
            // label: 'UK',
            key: 'Europe/London',
        },
    ]
    const [countryTimeZone, setCountryTimeZone] = useState("");
    const [timeZoneData, setTimeZoneData] = useState([])
    const moment = require('moment-timezone')
    const [local, setLocal] = useState("");
    const [dropDownOptions, setDropDownOptions] = useState(options);
    const [selected, setselected] = useState("")
    const [error, setError] = useState("")
    const [emptyTimeZone, setEmptyTimeZone] = useState("")

    useEffect(() => {
        settingLocalTime();
    }, []);

    const settingLocalTime = () => {
        setInterval(() => {
            setLocal(moment().format().toString());
        }, 1000);
    };


    const onOptionChange = (value) => {
        setCountryTimeZone(value)
        setselected(value);
    }

    const addCountriesTime = () => {
        if(countryTimeZone){
            insertTime(countryTimeZone);
            setselected("");
            setEmptyTimeZone("")
            setDropDownOptions(dropDownOptions.filter((items) => {
                return items.key != countryTimeZone
            }));
        }
        else if (dropDownOptions.length === 0) {
            setError("ALL time zones Selected");
        }
        else{
            setEmptyTimeZone("Select a Time Zone")  
        }

    }

    const insertTime = (key) => {
        var temptz = timeZoneData;
        temptz.push({ title: key })
        setTimeZoneData(temptz)
        setCountryTimeZone("")
    }
    const resetCountries = () => {
        setTimeZoneData([]);
        setDropDownOptions(options);
        setError("")
    }

    const deleteTime = (item) => {
        setTimeZoneData(timeZoneData.filter(value => value !== item))
        dropDownOptions.push({ key: item.title })
        if (dropDownOptions.length > 0) {
            setError("");
        }
    }
    return (
        <div>
            <h3>Select Your country</h3>
            <Select style={{ width: 120 }} onChange={onOptionChange} value={selected}>
                {dropDownOptions.map((element) => {
                    return <Option value={element.key}>{element.key}</Option>
                })}
            </Select>
            <Button type="primary" onClick={addCountriesTime}>Add Time</Button>
            <Button type="primary" onClick={resetCountries} style={{ margin: "5px" }}>Reset</Button>
            {emptyTimeZone}
            {error}
            <List
                header={<div><h3>World Clock Time</h3></div>}
                bordered
                dataSource={timeZoneData}
                renderItem={(item) => (
                    <List.Item >
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.title} {moment(local, "h:mm:ss").tz(item.title).format("h:mm:ss")}</a>}
                        />
                        <DeleteOutlined onClick={() => {
                            deleteTime(item);
                        }} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default TimeZone