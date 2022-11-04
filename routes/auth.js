const { Router } = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/auth');
const { emailExists, usernameExists } = require('../helpers/db-validators');
const { validateInputs } = require('../middlewares/validate-inputs');

const router = Router();

router.post('/login', [
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateInputs
], login);

router.post('/registro', [
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña debe tener por lo menos 6 caracteres').isLength({ min: 6 }),
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email').custom(emailExists),
    check('username').custom(usernameExists),
    validateInputs
], register);


module.exports = router;