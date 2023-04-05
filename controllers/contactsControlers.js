const { Contact } = require("../models/contacts");

const getContactsAll = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const allContacts = await Contact.find({ owner })
    .limit(Number(limit))
    .skip(Number(skip));
  if (!favorite) {
    res.status(200).json(allContacts);
  } else {
    const favoriteContacts = allContacts.filter(
      (contact) => contact.favorite.toString() === favorite
    );
    res.status(200).json(favoriteContacts);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);

  if (!contactById) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id: owner } = req.user;

  const newContact = await Contact.create({ name, email, phone, owner });
  console.log("NewContact", newContact);
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const response = await Contact.findByIdAndRemove(contactId);

  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const upContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log("upContact", upContact);
  if (!upContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(upContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const upContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!upContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(upContact);
};

module.exports = {
  getContactsAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
