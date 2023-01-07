import { useEffect } from "react";

import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { RULES_ANTD } from "~/constants";
import { register } from "~/appRedux/actions/userAction";
import { userReset } from "~/appRedux/reducerSlice/isAuthSlice";

const Register = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "";

  const userRegister = useSelector((state) => state.auth);
  const { success } = userRegister;
  useEffect(() => {
    if (success) {
      navigate(`/${redirect}`);
      message.success("Đăng ký thành công");
      dispatch(userReset())
    }
  }, [success, navigate, redirect]);

  const handleOnFinish = async (values) => {
    const res = await dispatch(register(values));
  };
  const handleOnFinishFailed = (error) => {
    console.log("Failed:", error);
  };

  return (
    <section className="login-area pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="basic-login">
              <h3 className="text-center mb-60">Đăng ký</h3>
              <Form
                name="basic"
                onFinish={handleOnFinish}
                onFinishFailed={handleOnFinishFailed}
              >
                <Form.Item name="name" rules={RULES_ANTD.name}>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Họ và tên"
                  />
                </Form.Item>
                <Form.Item name="email" rules={RULES_ANTD.email}>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item name="password" rules={RULES_ANTD.password}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button w-100 mb-4"
                    size="large"
                    shape="round"
                  >
                    Đăng ký
                  </Button>
                  Hoặc{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Đăng nhập ngay
                  </Link>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
