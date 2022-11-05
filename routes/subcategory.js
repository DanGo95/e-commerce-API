const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const { validateInputs } = require('../middlewares/validate-inputs');
const { subcategoryNameExists, subcategoryExists, categoryExists  } = require('../helpers/db-validators');
const { getSubcategories, createSubcategory, updateSubcategory, deleteSubcategory } = require('../controllers/subcategory');


const router = Router();

/* get subcategories */
router.get('/', getSubcategories);

/* create subcategory */
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom(subcategoryNameExists),
    check('category', 'Ingrese una categoría válida').isMongoId(),
    check('category').custom(categoryExists),
    validateInputs
], createSubcategory);

/* update subcategory */
router.put('/:id', [
    validateJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(subcategoryExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom(subcategoryNameExists),
    check('category', 'Ingrese una categoría válida').isMongoId(),
    check('category').custom(categoryExists),
    validateInputs
], updateSubcategory);

/* delete subcategory */
router.delete('/:id', [
    validateJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(subcategoryExists),
    validateInputs
], deleteSubcategory);


module.exports = router;