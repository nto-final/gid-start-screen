import React from 'react';
import {Button, Select} from "antd";
import { useState } from 'react';
import axios from "axios";
import { DefaulButton } from './UIkit/DefaultButton/DefaultButton';
import "./style.css"
import { useNavigate } from "react-router-dom";

const ORIGIN = "http://127.0.0.1:8000/api/" 

interface PointSelection{
    key: string,
    value: string;
}

function App() {
    const [points, setPoints] = useState<PointSelection[]>();
    const [selectedPoints, setSelectedPoints] = useState<number[]>();
    const [startingPoint, setStartingPoint] = useState<number>();
    let navigate = useNavigate()
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
                AR Гид
            </div>
            <Select style={{"width":"300px"}} className="selector"  placeholder="Начальная точка" onChange={(e) => {
                setStartingPoint(e)
            }}>
                {
                    points?.map(e => <Select.Option value={e.key} key={e.key}>{e.value}</Select.Option>)
                }
            </Select>
            <Select style={{"width":"300px"}} className="selector" placeholder="Точки которые хотите посетить" mode="multiple" onChange={(e) => {
                setSelectedPoints(e);
            }}>
                {
                    points?.map(e => <Select.Option value={e.key} key={e.key}>{e.value}</Select.Option>)
                }
        
            </Select>
            <DefaulButton type="button" onClick={() => {
                window.location.replace(
                    "https://127.0.0.1:8080?points=["+selectedPoints?.toString()+"]"+"&" +
                    "starting_point="+startingPoint?.toString()
                );
            }}>Начать навигацию</DefaulButton>
            <DefaulButton style={{"marginTop":"30vh"}} type="button" onClick={()=>navigate(-1)}>Назад</DefaulButton>
        </div>
  );
}

export default App;
