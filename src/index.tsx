import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserStatistics } from './screens/UserStatistics';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from 'react-router-dom';

import 'antd/dist/antd.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path={""} element={<App />} />
            <Route path={"/user-statistic"} element={<UserStatistics />} />
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
