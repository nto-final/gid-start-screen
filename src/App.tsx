import React from 'react';
import {Button, Select} from "antd";
import { useState } from 'react';
import axios from "axios";

import "./style.css"

const ORIGIN = "http://127.0.0.1:8000/api/" 

interface PointSelection{
    key: string,
    value: string;
}

function App() {
    const [points, setPoints] = useState<PointSelection[]>();
    const [selectedPoints, setSelectedPoints] = useState<number[]>();
    const [startingPoint, setStartingPoint] = useState<number>();
    if (!points?.length) {
        axios.get(ORIGIN+"points").then((e) => {
            console.log(e);
            var pts:PointSelection[] = [];
            e.data.map((point:any) => {
                pts.push({key: point.id, value: point.name});
            })
            setPoints(pts);
        })
    }
    return (
        <div className="App">
            <div className="header">
                AR-гид
            </div>
            <Select placeholder="Начальная точка" onChange={(e) => {
                setStartingPoint(e)
            }}>
                {
                    points?.map(e => <Select.Option value={e.key} key={e.key}>{e.value}</Select.Option>)
                }
            </Select>
            <Select placeholder="Точки которые хотите посетить" mode="multiple" onChange={(e) => {
                setSelectedPoints(e);
            }}>
                {
                    points?.map(e => <Select.Option value={e.key} key={e.key}>{e.value}</Select.Option>)
                }
        
            </Select>
            <Button type={"primary"} onClick={() => {
                window.location.replace(
                    "https://127.0.0.1:8080?points=["+selectedPoints?.toString()+"]"+"&" +
                    "starting_point="+startingPoint?.toString()
                );
            }}>Начать навигацию</Button>
        </div>
  );
}

export default App;
