import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from 'morgan';

import connectDB from './config/db/db.js'

import ProductRouter from './routers/ProductRouter.js'
import UserRouter from './routers/UserRouter.js'
import OrderRouter from './routers/OrderRouter.js'
import ChatRouter from './routers/ChatRouter.js'

import {createServer} from 'http'
// import {Server} from 'socket.io'

import cloudinary from './config/cloudinary/cloudinary.js'
import PaymentRouter from './routers/PaymentRouter.js'
import SelectListrouter from './routers/SelectListRouter.js'
import ListTypeProductRouter from './routers/ListTypeProductRouter.js'
import CategoryRouter from './routers/CategoryRouter.js';
import { ConnectSocket } from './config/socket/socket.js';

dotenv.config();
process.env.TOKEN_SECRET;

const app = express()
const PORT = process.env.PORT || 5000
const server = createServer(app)

ConnectSocket(server)
connectDB()

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(logger('dev'));
app.use('/api/v1/products', ProductRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/orders', OrderRouter)
app.use('/api/v1/chat', ChatRouter)
app.use('/api/v1/payment', PaymentRouter)
app.use('/api/v1/selectList', SelectListrouter)
app.use('/api/v1/typeList', ListTypeProductRouter)
app.use('/api/v1/category', CategoryRouter)

app.get('/api/v1/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});
server.listen(PORT, () => console.log(`server running on port ${PORT}`))