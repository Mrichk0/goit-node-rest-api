import express from "express";
import contactControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactControllers.deleteContact);

contactsRouter.post(
  "/",

  isEmptyBody,
  validateBody(createContactSchema),
  contactControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactControllers.updateStatusContact
);

export default contactsRouter;
