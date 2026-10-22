const express = require('express');

const router = express.Router();
const categorieController = require('../controllers/categorie')

/**
 * CRUD = CREER LIRE MODIFIER SUPPRIMER = CREATE READ UPDATE DELETE
 */

router.post('/', categorieController.enregistrerUneCategorie )
router.get('/', categorieController.obtenirLaListeDesCategories )
router.get('/:id', categorieController.obtenirUneCategories )
router.put('/:id', categorieController.modifierUneCategorie);
router.delete('/:id', categorieController.supprimerUneCategorie);



module.exports = router;