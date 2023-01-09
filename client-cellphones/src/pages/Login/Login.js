import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserLogin } from "~/appRedux/actions/userAction";
import Loading from "~/components/Loading";
import { RULES_ANTD } from "~/constants";

function Login() {
    const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let loading = useSelector((state) => state.auth.isLoading)
    const url = location.search ? location.search.split("=")[1] : "";
    const userLogin = useSelector((state) => state.auth);
    const { user, isLogin } = userLogin;
    useEffect(() => {
      if (isLogin) {
        navigate(`/${url}`);
      }
    }, [isLogin, user, navigate, url]);
    const handleOnFinish = async (values) => {
        const res  = await dispatch(UserLogin(values));
        if(res.status === 200 && res.success) {
          message.success('Đăng nhập thành công')
          loading = false;
        }
        else {
          message.error('Tài khoản và mật khẩu không chính xác')
        }
    }
    const handleOnFinishFailed = (error) => {
        console.log("Failed:", error);
    }
  return (
    <section className="login-area pb-100">
      {loading && <Loading />}
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="basic-login">
              <h3 className="text-center mb-60">Đăng nhập</h3>
              <Form
              name="basic"
              onFinish={handleOnFinish}
              onFinishFailed={handleOnFinishFailed}
              >
                <Form.Item 
                    name="email"
                    rules={RULES_ANTD.email}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  // rules={RULES_ANTD.password}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password" 
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Nhớ đăng nhập</Checkbox>
                  </Form.Item>

                  <a href="#/" className="login-form-forgot">
                    Lấy lại mật khẩu
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button w-100 mb-4"
                    size='large'
                    shape="round"
                  >
                    Đăng nhập
                  </Button>
                  Hoặc <Link to={url ? `/register?redirect=${url}` : "/register"}>Đăng ký ngay</Link>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
