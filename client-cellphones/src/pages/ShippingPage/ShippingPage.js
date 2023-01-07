import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";

import { LeftOutlined } from '@ant-design/icons';
import { Form, Input, message, Select, Spin } from 'antd';

import cellphonesApi from '~/api/cellphonesApi';
import config from '~/config';
import { RULES_ANTD, sortPrioritize } from '~/constants';

import classNames from 'classnames/bind';
import styles from './Shipping.module.scss';
import { cartSaveAddress } from '~/appRedux/actions/cartAction';
import Title from '~/components/Title';
const cx = classNames.bind(styles);

function ShippingPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [wards, setWards] = useState([]);

  const [nameProvice, setNameProvice] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWard, setNameWard] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    getList();
    return reset();
  }, [dispatch]);

  const reset = () => {
    form.resetFields([]);
  };
  const getProvinces = async () => {
    const result = await cellphonesApi.getProvince();
    setProvinces(result.data);
  };

  const getDistricts = async (value) => {
      const result = await cellphonesApi.getDistrict(value);
      setDistricts(result.data);

    }
  const getWards = async (value) => {
    const result = await cellphonesApi.getWard(value);
    setWards(result.data);
  }
  const handleChangeProvinces = (value) => {
    form.resetFields(["district_id", "ward_id"]);
    setDistricts([]);
    setWards([]);
    if (value) {
      const result = provinces.find(c => c.ProvinceID === value)
      setNameProvice(result.ProvinceName);
      getDistricts(value);
    }
  };

  const handleChangeDistricts = (value) => {
    form.resetFields(["ward_id"]);
    setWards([]);
    if (value) {
      const result = districts.find(c => c.DistrictID === value)

      setNameDistrict(result.DistrictName)
      getWards(value);
    }
  };
  const handleChangeWard = (value) => {
    if(value){
      const result = wards.find(c => c.WardCode === value)

      setNameWard(result.WardName)
    }
  };


  const getList = async () => {
    await getProvinces();
  }

  const cartItems = JSON.parse(localStorage.getItem('CART_ITEM'));
  console.log('cartItems: ', cartItems)
  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.qty * item.salePrice,
    0
  );
  
  const userInfo = useSelector(state => state.auth.user)
  const onSubmit = async (value) => {
    const newValue = {
        more: value.more || "",
        name: value.name || "",
        phone: value.phone || "",
        province: nameProvice,
        district: nameDistrict,
        ward: nameWard,
    }
    await dispatch(cartSaveAddress(newValue));
    navigate(config.routes.payment);
  }

  const onFinishFailed = (info) => {
    console.log("Failed:", info);
    message.error("Bạn chưa nhập đầy đủ thông tin");
    return;
  }
  return (
    <div className={cx("wrapper")}>
      <Title title="CellphoneS Shiping" />
      <div className={cx("header")}>
        <Link to={config.routes.home} className={cx("back")}>
          <LeftOutlined />
          <p>Trở về</p>
        </Link>
        <h4 className={cx("title")}>Thông tin đặt hàng</h4>
      </div>
      <div className={cx("content")}>
        <div className="row">
          <h4 className='mb-2'>Thông tin khách hàng</h4>
          <Form
            className={cx("form_info")}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            form={form}
            initialValues={{name: `${userInfo.data.name}`}}
            autoComplete="off"
          >
            <div className='col-xl-12 col-sm-12'>
              <Form.Item
                label="Họ và tên"
                name="name"
                hasFeedback
                rules={userInfo ? RULES_ANTD.name : ''}
              >
                <Input
                  placeholder="Họ và tên(bắt buộc)"
                />
              </Form.Item>
            </div>
            <div className='col-xl-12 col-sm-12'>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                hasFeedback
                rules={RULES_ANTD.phone}
              >
                <Input
                  placeholder="Số điện thoại(bắt buộc)"
                />
              </Form.Item>
            </div>
         <div className='row'>
            <div className="col-md-6 col-sm-12">
              <Form.Item
                  label="Tỉnh thành"
                  name="province_id"
                  hasFeedback
                  rules={RULES_ANTD.provinces}
                >
                  <Select
                     placeholder="Tỉnh thành"
                     onChange={handleChangeProvinces}
                     showSearch
                     allowClear
                     notFoundContent={
                       provinces.length < 1 ? <Spin size="small" /> : null
                     }
                  >
                    {provinces && provinces.length > 0
                    ? sortPrioritize(provinces, [
                        { name: "Hà Nội" },
                        { name: "Hồ Chí Minh" },
                      ]).map((item, index) => {
                        return (
                        <Select.Option
                          key={index}
                          value={item.ProvinceID}
                          className={item.name}
                        >
                          {item.ProvinceName}
                        </Select.Option>
                      )}
                      )
                    : null}
                  </Select>
              </Form.Item>
            </div>
                  {/* <!-- quân huyện --> */}
            <div className="col-md-6 col-sm-12">
              <Form.Item
                label="Quận huyện"
                name="district_id"
                hasFeedback
                rules={RULES_ANTD.districts}
              >
                <Select
                  placeholder="Quận huyện"
                  allowClear
                  onChange={handleChangeDistricts}
                  showSearch
                  notFoundContent={
                    districts.length < 1 ? <Spin size="small" /> : null
                  }
                >
                  {districts && districts.length > 0
                    ? sortPrioritize(districts).map((item, index) => (
                        <Select.Option
                          key={index}
                          value={item.DistrictID}
                          className={item.name}
                        >
                          {item.DistrictName}
                        </Select.Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </div>
          </div>
          {/* <!-- phường xã --> */}
          <div className='row'>
            <div className="col-md-6 col-sm-12">
              <Form.Item
                name="ward_id"
                label="Phường xã"
                hasFeedback
                rules={RULES_ANTD.wards}
              >
                <Select
                  placeholder="Phường xã"
                  label="Phường xã"
                  allowClear
                  showSearch
                  onChange={handleChangeWard}
                  notFoundContent={
                    wards.length < 1 ? <Spin size="small" /> : null
                  }
                >
                  {wards && wards.length > 0
                    ? sortPrioritize(wards).map((item, index) => (
                        <Select.Option
                          key={index}
                          value={item.WardCode}
                          className={item.name}
                        >
                          {item.WardName}
                        </Select.Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6 col-sm-12">
              <Form.Item
                label="Số nhà, đường"
                name="more"
                rules={RULES_ANTD.more}
              >
                <Input placeholder='Số nhà, đường...' />
              </Form.Item>
            </div>
          </div>
          <button type="submit">Hoàn thành nhập thông tin</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default ShippingPage;