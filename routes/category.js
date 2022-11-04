const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const { validateInputs } = require('../middlewares/validate-inputs');
const { categoryNameExists, categoryExists } = require('../helpers/db-validators');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/category');


const router = Router();

/* get categories */
router.get('/', getCategories);

/* create category */
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom(categoryNameExists),
    validateInputs
], createCategory);

/* update category */
router.put('/:id', [
    validateJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(categoryExists),
    check('name').custom(categoryNameExists),
    validateInputs
], updateCategory);

/* delete category */
router.delete('/:id', [
    validateJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(categoryExists),
    validateInputs
], deleteCategory);


module.exports = router;