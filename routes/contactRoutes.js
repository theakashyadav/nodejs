const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require('../controllers/contactControllers');
const validateToken = require("../middlesware/validateTokenHandler");

router.use(validateToken);


// * Get all Contacts && Create Contacts
router.route('/').get(getContacts).post(createContact);

// * Get Contacts for && Update Contacts && Delete Contacts
router
  .route('/:id')
  .get(getContactById)
  .put(updateContactById)
  .delete(deleteContactById);

module.exports = router