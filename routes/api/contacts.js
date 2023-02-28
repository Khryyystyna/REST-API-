const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contact');

const schemas = require('../../models/contact');

const {validateBody, isValidId} = require('../../middlewares')

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// router.delete('/:contactId', isValidId, ctrl.removeContact);

// router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router






