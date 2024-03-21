import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import { AppstoreAddOutlined, ToolOutlined } from "@ant-design/icons";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Pagination } from "antd";

import { deleteProduct, getAllProducts } from "~/appRedux/actions/productAction";
import Loading from "~/components/Loading";
import { formatPrice } from "~/untils";

import classNames from "classnames/bind";
import { useEffect } from "react";
import { routesAdmin } from "~/config";
import styles from "./ProductList.module.scss";

const cx = classNames.bind(styles);

function ProductList() {
  const dispatch = useDispatch();
 
  const data = useSelector((state) => state.product.products);
  const pages = useSelector((state) => state.product.pages);

  const current = useSelector((state) => state.product.current);
  let loading = useSelector((state) => state.product.isLoading);

  const handleChangePage = async (number) => {
    await dispatch(getAllProducts("", number));
  }
  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProducts());
  };

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  const temps = data?.map((item, index) => ({
    id: item._id,
    stt: index +1,
    amount: item.amount,
    name: item.name,
    image: item.image,
    status: item.status,
    price: formatPrice(item.price),
    salePrice: formatPrice(item.salePrice),
    type: item.type,
    slug: item.slug,
  }));

  const columns = [
    { field: "stt", headerName: "ID", editable: true, width: 90 },
    { field: "amount", headerName: "Stock", editable: true, width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "type", headerName: "Type", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const amount = params.row.amount;
        return (
          <div
            className={`status-product ${
              amount > 0 ? "stocking" : "outStoking"
            }`}
          >
            <span>{params.row.status}</span>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price (VND)",
      width: 150,
    },
    {
      field: "salePrice",
      headerName: "Sale (VND)",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/update/${params.row.slug}`}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("action")}>
        <Link to={routesAdmin.create}>
          <div className={cx("iconC")}>
            <AppstoreAddOutlined />
            <span>Create a product</span>
          </div>
        </Link>
        <Link to={routesAdmin.infoPrd}>
          <div className={cx("iconC", "detail")}>
            <ToolOutlined />
            <span>Create detail product</span>
          </div>
        </Link>
      </div>
      <div className={cx("content")}>
        {loading && <Loading title="Vui lòng chờ..." />}
        <DataGrid
          rows={temps}
          disableSelectionOnClick
          columns={columns}
          checkboxSelection
          hideFooter={true}
          hideFooterPagination= {true}
        />
      </div>
      <div className={cx("pagination")}>
        <Pagination
          defaultCurrent={1}
          current={current}
          total={pages * 10}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ProductList;
