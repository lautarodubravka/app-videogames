const Message = require('../models/Message');

class MessageManager {
    async getMessages() {
        return await Message.find({});
    }

    async getMessageById(id) {
        return await Message.findById(id);
    }

    async addMessage(message) {
        const newMessage = new Message(message);
        await newMessage.save();
    }

    async updateMessage(id, updatedMessage) {
        await Message.findByIdAndUpdate(id, updatedMessage);
    }

    async deleteMessage(id) {
        await Message.findByIdAndDelete(id);
    }
}

module.exports = MessageManager;
