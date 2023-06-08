const Message = require('../models/Message.model');

class MessageManager {
    async getMessages() {
        try {
            return await Message.find({});
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getMessageById(id) {
        try {
            return await Message.findById(id);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async addMessage(message) {
        try {
            const newMessage = new Message(message);
            await newMessage.save();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateMessage(id, updatedMessage) {
        try {
            await Message.findByIdAndUpdate(id, updatedMessage);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async deleteMessage(id) {
        try {
            await Message.findByIdAndDelete(id);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = MessageManager;
