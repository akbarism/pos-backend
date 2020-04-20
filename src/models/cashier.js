const connection = require('../configs/db');

module.exports = {
    getCashier: (search)=>{
        return new Promise((resolve, reject)=>{
            if(search){
                connection.query("SELECT * FROM cashier WHERE name LIKE ? ORDER BY name", `%${search}%`,(err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))
                    }
                })
            // }else if (page){
            //     connection.query("SELECT menu.*, category.name_category FROM menu INNER JOIN category ON menu.id_category = category.id_category LIMIT" + (page * 3 - 3) +",3",(err, result)=>{
            //         if(!err){
            //             resolve(result)
            //         }else{
            //             reject(new Error(err))
            //         }
            //     })
            }
            else{
                connection.query("SELECT * FROM cashier", (err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))
                    }
                })
            }
        })
    },
    insertCashier: (data)=> {
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO cashier SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    updateCashier:(id_cashier,data)=>{
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE cashier SET ? WHERE id_cashier = ?",[data,id_cashier], (err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    cashierDetail:(id_cashier)=>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE cashier SET id_cashier?",[data, id_cashier], (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    deleteCashier:(id_cashier)=>{
        return new Promise((reolve, reject)=>{
            connection.query("DELETE FROM cashier WHERE id_cashier = ?", id_cashier,(err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    login: email => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM cashier WHERE email = ?', email, (err, result) => {
                if (!err) {
                    resolve(result[0]);
                } else {
                    reject(new Error(err));
                }
            });
        });
    }
}