const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    // eslint-disable-next-line no-useless-concat
    productDetail: '/product-detail/:slug',
    search: '/product/search',
    category: '/category/:slugCate',
    cart: '/cart/:slug',
    order: '/order',
    allProduct: '/all-products',
    shipping: '/shipping',
    payment: '/payment',
    placeorder: '/placeorder',
    orderId: '/order/:id',
    profile: '/profile',
    notFound: '*',
}

const routesAdmin = {
    home: '/admin-h',
    listProduct:'/admin/products',
    appChat: '/app-chat',
    infoPrd: '/admin/product/create/info',
    create: '/admin/product/create',
    update: '/admin/product/update',
    order: '/admin/order',
    orderDetail: '/admin/order/:id',
}
export {routes, routesAdmin};