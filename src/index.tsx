import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserStatistics } from './screens/UserStatistics';
import { AverageScoreViewingStatistic } from './screens/UserStatistics/AverageScoreViewingStatistic';
import { RoomViewingStatistic } from './screens/UserStatistics/RoomViewingStatistic';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from 'react-router-dom';

import 'antd/dist/antd.css';
import { TimeAroundExponat } from './screens/AdminStatistics/TimeAroundExponat';
import { ScoreStatistic } from './screens/AdminStatistics/ScoreStatistic';
import {AdminStatistics} from "./screens/AdminStatistics/index"

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path={""} element={<App />} />
            <Route path={"/user-statistic"} element={<UserStatistics />} />
            <Route path={"/user-statistic/average-score"} element={<AverageScoreViewingStatistic />} />
            <Route path={"/user-statistic/room"} element={<RoomViewingStatistic />} />
            <Route path={"/admin-statistic"} element={<AdminStatistics/>}></Route>
            <Route path={"/admin-statistic/time-exponat"} element={<TimeAroundExponat />} />
            <Route path={"/admin-statistic/average-scoring"} element={<ScoreStatistic />} />
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
