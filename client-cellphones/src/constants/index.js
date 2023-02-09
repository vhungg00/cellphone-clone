export const API_ENDPOINT = {
  GET_LIST_CATEGORY: "/category/get-allcategory",
  CREATE_CATEGORY: '/category/add-category',
  DELETE_CATEGORY: '/category/delete-category/:id',
  GET_PRODUCT_BY_CATE: 'products/category/slugCate',

  SEARCH_PRODUCT: "/products/search",
  GET_ALL_PRODUCT: "/products",
  GET_ALL_PRODUCT_ADMIN: "/products/all_product",
  GET_PRODUCT_BY_SLUG: "/products/slug",
  CREATE_PRODUCT: "/products/create",
  UPDATE_PRODUCT: "/products/update/id",
  DELETE_PRODUCT: "/products/delete/id",

  LOGIN: "/user/login",
  REGISTER: "/user/register",

  GET_ALL_TYPE_PRODUCT: '/typeList',
  CREATE_NEW_TYPE_PRODUCT: '/typeList/create',
  DELETE_TYPE_PRODUCT: '/typeList/delete/id', 

  CREATE_NEW_SELECT_PRODUCT: '/selectList/create',
  GET_ALL_SELECT_LIST: '/selectList',
  UPDATE_SELECT_PRODUCT: '/selectList/update/id',
  DELETE_SELECT_PRODUCT: '/selectList/delete/id',
  DETAIL_SELECT_PRODUCT: '/selectList/detail/id',

  ORDER_CREATE: '/orders/create',
  PAYMENT_CREATE: '/payment/create',

  GET_PROVINCE: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
  GET_DISTRICT: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
  GET_WARD:'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward',
  PAYPAL_CONFIG: '/config/paypal',
  ORDER_DETAIL: '/orders/order_detail',
  LIST_MY_ORDER: '/orders',
  ADMIN_GET_ALL_ORDER: '/orders/all',
  UPDATE_PROFILE: '/user/update/profile',
  CREATE_PRODUCT_REVIEW: '/products',

  CHAT_MESSAGE: '/chat/message?idUser=',
  CREATE_CHAT: '/chat/save',
  CHAT_IDCONVERSATION : '/chat/message?idConversation=',
  CHAT_LIST: '/chat',
  
  GET_ALL_SLIDER: '/slider',
  CREATE_SLIDER: '/slider/create',
  DELETE_SLIDER: '/slider/delete/id',
  COMMENT_PRODUCT: '/products/comment',
  REP_CMT_PRODUCT: '/products/rep/comment',
};

export const RULES_ANTD = {
  name: [{required: true, message: "Vui lòng nhập trường này"}],
  phone: [{required: true, pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g), message: "Vui lòng điền số điện thoại"}],
  provinces: [
    {
      required: true,
      message: "Bạn chưa chọn tỉnh thành",
    },
  ],
  districts: [
    {
      required: true,
      message: "Bạn chưa chọn quận huyện",
    },
  ],
  wards: [
    {
      required: true,
      message: "Bạn chưa chọn phường xã",
    },
  ],
  email: [
    { type: "email", message: "VD: abc@example.com" },
    { required: true, message: "Bạn chưa nhập đầy đủ thông tin" },
  ],
  password: [
    {
      required: true,
      message: "Bạn chưa  nhập đầy đủ thông tin",
    },
    {
      min: 6,
      message: "Bạn phải nhập ít nhất 6 kí tự",
    },
  ],
  more: [
    {required: true, message: "Vui lòng nhập trường này"}
  ]
};

export const sortPrioritize = (array1, array2) => {
  if (array1 && array1.length > 0) {
    if (array2 && array2.length > 0) {
      let temp = array1;
      for (let i = 0; i < array2.length; i++) {
        temp = temp.filter((x) => x.name !== array2[i].name.trim());
      }
      temp.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      //   console.log("temp", temp);

      let res = [];
      for (let i = 0; i < array2.length; i++) {
        let a = array1.filter((x) => x.name === array2[i].name.trim());
        res = res.concat(a);
      }
      //   console.log("res", a);
      let value = res.concat(temp);
      // console.log(value);
      return value;
    } else
      return array1.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
  }
  return null;
};
