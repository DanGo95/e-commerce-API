const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'], unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


CategorySchema.methods.toJson = function() {
    const { __v, ...category } = this.toObject();
    return category;
};

module.exports = model('Category', CategorySchema);