import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Completed = () => {
    const [user, loading, error] = useAuthState(auth);

    const email = user?.email;
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
      fetch(`https://quiet-everglades-32387.herokuapp.com/completed?email=${email}`)
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }, [email, tasks]);
    return (
        <div style={{width: '100%'}} className={tasks.length <= 2 && 'noData'}>
        {tasks.length === 0 ? (
          <h1 className="text-3xl mt-5 text-center">Your archive folder is empty!</h1>
        ) : (
          <h1 className="text-3xl mt-5 text-center">
            These are all your completed tasks!
          </h1>
        )}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                
                <th>Date</th>
                
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t._id}>
                  <td>{t.task}</td>
                  <td>{t.category}</td>
                 
                  <td>{t.newDate}</td>
                 
                </tr>
              ))}
            </tbody>
            {tasks.length !== 0 && (
              <tfoot>
                <tr>
                  <th>Task</th>
                  <th>Description</th>
            
                  <th>Date</th>
                  
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    );
};

export default Completed;