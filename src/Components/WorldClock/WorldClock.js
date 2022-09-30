import React, { useEffect } from 'react'
import { Dropdown, Menu, Space, Button, List } from 'antd';
import { DownOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function WorldClock() {
    let items = [

        {
            label: 'New York',
            key: 'America/New_York',
        },
        {
            label: 'Japan',
            key: 'Asia/Tokyo',
        },
        {
            label: 'Dubai',
            key: 'Asia/Dubai',
        },
        {
            label: 'Australia',
            key: 'Australia/Hobart',
        },
        {
            label: 'UK',
            key: 'Europe/London',
        },
    ]

    useEffect(() => {
        settingLocalTime();
    }, []);


    const [local, setLocal] = useState("");
    const [timeZoneData, setTimeZoneData] = useState([])
    const [menuItems, setMenuItems] = useState(items)
    const [countryTimeZone, setCountryTimeZone] = useState("")
    const moment = require('moment-timezone')


    const handleClick = ({ key, item, keyPath }) => {
        setCountryTimeZone(key);
        disableDropdown(key)
    }

    const disableDropdown = (key) => {
        let tempArray = menuItems;
        let value = tempArray.filter((items) => items.key !== key)
        setMenuItems(value)
    }
    const settingLocalTime = () => {
        setInterval(() => {
            setLocal(moment().format().toString());
        }, 1000);
    };

    const insertTime = (key) => {
        var temptz = timeZoneData;
        temptz.push({ title: key })
        setTimeZoneData(temptz)
    }

    const menu = (
        <Menu
            onClick={handleClick}
            items={menuItems}
        />
    );

    const addCountriesTime = () => {
        insertTime(countryTimeZone);
    }

    const deleteTime = (item, title) => {
        setTimeZoneData(timeZoneData.filter(value => value !== item))
    }
    const resetCountries = () => {
        setTimeZoneData([]);
    }

    console.log(menuItems);
    return (
        <div>
            <h3>Select Your country</h3>
            <Dropdown overlay={menu} >
                <a onClick={(e) => e.preventDefault()}>
                    <Button>
                        <Space>
                            Select Your Country
                            <DownOutlined />
                        </Space>
                    </Button>
                </a>
            </Dropdown>
            <Button type="primary" onClick={addCountriesTime}>Add Time</Button>
            <Button type="primary" onClick={resetCountries} style={{ margin: "5px" }}>Reset</Button>
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
                            deleteTime(item, item.title, item.key);
                        }} />
                    </List.Item>
                )}
            />
        </div>
    )
}
