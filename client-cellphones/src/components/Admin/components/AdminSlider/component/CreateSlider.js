import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import classNames from "classnames/bind";
import { createSlider, getAllSlider } from "~/appRedux/actions/SliderAction";
import styles from '../AdSlider.module.scss';

const cx = classNames.bind(styles);
export default function CreateSlider() {
  const dispatch = useDispatch();
  const { handleSubmit, register , formState: { errors } } = useForm();
  const [image, setImage] = useState("");

  const onSubmit = async (data, e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);
    e.target.reset();
    await dispatch(createSlider(formData));
    await dispatch(getAllSlider())
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={cx("create-slider")}>
      <span>Create new Slider</span>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input 
        {...register("name",  
          { required: 'Vui lòng nhập trường này' })}
          placeholder="Name image... "
        ></input>
         {errors.name && <p >{errors.name?.message}</p>}

        <input type="file" onChange={(e) => handleChangeImage(e)}></input>

        <button type="submit">Add new image</button>
      </form>
    </div>
  );
}
