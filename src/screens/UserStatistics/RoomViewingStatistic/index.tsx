import react, { useState } from "react"
import {Table} from 'antd';
import axios from "axios";
import { ORIGIN } from "../../../App";
import "./index.css"
import { DefaulButton } from "../../../UIkit/DefaultButton/DefaultButton";
import { useNavigate } from "react-router-dom";
export const RoomViewingStatistic: react.FC = () => {
    const [data, setData] = useState<{name: string, people_amount: number}[]>([]);
    const columns = [
        {
            name: "Название",
            dataIndex: "name",
            key: "name"
        },
        {
            name: "Количество людей",
            dataIndex: "people_amount",
            key: "people_amount",
            sorter: (a:any, b:any) => a.people_amount - b.people_amount
        }
    ]
    if (data.length == 0) {
        axios.post(ORIGIN+"count-user-today-by-rooms").then((e) => {
            var newData:{name: string, people_amount: number}[] = [];
            e.data.sortedRooms.map((e: {room: {name: string}, view: number}) => {
                newData.push({
                    name: e.room.name,
                    people_amount: e.view
                })
            })
            setData(newData);
        })
    }
    let navigate = useNavigate()
    return <div className="roomContainer">
        <div className="header"> Статистика </div>
        <Table style={{width:"100%"}}dataSource={data} columns={columns}></Table>
        <DefaulButton onClick={()=>navigate(-1)}>Назад</DefaulButton>
    </div>
}