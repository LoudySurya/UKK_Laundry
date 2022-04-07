const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    controllerAuth,
    } = require('./outlet.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner} = require('../auth/role');

// routes
router.get('/',authorize , controllerGetAll); //admin only
router.get('/:id_outlet', controllerGetId); //admin only
router.post('/',authorize, controllerAdd); // all authenticated users
router.put('/', controllerEdit); //admin only
router.delete('/:id_outlet',authorize, controllerDelete); //admin only
router.post('/auth', controllerAuth); //public route
module.exports = router;
