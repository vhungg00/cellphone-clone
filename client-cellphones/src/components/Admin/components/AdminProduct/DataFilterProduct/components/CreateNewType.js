import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { createTypeProduct, getAllTypeProduct } from "~/appRedux/actions/productAction";
import classNames from "classnames/bind";
import styles from "../Feature.module.scss";
const cx = classNames.bind(styles);

export default function CreateNewType() {
  const dispatch = useDispatch();
  const { handleSubmit, register , formState: { errors } } = useForm();
  const [image, setImage] = useState("");

  const onSubmit = async (data, e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);
    

    e.target.reset();
    await dispatch(createTypeProduct(formData));
    await dispatch(getAllTypeProduct())
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={cx("create-type")}>
      <span>Create new type product</span>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input 
        {...register("name",  
        { required: 'Vui lòng nhập trường này' })}
          placeholder="Name type... "
        ></input>
         {errors.name && <p >{errors.name?.message}</p>}

        <input type="file" onChange={(e) => handleChangeImage(e)}></input>

        <button type="submit">Add new type</button>
      </form>
    </div>
  );
}
