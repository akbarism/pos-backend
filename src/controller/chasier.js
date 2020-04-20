const cashierModel = require('../models/cashier');
const miscHelper = require('../helpers/helper');
const {genSaltSync,compareSync,hashSync} = require('bcrypt');
require('dotenv').config();

module.exports = {
    getCashier:(req,res)=>{
        const search = req.query.search;
        const page = req.query.page;
        cashierModel.getCashier(search, page)
        .then((result)=>{
            miscHelper.response(res, result, 200, 'All Menu')
        })
        .catch((err)=>{
            miscHelper.response(res, err, 500, 'Get Menu Failed')
        })
    },
    insertCashier: (req, res)=>{
        const {
            name_cashier,
            email,
            password,
        } = req.body
        const data = {
            name_cashier,
            email,
            password
        }
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        cashierModel.insertCashier(data)
        .then((result)=>{
            miscHelper.response(res, result, 200, 'Insert Menu Success')
            console.log(data);
            
        })
        .catch((err)=>{
            miscHelper.response(res, err, 404, 'Insert Menu Failed')
        })
    },
    cashierDetail:(req, res)=>{
        const idCashier = req.params.id_cashier
        cashierModel.cashierDetail(idCashier)
        .then((result)=>{
            if(result.length == 0){
                miscHelper.response(res, result, 404, 'menu not found')
            }else{
                miscHelper.response(res, result, 200, 'this is it')
            }
        })
        .catch((err)=>{
            miscHelper.response(res, err, 500, 'get menu detail goes wrong')
        })
    },
    updateCashier:(req, res)=>{
        const idCashier = req.params.id_cashier
        const {
            name,
            price,
            id_category,
        } = req.body
        const data = {
            name,
            price,
            image: `http://localhost:2000/uploads/${req.file.filename}`,
            id_category
        }
        cashierModel.updateCashier(idCashier, data)
        .then((result)=>{
            if(result.affectedRows == 0){
                miscHelper.response(res, result, 404, 'field canot be null')
            }else{
                miscHelper.response(res, result, 200, 'update menu success')
            }
        })
        .catch((err)=>{
            miscHelper.response(res, err, 404, 'update menu failed')
        })
    },
    deleteCashier: (req, res)=>{
        const idCashier = req.params.id_cashier
        cashierModel.deleteCashier(idCashier)
        .then((result)=>{
            if(result.affectedRows == 0){
                miscHelper.response(res, result, 404, 'menu id is not defined')
            }else{
                miscHelper.response(res, result, 200, 'delete menu succes')
            }
        })
        .catch((err)=>{
            miscHelper.response(res, err, 404, 'delete menu failed')
        })
    },
    login: (req,res)=> {
        const {
            email,
            password
        } = req.body
        const data = {
            email,
            password
        }
        if(req.body.email == '' || req.body.password == ''){
            helpers.response(res,null,404,'email atau password tidak boleh kosong!')
        }
        cashierModel.login(data.email)
        .then((result)=> {
            const data = {
                email,
                password
            }
            const results = compareSync(data.password,result.password)
            if(results){
                miscHelper.response(res,result,200,'login sukses')
            }else{
                miscHelper.response(res,err,404,'Your Password Wrong!')
            }
        })
        .catch((err)=> {
            miscHelper.response(res,err,500, 'Your Email Not Found!')
        })
        console.log(data);
        
    },
}
