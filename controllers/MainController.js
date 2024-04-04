"use strict"

const logger      = require('../utils/logger');
const Data        = require('../models/data.model');
const sendEmail = require('../utils/emails');
const utilsController = require('./UtilsController');
const self        = {};
const utils       = require('../utils/utils');
const config = require('../config');

self.getData = async (req, res) => {  
  try {
    const data = await Data.find({deletedAt: null});
    console.log('get data', JSON.stringify(data))
    logger.info('get data', JSON.stringify(data))
    res.json(data);
  } catch (e) {
    logger.error('get users', e.message)
    res.json({error: e.message})
  }
};

self.createData = async (req, res) => {
  try {
    const data = {'data': req.body.data}
    const newData = await Data.create(data);
    await utilsController.createLog('Data created', JSON.stringify(newData));
    return res.json(newData);
  } catch (e) {
    await utilsController.createLog('Data creation error', e.message);
    console.log('Data creation error', e.message)
    res = utils.handleError(res, e);
  }
};

self.deleteDataById = async (req, res) => {  
  try {
    const userId = req.params.userId;

    const filter = { _id: userId };
    const update = {deletedAt: Date.now()};

    await User.findOneAndUpdate(filter, update)
    const updatedUser = await User.findOne({_id: userId})
    await utilsController.createLog('User deleted', JSON.stringify(updatedUser));
    logger.info('delete user by id', userId)
    res.json(updatedUser);
  } catch (e) {
    logger.error('delete user by id', e.message)
    res.json({error: e.message})
  }
};

self.getDataByIdAndUpdate = async (req, res) => {  
  try {
    const dataId = req.params.dataId;

    const filter = { _id: dataId, deletedAt: null };
    const update = req.body;

    await Data.findOneAndUpdate(filter, update)
    const updatedData = await Data.findOne({_id: dataId})
    console.log('update data by id', dataId, ' update', JSON.stringify(update))
    await utilsController.createLog('Data updated', JSON.stringify(updatedData));
    res.json(updatedData);
  } catch (e) {
    logger.error('update data by id', e.message)
    res.json({error: e.message})
  }
};

self.getDataById = async (req, res) => {  
  try {
    const dataId = req.params.dataId;
    const data = await Data.findOne({_id: dataId, deletedAt: null})
    logger.info('get data by id', dataId)
    res.json(data);
  } catch (e) {
    logger.error('get data by id', e.message)
    res.json({error: e.message})
  }
};

module.exports = self;