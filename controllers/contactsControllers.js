import * as contactsService from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const movies = await contactsService.listContacts();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const body = req.body;
    const contact = await contactsService.updateContact(id, body);
    if (!contact) {
      throw HttpError(400, "Not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
};
