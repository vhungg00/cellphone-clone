import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import classNames from "classnames/bind";
import styles from "../Feature.module.scss";
import { createCategory, getCate } from "~/appRedux/actions/cateAction";
const cx = classNames.bind(styles);

function CreateCategory() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState("");

  const onSubmit = async (data, e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("name", data.slug);
    formData.append("name", data.status);
    formData.append("image", image);

    e.target.reset();
    await dispatch(createCategory(formData));
    dispatch(getCate());
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={cx("CreateCate")}>
      <span>Create new category</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Vui lòng nhập trường này" })}
          placeholder="Name Category... "
        ></input>
        {errors.name && <p>{errors.name?.message}</p>}
        <input
          {...register("slug", { required: "Vui lòng nhập trường này" })}
          placeholder="Slug category... "
        ></input>
        {errors.slug && <p>{errors.slug?.message}</p>}
        <input
          {...register("status", { required: "Vui lòng nhập trường này" })}
          placeholder="Status Category... "
        ></input>
        {errors.status && <p>{errors.status?.message}</p>}

        <input type="file" onChange={(e) => handleChangeImage(e)}></input>

        <button type="submit">Add new category</button>
      </form>
    </div>
  );
}

export default CreateCategory;
