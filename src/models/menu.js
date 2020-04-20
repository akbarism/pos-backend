const connection = require('../configs/db');

module.exports = {
    getMenu: (search, page)=>{
        return new Promise((resolve, reject)=>{
            if(search){
                connection.query("SELECT * FROM menu WHERE name LIKE ? ORDER BY name", `%${search}%`,(err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))
                    }
                })
            }else if (page){
                connection.query('SELECT * FROM menu LIMIT ' + (page * 9 - 9) + ', 9', (err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))
                    }
                })
            }
            else{
                connection.query("SELECT menu.*, category.name_category FROM menu INNER JOIN category ON menu.id_category = category.id_category", (err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))
                    }
                })
            }
        })
    },
    insertMenu: (data)=> {
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO menu SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    updateMenu:(id_menu,data)=>{
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE menu SET ? WHERE id_menu = ?",[data,id_menu], (err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    menuDetail:(id_menu)=>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE menu SET id_menu?",[data, id_menu], (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    deleteMenu:(id_menu)=>{
        return new Promise((reolve, reject)=>{
            connection.query("DELETE FROM menu WHERE id_menu = ?", id_menu,(err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}