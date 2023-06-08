const MessageManager = require('../Mongo/MessageManager.mongo');
const messageManager = new MessageManager();

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await messageManager.getMessages();
        res.json(messages);
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while retrieving messages.' });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await messageManager.getMessageById(req.params.id);
        res.json(message);
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while retrieving the message.' });
    }
};

exports.createMessage = async (req, res) => {
    try {
        await messageManager.addMessage(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while creating the message.' });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        await messageManager.updateMessage(req.params.id, req.body);
        res.status(200).send();
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while updating the message.' });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await messageManager.deleteMessage(req.params.id);
        res.status(200).send();
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while deleting the message.' });
    }
};
