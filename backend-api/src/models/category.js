const { Schema, model } = require("mongoose");



const categorySchema = Schema({
    libelle: { type: String, required: true }, 
    couleur: { type: String, default: '#000000000' }, 
    image: {type: String}, 
    
}, { timestamps: true } )

categorySchema.set('toObject', { virtuals: true })
categorySchema.set('toJSON', { virtuals: true })


exports.Category = model('category', categorySchema);
