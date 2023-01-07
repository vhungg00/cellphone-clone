
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { createSelectProduct, getAllSelectProduct } from "~/appRedux/actions/productAction";
import classNames from "classnames/bind";
import styles from "../Feature.module.scss";
const cx = classNames.bind(styles);

const CreateInfoFilter = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [addOption, setAddOption] = useState([]);
  const [count, setCount] = useState(0)
  const handleAddOption = () => {
    setCount(prev => prev + 1)
    const newOption = {
      index: count,
      value: "",
    };
    setAddOption([ ...addOption, newOption ]);
  }; 
  const handleRemoveOption = (option) => {
    let newListOption = [...addOption];
    newListOption = newListOption.filter((item) => item.index !== option.index);

    setAddOption(newListOption);
  };

  const handleChangeValueOption = (option, e) => {
    const newListOption = [...addOption];
    const index = newListOption.findIndex(
      (item) => item.index === option.index
    );
    newListOption[index].value = e.target.value;
    setAddOption(newListOption);
  };

  const createArrayOption = (arr) => {
    let options = [];
    arr = arr.map((item) => options.push(item.value));
    return options;
  };

  const onSubmit = async (data, e) => {
    const options = createArrayOption([...addOption]);
    const newData = { ...data, options };
    await dispatch(createSelectProduct(newData));
    setAddOption([]);
    e.target.reset();
    dispatch(getAllSelectProduct())
  };

  return (
    <div className={cx("wrapper_update")}>
      <h4>Create select product</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder="Name ... " />
          <input {...register("property")} placeholder="Property ..." />
          <div className={cx("option-list")}>
            {addOption.map((option, index) => (
              <div className={cx("option-list-item")} key={index}>
                <input 
                  value={option.value} 
                  placeholder="Option ..." 
                  onChange={(e) => {handleChangeValueOption(option, e)}} 
                />
                  <DeleteOutlined onClick={() => handleRemoveOption(option)} />
              </div>
            ))}
          </div>
          <a
            onClick={handleAddOption}
          >
            <p>Add options</p>
            <PlusOutlined /> 
          </a>
          <button type="submit">Create filter info</button>
        </form>
      </div>
  );
}
export default CreateInfoFilter;