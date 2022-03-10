import react from "react";
import { Graph } from "../../../UIkit/Graph";
import axios from "axios";
import { ORIGIN } from "../../../App";
import { useNavigate } from "react-router-dom";
import "../index.css"
import { DefaulButton } from "../../../UIkit/DefaultButton/DefaultButton";

export const TimeAroundExponat: react.FC = () => {

    const [data, setData] = react.useState<{name: string, min_time: number, max_time: number, average_time: number}[]>([]);
    let navigate = useNavigate()

    if (!data.length) {
        axios.post(ORIGIN+"developer-statistics").then((e) => {
            var newData:{name: string, min_time: number, max_time: number, average_time: number}[] = []
            e.data.points.map((e:{average_time: number, min_time: number, max_time: number, point:{name: string}}) => {
                newData.push({
                    name: e.point.name,
                    min_time: e.min_time,
                    max_time: e.max_time,
                    average_time: e.average_time
                });
            });
            setData(newData);
        })
    }

    return <div className="statContainer">
        <div style={{"transform":"none"}} className="headerStat">Статистика</div>
        <Graph type={"circle"} data={data.map((e) => {
            return {
                name: e.name,
                value: e.average_time
            }
        })} header="Среднее время проведенное около экспоната" />
        <Graph type="circle" data={data.map((e) => {
            return {
                name: e.name,
                value: e.max_time
            }
        })} header="Максимальное время проведенное около экспоната" />
        <Graph type="circle" data={data.map((e) => {
            return {
                name: e.name,
                value: e.min_time
            }
        })} header="Минимальное время проведенное около экспоната" />
        <DefaulButton onClick={()=>navigate(-1)}>Назад</DefaulButton>

    </div>
}