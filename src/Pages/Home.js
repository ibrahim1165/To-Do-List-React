import React from 'react';
import { useState } from 'react';
import useDate from '../Hook/useDate';

const Home = () => {
    const { today } = useDate();
    const [tasks, setTasks] = useState([]);
    const todayTasks = tasks.filter((t) => t.newDate === today);
 
  
    return (
        <div>
              <div className={tasks.length <= 2 && 'noData'}>
        <div>
          <h1 className="text-3xl text-center mt-5"> Hello!</h1>
          {todayTasks.length === 0 ? (
            <p className="text-2xl text-center mt-2">
              {" "}
              Today is {today}! There is no task for today!
            </p>
          ) : (
            <p className="text-2xl text-center mt-2">
              {" "}
              Today is {today}! Here are your today's tasks! To see your all
              tasks Click To-Do from the menu!
            </p>
          )} 
        </div>
    </div> 
        </div>
    );
};

export default Home;