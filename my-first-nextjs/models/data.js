const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
});

export default mongoose.models.Data || mongoose.model("Data", DataSchema);

