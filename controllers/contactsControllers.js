import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (_, res) => {
  const movies = await contactsService.listContacts();
  res.json(movies);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getOneContact({ _id: id });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact({ _id: id });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const contact = await contactsService.updateContact({ _id: id }, req.body);

  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const contact = await contactsService.updateContact({ _id: id }, body);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
