import expressAsyncHandler from 'express-async-handler'
import cloudinary from 'cloudinary'
import { ListTypeProductModel } from '../models/ListTypeProductModel.js'

export const getAllTypeProduct = expressAsyncHandler(async (req, res) => {
    try {
        const allType = await ListTypeProductModel.find({})
        if(allType) {
            res.status(200).send({status: 200, success: true, data: allType, message: 'Get all type products successfully'})
        } else {
            res.status(400).send({ status: 400, success: false, message: 'Get all type product fail' })
        }
    } catch (err) {
        res.status(400).send({ status: 400, success: false, message: 'Get all type product fail' })
    }
})

export const createNewTypeProduct = expressAsyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "dev_setups",
          });
        const newType = new ListTypeProductModel({
            name: req.body.name,
            img: result.secure_url,
            cloudinary_id: result.public_id,
        })
        if(newType) {
            await newType.save()
            res.status(200).send({ status: 200, success: true, data: newType, message: 'Successfully'});
        }
        else {
            res.status(400).send({ status: 400, success: false, message: 'Get all type product fail' })
        }
    } catch (err) {
        res.status(400).send({ status: 400, success: false, message: 'Get all type product fail' })
    }
 
})

export const deleteTypeProduct = expressAsyncHandler(async (req, res) => {
    const typeProduct = await ListTypeProductModel.findById({_id: req.query.id})
    await cloudinary.uploader.destroy(typeProduct.cloudinary_id)

    if(typeProduct){
        await typeProduct.remove()
        res.status(200).send({status: 200, success: true,  message: 'deleted type product'})
    }else{
        res.status(400).send({ status: 400, success: false, message: 'product not found'})
    }

})