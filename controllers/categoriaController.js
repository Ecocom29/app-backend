const {response } = require('express');
const Categoria  = require('../Models/Categoria_Model');

/* Funcion para obtener todas las categorias */
const obtenerCategorias = async(req, res = response)=>{
    console.log('Obteniendo cateogorias...');

    const categorias = await Categoria.find();

    res.json({
        ok: true,
        categorias: categorias
    });
}

/* Funcion para crear categoria */
const creaCategoria = async (req, res = response) => {

    console.log('Guardando categoria...');
    console.log(req.body);

    const categoria = new Categoria(req.body);

    try {

        const objCategoria = await Categoria.findOne({"nombreCategoria": categoria.nombreCategoria});
        
        if(objCategoria){
            return res.status(404).json({
                ok: false,
                msg: "Ya existe una categoria con el mismo nombre, favor de verificar."
            });
        }

        const categoriaGuardado = await categoria.save();

        res.json({
            ok: true,
            msg: 'Se guardo correctamente la categoria.',
            categoria: categoriaGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al guardar la informacion."
        });
    }
}

/* Funcion para actulizar categoria */
const actualizaCategoria = async (req, res = response) => {

    const categoriaID = req.params.id;
    const uid = req.uid;

    try {
        const categoria = await Categoria.findById(categoriaID);

        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: "La categoria no existe o no esta disponible."
            });
        }

        // Privilegios para editar registro
       /*  if (categoria.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        } */

        const nuevaCategoria = {
            ...req.body,
            categoriauid: uid
        }

        const categoriaActualizado = await Categoria.findByIdAndUpdate(categoriaID, nuevaCategoria, { new: true });

        console.log(categoriaActualizado)

        res.status(500).json({
            ok: true,
            msg: "Categoria actualizado correctamente",
            categoria: categoriaActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actualizar la informacion."
        });
    }

}

/* Funcion para eliminar la categoria */
const eliminarCategoria = async (req, res = response) => {

    const categoriaID = req.params.id;
    const uid = req.uid;

    try {

        const categoria = await Categoria.findById(categoriaID);

        if (!categoria) {
            res.status(404).json({
                ok: false,
                msg: "La categoria no se encuentra o no esta disponible."
            })
        }

        /* if (categoria.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la informacion."
            });
        } */

        await Categoria.findByIdAndDelete(categoriaID);

        res.json({
            ok: true
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al eliminar la informacion."
        });
    }
}

module.exports = {
    obtenerCategorias,
    creaCategoria,
    actualizaCategoria,
    eliminarCategoria
}