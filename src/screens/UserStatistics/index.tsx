import react from "react";
import {Button} from 'antd';


export const UserStatistics: react.FC = () => {
    return <div>
        <Button type="primary">
            Посещение зала
        </Button>
        <Button type="primary">
            Оценки экспонатов
        </Button>
    </div>;
}