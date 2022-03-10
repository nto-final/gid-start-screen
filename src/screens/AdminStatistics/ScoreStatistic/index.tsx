import react, { useState } from "react";
import axios from "axios";
import { ORIGIN } from "../../../App";
import { Graph } from "../../../UIkit/Graph";
import { useNavigate } from "react-router-dom";
import "../index.css"
import { DefaulButton } from "../../../UIkit/DefaultButton/DefaultButton";

export const ScoreStatistic: react.FC = () => {
    const [data, setData] = useState<{name: string, average_visual:number, average_completeness: number, average_descr: number}[]>([]);
    let navigate = useNavigate()
    if (data.length == 0) {
        axios.post(ORIGIN+"developer-statistics").then((e) => {
            var newData:{name: string, average_visual:number, average_completeness: number, average_descr: number}[] = [];
            e.data.points.map((e:{point:{name:string}, average_visual:number, average_completeness: number, average_descr: number}) => {
                newData.push({
                    name: e.point.name,
                    average_completeness: e.average_completeness,
                    average_descr: e.average_descr,
                    average_visual: e.average_visual
                });
            });
            setData(newData);
        })
    }
    return <div className="statContainer">
        <div style={{"transform":"none"}} className="headerStat">Статистика</div>
        <Graph  header="Средняя законченность" data={
            data.map((e) => {
                return {
                    name: e.name,
                    value: e.average_completeness
                }
            })
        } type="circle"/>
        <Graph header="Средняя визуальная оценка" data={
            data.map((e) => {
                return {
                    name: e.name,
                    value: e.average_visual
                }
            })
        } type="circle"/>
        <Graph header="Среднее описание" data={
            data.map((e) => {
                return {
                    name: e.name,
                    value: e.average_descr
                }
            })
        } type="circle"/>
        <DefaulButton onClick={()=>navigate(-1)}>Назад</DefaulButton>
        </div>
}