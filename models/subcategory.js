const { Schema, model } = require('mongoose');

const SubcategorySchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'], unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


SubcategorySchema.methods.toJson = function() {
    const { __v, ...subcategory } = this.toObject();
    return subcategory;
};

module.exports = model('Subcategory', SubcategorySchema);