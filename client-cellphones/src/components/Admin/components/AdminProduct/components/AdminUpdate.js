import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { routesAdmin } from "~/config";

import { ArrowBackOutlined } from "@material-ui/icons";
import classNames from "classnames/bind";
import { getCate } from "~/appRedux/actions/cateAction";
import { getAllSelectProduct, getAllTypeProduct, getPrdDetailBySlug, removeProductById, updateProduct } from "~/appRedux/actions/productAction";
import styles from "./AdminProduct.module.scss";
const cx = classNames.bind(styles);

function AdminUpdate(props) {
  const { register, handleSubmit, formState: { errors },  } = useForm({ defaultValues: {} });

  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState(undefined);
  const [temp] = useSelector((state) => state.product.products);
  const selects = useSelector((state) => state.product.selects);
  const types = useSelector((state) => state.product.typePrds);
  const cates = useSelector((state) => state.cate.cateList.data);

  const {
    name = "",
    price = 0,
    salePrice = 0,
    amount = '',
    category = {},
    type = '',
    descriptions = "",
  } = temp || {};
  useEffect(() => {
    dispatch(getAllTypeProduct());
    dispatch(getAllSelectProduct());
    dispatch(getCate());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPrdDetailBySlug(slug))
    return () => {
      dispatch(removeProductById())
    }
  }, [dispatch, slug])

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data, e) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("category", data.category);
    formData.append("descriptions", data.descriptions);
    formData.append("price", data.price);

    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append(
      "type",
      activeTypeProduct ? activeTypeProduct : temp.type
    );
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
    // await dispatch(updateProduct(formData));
    navigate("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      key={item.name}
      className={cx("menu_item", `${activeTypeProduct ? (activeTypeProduct === item.name ? "active" : "" ): (type === item.name ? 'active' : "")}`)}
      onClick={() => handleActiveType(item.name)}
    >
      <img src={item.img} alt={item.name}></img>
    </div>
  );

  const handleActiveType = (name) => {
    setActiveTypeproduct(name);
  };

  return (
    <div className={cx("create_wrapper")}>
      <h4 className={cx("heading")}>
        <Link to={routesAdmin.listProduct}>
          {" "}
          <ArrowBackOutlined /> <span>Back</span>
        </Link>
        Update product
      </h4>
      <div className={cx("inner")}>
        <form
          className={cx("create_form")}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <input {...register("name")}
           {...register("name", { required: "Vui lòng nhập trường này" })}
           defaultValue={name}
           placeholder="Name ..."></input>
           {errors.name && <p>{errors.name?.message}</p>}
          <input {...register("slug", { required: "Vui lòng nhập trường này" })}
           placeholder="Slug ..."
           defaultValue={slug}
           ></input>
           {errors.slug && <p>{errors.slug?.message}</p>}
          <div className={cx("cate_item")}>
            <select {...register("category")}
              defaultValue={category._id}
             className={cx("select")}>
              <option>Các danh mục sản phẩm</option>
              {cates &&
                cates.length > 0 &&
                cates.map((cate) => (
                  <option key={cate._id} value={ cate._id}
                  >{cate.name}</option>
                ))}
            </select>
           {errors.name && <p>{errors.name?.message}</p>}
          </div>
          <input {...register("descriptions")} defaultValue={descriptions} placeholder="Descriptions ..."></input>
          <input
            {...register("amount")}
            defaultValue={amount}
            placeholder="Amount ..."
            min={1}
            type="number"
          ></input>
          <input
            defaultValue={price}
            {...register("price")}
            placeholder="Price ..."
            type="number"
          ></input>
          <input
            defaultValue={salePrice}
            {...register("salePrice")}
            placeholder="SalePrice ..."
            type="number"
          ></input>

          <div className={cx("menu")}>
            {types ? types.map((item) => MenuFirmProduct(item)) : ""}
          </div>

          <div className={cx("select_box")}>
            {selects && selects.length > 0
              ? selects.map((item) => {
                const property = item.property;
                  return (<div key={item._id} className={cx("select_type")}>
                    <select
                      {...register(`${property}`)}
                      className={cx("select")}
                      defaultValue={temp[`${item.property}`]}
                    >
                      <option>{item.name}</option>
                      {item.options.map((x) => (
                        <option key={x} value={x}>{x}</option>
                      ))}
                    </select>
                  </div>)
                })
              : ""}
          </div>

          <input
            type="file"
            {...register("image")}
            onChange={handleFileImageChange}
          ></input>
          <button type="submit">Update product</button>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdate;
