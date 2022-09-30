import React from 'react'
import { List } from 'antd';
import {DeleteOutlined }  from '@ant-design/icons'

function LapList(props) {
    let data =props.lapListData;
    
    const deleteLap =(item)=>{
        props.deleteLap(item)
    }

    return (
        <div>
            <List
                header={<div><h3>All Laps</h3></div>}
                // footer={<Pagination total={data.length} pageSize={5} />}
                pagination={{pageSize:5}}
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item >
                        {item}  <DeleteOutlined onClick={()=>{
                            deleteLap(item);
                        }}/>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default LapList