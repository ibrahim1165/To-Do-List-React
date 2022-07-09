import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useDate from '../Hook/useDate';
import Loading from './Shard/Loading';

const Home = () => {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth);
  const { today } = useDate();

  const email = user?.email;
  const [tasks, setTasks] = useState([]);
  const todayTasks = tasks.filter((t) => t.newDate === today);

  useEffect(() => {
    fetch(`https://enigmatic-caverns-77732.herokuapp.com/myTasks?email=${email}`)
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
    fetch(`https://quiet-everglades-32387.herokuapp.com//task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const handleEdit = (id) =>{

  }
  if (loading) {
    return <Loading></Loading>;
  }

    return (
      <div className={tasks.length <= 2 && 'noData'}>
      {!user && (
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co/X4GfPsW/man-todo.png)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome to MyToDo!</h1>
              <p className="mb-5">Save your tasks in the app!</p>
              <Link to="/signUp" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div>
          <h1 className="text-3xl text-center mt-5"> Hello!</h1>
          <h1 className="text-3xl text-center mt-5"> {user?.displayName}!</h1>
          {todayTasks.length === 0 ? (
            <p className="text-2xl text-center mt-2">
              {" "}
              Today is {today}! There is no task for you today! To see your all
              tasks Click To-Do from the menu!
            </p>
          ) : (
            <p className="text-2xl text-center mt-2">
              {" "}
              Today is {today}! Here are your today's tasks! To see your all
              tasks Click To-Do from the menu!
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Time</th>
                  <th>Check Completed</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {todayTasks.map((t) => (
                  <tr key={t._id}>
                    <td>{t.task}</td>
                    <td>{t.category}</td>
                    <td>{t.time}</td>
                    <td>
                      <label className="label cursor-pointer">
                        <input
                          onClick={() => handleMoving(t._id)}
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </label>
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
              {todayTasks.length !== 0 && (
                <tfoot>
                  <tr>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Time</th>
                    <th>Check Completed</th>
                    <th>Edit</th>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
    );
};

export default Home;