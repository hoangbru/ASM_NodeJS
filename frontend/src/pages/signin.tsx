import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, notification } from "antd";
import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interface/auth";
import "../assets/css/root.css";
import Footer from "../pages/root/footer/Footer";

type Props = {};

const Signin: React.FC = (props: Props) => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = async (data: any) => {
    try {
      const { data: user } = await login(data);
      localStorage.setItem('user', JSON.stringify(user));
      api["success"]({
        message: "Login successful!",
      });
      setTimeout(function () {
        navigate("/admin");
      }, 1500);
      console.log(message);
      
    } catch (error:any) {
      const {message} = error.response.data
      console.log(message)
    }
  };

  return (
    <div className="layout">
      <div className="main">
        <section className="contact section" id="contact">
          <h2 className="section__title">Sign in</h2>
          <span className="section__subtitle">
          </span>
          <div className="contact__container container grid">
            <div className="contact__content">
              <form action="" className="contact__form" onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="contact__form-group">
                  <label htmlFor="email" className="contact__form-tag">
                    Email
                  </label>
                  <input
                    type="email"
                    className="contact__form-input"
                    id="email"
                    placeholder="Insert your email"
                    {...register("email")}
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="name" className="contact__form-tag">
                    Password
                  </label>
                  <input
                    type="password"
                    className="contact__form-input"
                    id="name"
                    placeholder="Insert your name"
                    {...register("password")}
                  />
                </div>
                <button
                  type="submit"
                  className="button button--flex contact__form-send"
                >
                  {contextHolder}
                  Sign in<i className="bx bx-send"></i>
                </button>
              </form>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </div>
  );
};

export default Signin;
