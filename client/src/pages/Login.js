import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post("/api/users/login", value);
      dispatch({ type: "HIDE_LOADING" });
      message.success("User logged in succesfully");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="register" >
        <div className="register-form" style={{borderRadius:'10px'}}>
          <h1>Inventory Billing Application</h1>
          <h3><strong>LOGIN</strong></h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <strong>
                <p style={{fontSize:"1rem",color:'#3C3633'}}>
                 Don't have an account?
                 <Link to="/register" style={{color:'#3652AD'}}> Register Here </Link>
                </p>
              </strong>
              <Button type="primary" htmlType="submit" style={{borderRadius:'10px'}}>
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
