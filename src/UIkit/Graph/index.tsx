import react, { useState } from "react";
import {
    Select
} from "antd";
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title,
    BarElement
} from 'chart.js';

import { Pie, Line, Bar} from 'react-chartjs-2';
ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement
);


interface IGraph{
    type: "linear" | "circle" | "bar",
    data: {
        name: string;
        value: number;
    }[]
    header: string;
}


export const Graph: react.FC<IGraph> = (type) => {
    const [chartType, setChartType] = useState(type.type);
    const labels = type.data.map((e) => e.name);
    const values = type.data.map((e) => e.value);
    const circleData = {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };
    const options = {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: type.header,
          },
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
    const lineData = {
        labels,
        datasets: [
          {
            label: type.header,
            data: values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
          },
        ],
    };
    const barData = {
        labels,
        datasets: [
          {
            label: type.header,
            data: values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },

        ],
      };
    return <div>
        <Select defaultValue={type.type} onChange={(e) => {
            setChartType(e);
        }}>
            <Select.Option value="circle">
                Круговая диаграмма
            </Select.Option>
            <Select.Option value="linear">
                Линейный график
            </Select.Option>
            <Select.Option value="bar">
                Столбчатая диаграмма
            </Select.Option>
        </Select>
        {
            chartType == "circle" ?
            <Pie data={circleData} options={options} /> : 
            chartType == "linear" ?
            <Line options={options} data={lineData} /> :
            <Bar options={options} data={barData} />
        }
    </div> 
}