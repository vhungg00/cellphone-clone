import axiosCreate from './axiosClient';

import { API_ENDPOINT } from '~/constants';

let config = {
    headers: {
        "Content-Type": "application/json",
        'Token': "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7",
      },
}

const cellphonesApi = {
    getAllCategory: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_LIST_CATEGORY);
        return res;
    },
    getProductByCate: async (slugCate) => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_PRODUCT_BY_CATE, {
            params: {
                slug: slugCate
            }
        })
        return res;
    },


    searchProduct: async (search, page=1) => {
        let res = await axiosCreate().get(API_ENDPOINT.SEARCH_PRODUCT, {
            params: {
                search,
                page: 1,
            }
        })
        return res;
    },
    getAllProduct: async (q, page) => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_ALL_PRODUCT, {
            params: {
                q,
                page: page || 1 
            }
        })
        return res;        
    },
    getAllProductAdmin: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_ALL_PRODUCT_ADMIN)
        return res;
    },
    getPrdDetailBySlug: async(slug) => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_PRODUCT_BY_SLUG, {
            params: {
                slug
            }
        })
        return res
    },
    createPrd: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.CREATE_PRODUCT, payload);
        return res;
    },
    updatePrd: async (id, payload, isAdmin) => {
        let res = await axiosCreate().put(API_ENDPOINT.UPDATE, payload, {
            params: {
                id
            }
        }, isAdmin);
        return res;
    },
    deletePrd: async (id, isAdmin) => {
        let res = await axiosCreate().delete(API_ENDPOINT.DELETE_PRODUCT, {
            params: {
                id
            }
        }, isAdmin);
        return res;
    },


    login: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.LOGIN, payload)
        return res;
    },
    register: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.REGISTER, payload)
        return res;
    },
    logOutUser: async () => {
        await localStorage.removeItem('USER_ID')
        await localStorage.removeItem('USER_TOKEN')
        await localStorage.removeItem('INFO_LOGIN')
        await localStorage.removeItem('AUTH_INFO')
    },
    getallTypePrd: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_ALL_TYPE_PRODUCT)
        return res;
    },
    createTypePrd: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.CREATE_NEW_TYPE_PRODUCT, payload)
        return res;
    },
    deleteTypePrd: async (id, isAdmin) => {
        let res = await axiosCreate().delete(API_ENDPOINT.DELETE_TYPE_PRODUCT,{
            params: {
                id
            }
        }, isAdmin)
        return res;
    },

    createSelectPrd: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.CREATE_NEW_SELECT_PRODUCT, payload);
        return res;
    },
    getAllSelectPrd: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_ALL_SELECT_LIST);
        return res;
    },
    updateSelectPrd: async (id, payload, isAdmin) => {
        let res = await axiosCreate().put(API_ENDPOINT.UPDATE_SELECT_PRODUCT,payload, {
            params: {
                id
            }
        }, isAdmin);
        return res;
    },
    deleteSelectPrd: async (id, isAdmin) => {
        let res = await axiosCreate().delete(API_ENDPOINT.DELETE_SELECT_PRODUCT, {
            params: {
                id
            }
        }, isAdmin);
        return res;
    },

    createOrd: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.ORDER_CREATE, payload);
        return res;
    },
    
    paymentCreate: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.PAYMENT_CREATE, payload);
        return res;
    },

    getProvince: async () => {

        let res = await axiosCreate().get(API_ENDPOINT.GET_PROVINCE, config);
        return res;
    },
    getDistrict: async (value) => {
        let config = {
            headers: {
                Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7"
              },
              params: {
                province_id: value
              }
        }
        let res = await axiosCreate().get(API_ENDPOINT.GET_DISTRICT, config)
        return res;
    },
    getWard: async (value) => {
        let config = {
            headers: {
                Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7"
              },
              params: {
                district_id: value
              }
        }
        let res = await axiosCreate().get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?${value}`, config)
        return res;
    },

    configPaypal: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.PAYPAL_CONFIG);
        console.log('res1321: ', res);
        return res;
    },
    getOrderDetail: async (id) => {
        let res = await axiosCreate().get(API_ENDPOINT.ORDER_DETAIL,{
            params: {
                id
            }
        });
        return res;
    },
    orderPayment: async (orderId, paymentResult) => {
        let res = await axiosCreate().put(`/orders/${orderId}/pay`,paymentResult);
        return res;
    },
    deliveredOrd: async (orderId, payload) => {
        let res = await axiosCreate().put(`/orders/${orderId}/delivered`, payload);
        return res;
    },
    orderMyList: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.LIST_MY_ORDER);
        return res;
    },
    getALLOrders: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.ADMIN_GET_ALL_ORDER);
        return res;
    },
    getUserProfile: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_PROFILE);
        return res;
    },
    updateProfile: async (user) => {
        let res = await axiosCreate().put(API_ENDPOINT.UPDATE_PROFILE, user);
        return res;
    },
    createReviewProduct: async (productId, review) => {
        let res = await axiosCreate().post(`/products/${productId}/review`, review);
        return res;
    },
    chatMessage: async (id) => {
        let res = await axiosCreate().get(`${API_ENDPOINT.CHAT_MESSAGE}${id}`);
        return res;
    },
    chatIdConversation: async (id) => {
        let res = await axiosCreate().get(`${API_ENDPOINT.CHAT_IDCONVERSATION}${id}`);
        return res;
    },
    chatList: async () => {
        let res = await axiosCreate().get(API_ENDPOINT.CHAT_LIST);
        return res;
    },
    createChat: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.CREATE_CHAT, payload);
        return res;
    },
    getAllSlider: async (payload) => {
        let res = await axiosCreate().get(API_ENDPOINT.GET_ALL_SLIDER)
        return res;
    },
    createSlider: async (payload) => {
        let res = await axiosCreate().post(API_ENDPOINT.CREATE_SLIDER, payload)
        return res;
    },
    deleteSlider: async (id) => {
        let res = await axiosCreate().delete(API_ENDPOINT.DELETE_SLIDER, {
            params: {
                id
            }
        })
        return res;
    }

}

export default cellphonesApi;