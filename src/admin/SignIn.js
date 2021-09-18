import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import firebase from 'firebase';
import app from "../firebase.config";
import { useForm } from 'react-hook-form';
import { login } from './auth/Auth';
import { FaSpinner } from 'react-icons/fa';

function SignIn(props) {
    // const db=app.firestore();
    const [loading, setLoading] = useState(false)
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const  {register, handleSubmit, formState: { errors },reset} = useForm();
    const [errorMessage,setError] = useState("")
    const onSubmit = async (data) =>{
        let user;
        
        setLoading(true);
        try {
            user = await login(data);
            reset();
        } catch (error) {
            console.log(error.code)
            switch (error.code) {
                case "ERROR_INVALID_EMAIL":
                  setError("Your email address appears to be malformed.");
                  break;
                case "auth/wrong-password":
                  setError("Your password is incorrect. Please try again.");
                  break;
                case "auth/user-not-found":
                  setError("User with this email doesn't exist.");
                  break;
                case "ERROR_USER_DISABLED":
                  setError("User with this email has been disabled.");
                  break;
                case "ERROR_TOO_MANY_REQUESTS":
                  setError("Too many requests. Try again later.");
                  break;
                case "ERROR_OPERATION_NOT_ALLOWED":
                  setError("Signing in with Email and Password is not enabled.");
                  break;
                default:
                  setError("An undefined Error happened.");
              }
        }
        
        setLoading(false);

        if (user) {
            props.history.push('/livescore')
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="w-50 mx-auto mb-4"
                {...register('email', { required: true })}
              />
              {errors.email && errors.email.type === "required" && (
                <span role="alert" className="alert alert-danger">Email is required</span>
            )}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter Password" className="w-50 mx-auto mb-4" {...register('password', { required: true })} />
                {errors.password && errors.password.type === "required" && (
                <span role="alert" className="alert alert-danger">Password is required</span>
            )}
            </Form.Group>
            {errorMessage && (
                <span role="alert" className="alert w-50 mx-auto alert-danger d-block mb-4">{errorMessage}</span>
            )}
            <Button variant="primary" type="submit" disabled={loading?true:false}>
            <FaSpinner className={`${loading?"click-logo":"hide"}`}/> {loading?"Signing In...":"Sign In"}
            </Button>
            
            </Form>
        </div>
    );
}

export default SignIn;