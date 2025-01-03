const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
