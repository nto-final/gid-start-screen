import react from "react";
import {Button} from 'antd';
import "./index.css"
import { DefaulButton } from "../../UIkit/DefaultButton/DefaultButton";
import { useNavigate } from "react-router-dom";
export const UserStatistics: react.FC = () => {
    let navigate = useNavigate()
    return <div className="userStat">
        <div className="header" >Статистика</div>
        <DefaulButton onClick={()=>navigate("room")}>
            Посещение зала
        </DefaulButton>
        <DefaulButton onClick={()=>navigate("average-score")}>
            Оценки экспонатов
        </DefaulButton>
        <DefaulButton onClick={()=>navigate(-1)}>Назад</DefaulButton>
    </div>;
}