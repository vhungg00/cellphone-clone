import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { CaretDownOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";

import { deleteSelectProduct, getAllSelectProduct, updateSelectProduct } from "~/appRedux/actions/productAction";

import classNames from "classnames/bind";
import DropdownC from "~/components/DropdownC";
import styles from "../Feature.module.scss";
const cx = classNames.bind(styles);

const FilterMenu = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      select: { name: "", property: "" },
    },
  });
  const [chooseSelectItem, setChooseSelectItem] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { name = "", options = [] } = chooseSelectItem || {};
  
  const filterMenuList = useSelector((state) => state.product.selects);
  let loading = useSelector((state) => state.product.isLoading);

  useEffect(() => {
    dispatch(getAllSelectProduct());
  }, [dispatch]);

  const showModal = (item) => {
    setValue("select", {
      name: item.name,
      property: item.property,
    });
    setChooseSelectItem({
      ...item,
      options: [ ...item.options ]
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setChooseSelectItem({undefined});
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleAddOption = () => {
    const newOption = "";
    setChooseSelectItem({
      ...chooseSelectItem,
      options: [...chooseSelectItem.options, newOption],
    });
  };

  const handleRemoveOption = (option, index) => {
    let newChooseSelectItem = { ...chooseSelectItem };
    const newOptions = newChooseSelectItem.options.filter(
      (item, indexItem) => indexItem !== index
    );
    setChooseSelectItem({ ...chooseSelectItem, options: newOptions });
  };

  const handleChangeValueOption = (option, index, e) => {
    const val = e.target.value;
    let newChooseSelectItem = { ...chooseSelectItem };
    newChooseSelectItem.options[index] = val;
    setChooseSelectItem(newChooseSelectItem);
  };

  const onSubmit = async (data, e) => {
    let {_id = "", options = []} = chooseSelectItem;
    let { select = {} } = data;
    await dispatch(updateSelectProduct( _id, {
      name: select.name,
      property: select.property,
      options: options
    }));
    handleCancel();
    dispatch(getAllSelectProduct());
  };

  const handleFilterMenu = (item) => (
    <div key={item._id} className={cx("menu_item")}>
      <DropdownC menu={menuShow(item)} placement="bottomLeft">
        <div className={cx("title")}>
          <h4>{item.name}</h4>
          <CaretDownOutlined />
        </div>
      </DropdownC>
    </div>
  );

  const removeSelectItem = async (item) => {
    await dispatch(deleteSelectProduct(item._id))
    dispatch(getAllSelectProduct())
  };

  const menuShow = (menuItem) => (
    <div className={cx("menu_show", "left_style")}>
      <div className={cx("wrapper_item")}>
        {menuItem.options.map((item) => (
          <div key={item} className={cx("item")}>
            {item}
          </div>
        ))}
      </div>
      <div className={cx("btn_action")}>
        <button
          className={cx("btn", "bg_update")}
          onClick={() => showModal(menuItem)}
        >
          Update
        </button>
        <button
          className={cx("btn", "bg_delete")}
          onClick={() => removeSelectItem(menuItem)}
        >
          {" "}
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className={cx("select_wrapper")}>
        <h4>List menu filter</h4>
        <div className={cx("menu")}>
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}
          {filterMenuList && filterMenuList.length > 0
            ? filterMenuList.map((item) => handleFilterMenu(item))
            : ""}
        </div>
        {chooseSelectItem ? (
          <Modal
            title={`Update ${name}`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={cx("select_form")}
            >
              <label>Name</label>
              <input {...register("select.name")} placeholder="Name ... " />
              <label>Property</label>
              <input
                {...register("select.property")}
                placeholder="Property ..."
              />
              <label>Options</label>
              <div className={cx("option_list")}>
                {options.length > 0 &&
                  options.map((option, index) => (
                    <div className={cx("option_item")} key={index}>
                      <input
                        value={option}
                        placeholder="Option ..."
                        onChange={(e) => {handleChangeValueOption(option, index, e)}}
                      />
                        <DeleteOutlined onClick={() => handleRemoveOption(option, index)}/>
                    </div>
                  ))}
              </div>
              <a href="#/" onClick={handleAddOption}>
                <p>Add options</p>
                <PlusOutlined /> 
              </a>
              <button type="submit">Update</button>
            </form>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FilterMenu;
