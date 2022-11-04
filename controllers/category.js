const { response } = require("express");
const Category = require("../models/category");


const getCategories = async(req, res = response) => {

    const categories = await Category.find().populate('user', 'username');
    res.json(categories);

};


const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const data = {
        name,
        user: req.user._id
    };

    const category = new Category(data);
    await category.save();

    res.status(201).json(category);

};


const updateCategory = async(req, res = response) => {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    await Category.findByIdAndUpdate(id, { name });

    res.json({
        msg: 'La categoría se actualizó correctamente'
    });

};

const deleteCategory = async(req, res = response) => {

    const { id } = req.params;
    await Category.findByIdAndDelete(id);

    res.json({
        msg: 'La categoría se eliminó correctamente'
    });

};


module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};