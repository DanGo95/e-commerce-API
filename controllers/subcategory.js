const { response } = require("express");
const Subcategory = require("../models/subcategory");


const getSubcategories = async(req, res = response) => {
    const subcategories = await Subcategory.find()
        .populate('user', 'username')
        .populate('category', 'name');

    res.json(subcategories);
};


const createSubcategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
    const { category } = req.body;

    const data = {
        name,
        category,
        user: req.user._id
    };

    const subcategory = new Subcategory(data);
    await subcategory.save();

    res.status(201).json(subcategory);

};


const updateSubcategory = async(req, res = response) => {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const { category } = req.body;

    await Subcategory.findByIdAndUpdate(id, { name, category });

    res.json({
        msg: 'La subcategoría se actualizó correctamente'
    });

};

const deleteSubcategory = async(req, res = response) => {

    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);

    res.json({
        msg: 'La subcategoría se eliminó correctamente'
    });

};


module.exports = {
    getSubcategories,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory
};