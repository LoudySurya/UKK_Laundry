const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    } = require('./member.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner, IsAdminKasir} = require('../auth/role');

// routes
router.get('/',controllerGetAll); //admin only
router.get('/:id_member', controllerGetId); //admin only
router.post('/',  controllerAdd); // kasir only
router.put('/', controllerEdit); //kasir only
router.delete('/:id_member' , controllerDelete); //admin only
module.exports = router;