import react, { useState } from "react";
import axios from "axios";
import { ORIGIN } from "../../../App";
import { Graph } from "../../../UIkit/Graph";


export const ScoreStatistic: react.FC = () => {
    const [data, setData] = useState<{name: string, average_visual:number, average_completeness: number, average_descr: number}[]>([]);

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
    return <div>
        <Graph header="Средняя законченность" data={
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
        </div>
}