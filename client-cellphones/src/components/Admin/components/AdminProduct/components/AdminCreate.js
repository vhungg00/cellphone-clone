import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ArrowBackOutlined } from "@material-ui/icons";
import config from "~/config";

import classNames from "classnames/bind";
import styles from "./AdminProduct.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getAllSelectProduct,
  getAllTypeProduct,
} from "~/appRedux/actions/productAction";
import { getCate } from "~/appRedux/actions/cateAction";
const cx = classNames.bind(styles);

function AdminCreate(props) {
  const { register, handleSubmit } = useForm({ defaultValues: {} });

  const [image, setImage] = useState("");
  const [activeType, setActiveType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selects = useSelector((state) => state.product.selects);
  const types = useSelector((state) => state.product.typePrds);
  const cates = useSelector((state) => state.cate.cateList.data);

  useEffect(() => {
    dispatch(getAllTypeProduct());
    dispatch(getAllSelectProduct());
    dispatch(getCate());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data, e) => {
    console.log(data);
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("category", data.category);
    formData.append("descriptions", data.descriptions);
    formData.append("price", data.price);

    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("type", activeType);
    formData.append("image", image);

    formData.append("os", data.os);
    formData.append("ram", data.ram);
    formData.append("battery", data.battery);
    formData.append("rom", data.rom);

    formData.append("camera", data.camera);
    formData.append("special", data.special);
    formData.append("design", data.design);
    formData.append("screen", data.screen);

    e.target.reset();
    await dispatch(createProduct(formData));
    navigate("/admin/products");
  };

  const MenuFirmProduct = (item) => (
    <div
      key={item.name}
      className={cx("menu_item", `${activeType === item.name ? "active" : ""}`)}
      onClick={() => handleActiveType(item.name)}
    >
      <img src={item.img} alt={item.name}></img>
    </div>
  );

  const handleActiveType = (name) => {
    setActiveType(name);
  };

  return (
    <div className={cx("create_wrapper")}>
      <h4 className={cx("heading")}>
        <Link to={config.routesAdmin.listProduct}>
          {" "}
          <ArrowBackOutlined /> <span>Back</span>
        </Link>
        Create Product
      </h4>
      <div className={cx("inner")}>
        <form
          className={cx("create_form")}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <input {...register("name")} placeholder="Name ..."></input>
          <input {...register("slug")} placeholder="Slug ..."></input>
          <div className={cx("cate_item")}>
            <select {...register("category")} className={cx("select")}>
              <option>Các danh mục sản phẩm</option>
              {cates &&
                cates.length > 0 &&
                cates.map((cate) => (
                  <option key={cate._id} value={cate._id}>{cate.name}</option>
                ))}
            </select>
          </div>
          <input {...register("descriptions")} placeholder="Descriptions ..."></input>
          <input
            {...register("amount")}
            placeholder="Amount ..."
            min={1}
            type="number"
          ></input>
          <input
            {...register("price")}
            placeholder="Price ..."
            type="number"
          ></input>
          <input
            {...register("salePrice")}
            placeholder="SalePrice ..."
            type="number"
          ></input>

          <div className={cx("menu")}>
            {types ? types.map((item) => MenuFirmProduct(item)) : ""}
          </div>

          <div className={cx("select_box")}>
            {selects && selects.length > 0
              ? selects.map((item) => (
                  <div key={item._id} className={cx("select_type")}>
                    <select
                      {...register(`${item.property}`)}
                      className={cx("select")}
                    >
                      <option>{item.name}</option>
                      {item.options.map((x) => (
                        <option key={x} value={x}>{x}</option>
                      ))}
                    </select>
                  </div>
                ))
              : ""}
          </div>

          <input
            type="file"
            {...register("image")}
            onChange={handleFileImageChange}
          ></input>
          <button type="submit">Create product</button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreate;
