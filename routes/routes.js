"use strict"

const express  = require('express');
const router   = express.Router();
const mainController     = require('../controllers/MainController');

// USER
router.get('/data', (req, res, next) => mainController.getData(req, res, next));
router.get('/data/:dataId', (req, res, next) => mainController.getDataById(req, res, next));
router.post('/data', (req, res, next) => mainController.createData(req, res, next));
router.patch('/data/:dataId', (req, res, next) => mainController.getDataByIdAndUpdate(req, res, next));
router.delete('/data/:dataId', (req, res, next) => mainController.deleteDataById(req, res, next));

module.exports = router;