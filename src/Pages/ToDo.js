import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

import Loading from "../Pages/Shard/Loading";
import { useNavigate } from "react-router-dom";
const ToDo = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
  
    const email = user?.email;
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
      fetch(`https://quiet-everglades-32387.herokuapp.com/myTasks?email=${email}`)
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }, [email, tasks]);
  
    const handleMoving = (id) => {
      const item = tasks.find((t) => t._id === id);
      handleCompleted(item);
      setTimeout(() => {
        handleRemoving(id);
      }, 1000);
    };
    const handleCompleted = (item) => {
      console.log(item);
      fetch(`https://quiet-everglades-32387.herokuapp.com/completed`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };
    const handleRemoving = (id) => {
      fetch(`https://quiet-everglades-32387.herokuapp.com/task/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };
    if (loading) {
      return <Loading></Loading>;
    }
    return (
        <div className={tasks.length <= 2 && "noData"}>
      {tasks.length === 0 ? (
        <h1 className="text-3xl mt-5 text-center">There is no task for you!</h1>
      ) : (
        <h1 className="text-3xl mt-5 text-center">
          These tasks are waiting for you!
        </h1>
      )}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Time</th>
              <th>Date</th>
              <th>Check Completed</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t.task}</td>
                <td>{t.category}</td>
                <td>{t.time}</td>
                <td>{t.newDate}</td>
                <td>
                  <input
                    onClick={() => handleMoving(t._id)}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </td>
                <td>
                  <button onClick={() => navigate(`/${t._id}`)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {tasks.length !== 0 && (
            <tfoot>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Time</th>
                <th>Date</th>
                <th>Check Completed</th>
                <th>Edit</th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
    );
};

export default ToDo;