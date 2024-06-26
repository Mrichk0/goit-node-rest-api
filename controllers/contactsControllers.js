import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import getFilterWithIdOwner from "../helpers/getFilterWithIdOwner.js";

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const filter = { owner };

  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }

  const contacts = await contactsService.listContacts({ filter, settings });
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const filter = getFilterWithIdOwner(req);
  const contact = await contactsService.getOneContact(filter);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const filter = getFilterWithIdOwner(req);
  const contact = await contactsService.removeContact(filter);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await contactsService.addContact(...req.body, owner);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const filter = getFilterWithIdOwner(req);

  const contact = await contactsService.updateContact(filter, req.body);

  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const filter = getFilterWithIdOwner(req);
  const body = req.body;

  const contact = await contactsService.updateContact(filter, body);
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
