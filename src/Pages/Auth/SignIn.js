import React from 'react';
import "./Entry.css";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
  } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';
const SignIn = () => {
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
      } = useForm();
      const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
        
        reset();
      };
      const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
      const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    
      const location = useLocation();
      let from = location.state?.from?.pathname || "/";
    
      const navigate = useNavigate();
      if (loading || gLoading) {
        return ;
      }
      if (user || gUser) {
        navigate(from, { replace: true });
      }
    return (
        <div>
        <div
          className="hero min-h-screen"
          style={{ backgroundImage: "(https://i.ibb.co/X4GfPsW/man-todo.png)" }}
        >
          <div className="hero-content text-neutral-content">
            <form className="form-entry" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group-entry">
                <h1 className="text-4xl text-center text-primary mb-5">
                  Sign In to continue!
                </h1>
  
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    placeholder="your email"
                    className="input input-bordered"
                    {...register("email", {
                      required: {
                        value: true,
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                      },
                    })}
                  />
                </div>
                <small className="text-danger">
                  {(errors.email?.type === "required" && "Email is required") ||
                    (errors.email?.type === "minLength" &&
                      "password must be at least 8 characters")}
                </small>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="****************"
                    className="input input-bordered"
                    {...register("password", {
                      required: {
                        value: true,
                      },
                      minLength: {
                        value: "8",
                      },
                    })}
                  />
                </div>
                <small className="text-danger">
                  {(errors.password?.type === "required" &&
                    "Password is required") ||
                    (errors.password?.type === "minLength" &&
                      "password must be at least 8 characters")}
                </small>
                <br />
                <small style={{ color: "black" }}>
                  Not a member?{" "}
                  <Link className="entry-link" to="/signUp">
                    Click Here!
                  </Link>{" "}
                </small>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={() => signInWithGoogle()}
                    type="button"
                    className="btn btn-primary btn-outline"
                  >
                    Sign In With Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignIn;