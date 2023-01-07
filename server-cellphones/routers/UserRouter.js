import express from 'express'
import {getAllUser, registerUser, login, DeleteUser, GetUserProfile, UpdateProfile} from '../controllers/UserController.js'
import validate from '../Validator/Validator.js'
const UserRouter = express.Router()
import {isAuth, isAdmin, verifyToken, protect} from '../untils/until.js'

UserRouter.post('/register',validate.validateRegisterUser(), registerUser)
UserRouter.post('/login', validate.validateLoginUser(), login)

UserRouter.get('/', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)
UserRouter.get('/profile', protect, GetUserProfile)
UserRouter.put('/update/profile',protect ,UpdateProfile)
UserRouter.get('/token', protect, (req, res) => {
    res.status(200).send({message: 'TokenExpiredError'})
})

export default UserRouter
