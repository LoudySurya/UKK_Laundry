const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    controllerAuth,
    } = require('./paket.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner} = require('../auth/role');
const auth = require('../auth/authorize');

// routes
router.get('/',authorize,  controllerGetAll); //admin only
router.get('/:id_paket', controllerGetId); //admin only
router.post('/',authorize, controllerAdd); // all authenticated 
router.put('/', controllerEdit); //admin only
router.delete('/:id_paket',controllerDelete); //admin only
router.post('/auth', controllerAuth); //public route
module.exports = router;
