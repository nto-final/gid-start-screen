import react from 'react';
import {Table} from 'antd';
import axios from "axios";
import {ORIGIN} from "../../../App";
import {useNavigate} from "react-router-dom"
import { DefaulButton } from '../../../UIkit/DefaultButton/DefaultButton';

export const AverageScoreViewingStatistic: react.FC = () => {
    const [data, setData] = react.useState<{average_score:number, average_time: number, name: string}[]>([]);
    const columns = [
        {
            title: "Название",
            dataIndex: "name",
            key: "name",
            sorter: (a:any, b:any) => a.name.length - b.name.length
        },
        {
            title: "Средняя оценка",
            dataIndex: "average_score",
            key: "average_point",
            sorter: (a:any, b: any) => a.average_score - b.average_score
        },
        {
            title: "Среднее время просмотра, с",
            dataIndex: "average_time",
            key: "average_time",
            sorter: (a:any, b: any) => a.average_time - b.average_time
        }
    ]
    if (data.length == 0) {
        axios.post(ORIGIN+"top-by-popularity").then((e) => {
            var newData:{average_score:number, average_time: number, name: string}[] = [];
            e.data.sorted_points.map((e: {average_score: number, average_view: number, point: {name: string}}) => {
                newData.push({
                    average_score: Math.ceil(e.average_score * 100) / 100,
                    average_time: Math.floor(e.average_view),
                    name: e.point.name
                })
            })
            setData(newData);
        });
    }
    let navigate = useNavigate()

    return (
    <div className="roomContainer">
        <div className="header"> Статистика </div>
        <Table style={{width:"100%"}}dataSource={data} columns={columns}></Table>
        <DefaulButton onClick={()=>navigate(-1)}>Назад</DefaulButton>
    </div>)
    ;
}