const models = require("../../models/index");
const outlet = models.outlet;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    controllerGetAll:(req,res)=>{
        outlet.findAll()
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerGetId:(req,res)=>{
        const param = { id_outlet: req.params.id_outlet}
        outlet.findOne({where:param})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerAdd:(req,res)=>{
        const data = {
            lokasi: req.body.lokasi,
            alamat:req.body.alamat,
            nama_outlet:req.body.nama_outlet
        }
        outlet.create(data)
        .then(result => {
            res.json({
                success : 1,
                data : result,data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerEdit:(req,res)=>{
        const param = { id_outlet: req.body.id_outlet}
        const data = {
            id_outlet  : req.body.id_outlet,
            lokasi : req.body.lokasi,
            alamat: req.body.alamat,
            nama_outlet:req.body.nama_outlet
        }
        outlet.update(data , {where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result,data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerDelete: (req,res)=>{
        const param = { id_outlet: req.params.id_outlet}
        outlet.destroy({where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerAuth: async (req,res)=>{
        const data = {
            email : req.body.email,
            password : md5(req.body.password)
        }
        let result = await outlet.findOne({where: data})
        if(result){
            // generate token
            let token = jwt.sign({ sub: result.id_outlet, role: result.role }, config.secret)
            res.json({
                logged: true,
                data: result,
                token: token
            })
        }else{
            res.json({
                logged: false,
                message: "Username or password is incorrect",
                data: result
            })
        }   
    }
}
