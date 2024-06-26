import Contact from "../models/Contact.js";

function listContacts(params = {}) {
  const { filter = {}, fields = null, settings = {} } = params;
  const { skip = 0, limit = 20 } = settings;
  return Contact.find(filter, fields).skip(skip).limit(limit);
}

function getOneContact(filter) {
  return Contact.findOne(filter);
}

function removeContact(filter) {
  return Contact.findByIdAndDelete(filter);
}

function addContact(data) {
  return Contact.create(data);
}

function updateContact(filter, data) {
  return Contact.findOneAndUpdate(filter, data);
}
export {
  listContacts,
  getOneContact,
  addContact,
  removeContact,
  updateContact,
};
