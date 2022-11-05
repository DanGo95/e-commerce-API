const User = require('../models/user');
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

const emailExists = async(email) => {
    const checkEmail = await User.findOne({email});

    if( checkEmail ) {
        throw new Error('El email ya se encuentra registrado');
    }
};

const usernameExists = async(username) => {
    const checkUsername = await User.findOne({username});

    if (checkUsername) {
        throw new Error('El nombre de usuario ya se encuentra en uso');
    }
};

const categoryNameExists = async(name) => {
    const categoryName = name.toUpperCase();
    const categoryDB = await Category.findOne({name: categoryName});

    if (categoryDB) {
        throw new Error(`La categoría ${categoryDB.name} ya existe`);
    }
};

const categoryExists = async(id) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new Error('La categoría no existe');
    }
};

const subcategoryNameExists = async(name) => {
    const subcategoryName = name.toUpperCase();
    const subcategoryDB = await Subcategory.findOne({name: subcategoryName});

    if (subcategoryDB) {
        throw new Error(`La subcategoría ${subcategoryDB.name} ya existe`);
    }
};

const subcategoryExists = async(id) => {
    const subcategory = await Subcategory.findById(id);

    if (!subcategory) {
        throw new Error('La subcategoría no existe');
    }
};

module.exports = {
    emailExists,
    usernameExists,
    categoryNameExists,
    categoryExists,
    subcategoryNameExists,
    subcategoryExists
};