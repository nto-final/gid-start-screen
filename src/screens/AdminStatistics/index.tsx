import react from "react";
import "./index.css"
import { DefaulButton } from "../../UIkit/DefaultButton/DefaultButton";
import { useNavigate } from "react-router-dom";

export const AdminStatistics: react.FC = () => {
    let navigate = useNavigate()
    return <div className="admStat">
        <div className="header" >Статистика</div>
        <DefaulButton onClick={()=>navigate("time-exponat")}>
            Время посещения
        </DefaulButton>
        <DefaulButton onClick={()=>navigate("average-scoring")}>
            Оценки экспонатов
        </DefaulButton>
        <DefaulButton onClick={()=>navigate(-1)}>Назад</DefaulButton>
    </div>;
}