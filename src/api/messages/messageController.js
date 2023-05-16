const MessageManager = require('../../dao/db/MessageManager');
const messageManager = new MessageManager();

exports.getAllMessages = async (req, res) => {
    const messages = await messageManager.getMessages();
    res.json(messages);
};

exports.getMessageById = async (req, res) => {
    const message = await messageManager.getMessageById(req.params.id);
    res.json(message);
};

exports.createMessage = async (req, res) => {
    await messageManager.addMessage(req.body);
    res.status(201).send();
};

exports.updateMessage = async (req, res) => {
    await messageManager.updateMessage(req.params.id, req.body);
    res.status(200).send();
};

exports.deleteMessage = async (req, res) => {
    await messageManager.deleteMessage(req.params.id);
    res.status(200).send();
};
