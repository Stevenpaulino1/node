const path = require('path')

const express = require('express')

const adminController = require("../controllers/admin")

const products = []

router = express.Router()


router.get('/add-product', adminController.getAddProduct)
router.get('/products', adminController.getProducts)
router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)
router.post('/add-product', adminController.postAddProduct)


module.exports.routes = router
