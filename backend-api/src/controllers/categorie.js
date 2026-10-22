const { Category } = require('../models/category'); 
const formaterDate = require('../utils/formaterDate');


/**
 * Fontion pour enregistrer une categorie de produit
 * @param {*} req 
 * @param {*} res 
 * @returns un objet de la categorie enregitree
 */
exports.enregistrerUneCategorie = async(req, res)=>{

    try {
        
        const nouvelleCategorie = new Category({
            libelle: req.body.libelle,
            couleur: req.body.couleur,
            image: req.body.image,
        });

        const categorie = await nouvelleCategorie.save();

        return res.status(201).json({
            message: 'Catégorie enregistrée avec succès', 
            data: categorie
        })


    } catch (error) {
        return res.status(400).json({
            message: "Erreur lors de l'enregistrement",
            error: error.message
        })
    }
}


/**
 * Afficher la liste des categories de produit
 * 
 * 
 */

exports.obtenirLaListeDesCategories = async (req, res)=>{
    try {
        
        const listeCategories = await Category.find()
                                                .select(' libelle couleur image createdAt ')
                                                .sort( { createdAt: -1 } )
                                                .lean();//renvoie des objets JS simples modifiables

        const data = listeCategories.map((cat) => ({
            ...cat, 
            createdAt: formaterDate(cat.createdAt),
        }))

        return res.status(200).json({
            message: 'La liste des categories', 
            data
        })


    } catch (error) {
        return res.status(400).json({
            message: "Erreur lors de l'enregistrement",
            error: error.message
        })
    }
}

exports.obtenirUneCategories  = async (req, res)=>{
    try {
        const recuperationParametre = req.params.id;
        // console.log("Voici l'id", recuperationParametre);
        const categorie = await Category.findById(recuperationParametre);

        return res.status(201).json({
            message: 'Le detail de la categorie', 
            data: categorie
        })


    } catch (error) {
        return res.status(400).json({
            message: "Erreur lors de la recuperation du detail",
            error: error.message
        })
    }

}



/**
 * Fonction pour modifier une categories
 * @returns la categorie mise a jour
 */

exports.modifierUneCategorie = async (req, res)=>{
    try {

        const categorie = await Category.findByIdAndUpdate(
            req.params.id, 
            {
                libelle: req.body.libelle,
                couleur: req.body.couleur,
                image: req.body.image,
            }, 
            { new: true, runValidators: true } //renvoie la version modifiée + applique les validations du schema
        );

        if(!categorie){
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }

        return res.status(200).json({
            message: 'Catégorie modifiée avec succès', 
            data: categorie
        })

        
    } catch (error) {
        return res.status(400).json({
            message: "Erreur lors de la modification",
            error: error.message
        })
    }
}


/**
 * Fonction pour supprimer une catégorie
 */

exports.supprimerUneCategorie = async(req, res)=>{
    try {
        
        const categorie = await Category.findByIdAndDelete(req.params.id);

        if(!categorie){
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }

        return res.status(200).json({
            message: 'Catégorie supprimée avec succès', 
            data: categorie
        })

    } catch (error) {
        return res.status(400).json({
            message: "Erreur lors de la suppression",
            error: error.message
        })
    }
}