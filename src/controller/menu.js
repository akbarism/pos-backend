const menuModel = require('../models/menu');
const miscHelper = require('../helpers/helper');

module.exports = {
    getMenu:(req,res)=>{
        var jumlah = 0;
        menuModel.getMenu()
            .then((result) => {
                jumlah = result.length;
            });
        const search = req.query.search;
        const page = req.query.page;
        menuModel.getMenu(search, page)
        .then((result)=>{
            const jumlah = result.length;
            miscHelper.response(res, result, 200, 'All Menu', jumlah)
        })
    },
    insertMenu: (req, res)=>{
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
        menuModel.insertMenu(data)
        .then((result)=>{
            miscHelper.response(res, result, 200, 'Insert Menu Success')
            console.log(data);
            
        })
    },
    menuDetail:(req, res)=>{
        const idMenu = req.params.id_menu   
        menuModel.menuDetail(idMenu)
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
    updateMenu:(req, res)=>{
        const idMenu = req.params.id_menu
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
        menuModel.updateMenu(idMenu, data)
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
    deleteMenu: (req, res)=>{
        const idMenu = req.params.id_menu
        menuModel.deleteMenu(idMenu)
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
    }
}
