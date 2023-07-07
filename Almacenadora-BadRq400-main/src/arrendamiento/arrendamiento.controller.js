'use strict'
const User = require('../user/user.model');
const Bodega = require('../bodega/bodega.model');
const Arrendamiento = require('./arrendamiento.model');
const ServicioAdd = require('../servicesAdicional/servicesAdicional.model');

exports.test = (req, res)=>{
    res.send({message: 'Test funcion is running'});
}

exports.createArrendamiento = async(req, res)=>{
    try {
        let data = req.body;
        let existBodega = await Bodega.findOne({_id: data.bodega});
        let existUser = await User.findOne({_id: data.user});
        let existServAdd = await ServicioAdd.findOne({_id: data.servicios});
        if(!existBodega /*&& existBodega.availability == false*/){
           return res.status(404).send({message: 'Bodega no existe'})
        }
        if(!existUser){
            return res.status(404).send({message: 'Usuario no existe'})
        }
        if(existServAdd){
            return res.status(404).send({message: 'Servicio no existe'})
        }
        let arrendamiento = new Arrendamiento(data);
        await arrendamiento.save();
        return res.send({message: 'Arrendamiento saved sucessfully'});
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error al crear el arrendamiento'})
    }
}

exports.updateArrendamiento = async(req, res)=>{
    try {
        let arrendaId = req.params.id;
        let data = req.body;
        let existBodega = await Bodega.findOne({_id: data.bodega});
        let existUser = await User.findOne({_id: data.user});
        let existServAdd = await ServicioAdd.findOne({_id: data.servicios});
        if(!existBodega){
            return res.status(404).send({message: 'Bodega no existe'})
        }
        if(!existBodega.availability){
            return res.status(404).send({message: 'La bodega no esta disponible para arrendar'});
        }
        if(!existUser){
            return res.status(404).send({message: 'Usuario no existe'})
        }
        if(existServAdd){
            return res.status(404).send({message: 'Servicio no existe'})
        }
        let updateArrenda = await Arrendamiento.findByIdAndUpdate(
            {_id: arrendaId},
            data,
            {new: true }
        )
        if(!updateArrenda){
            return res.send({message: 'Arrendamiento no encontrado y no se actualizado'})
        }
        return res.send({message: 'Arrendamiento actualizado: ', updateArrenda});
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error al actualizar Arrendamiento'});
    }
}

exports.getArrendamientos = async(req, res)=>{
    try {
        const arrendamientos = await Arrendamiento.find().populate('bodega').populate('user').populate('serviciosAdicionales');
        return res.json({message: 'Arrendamientos encontrados: ', arrendamientos});
      } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensaje: 'Error al obtener los arrendamientos'});
      }
}

exports.deleteArrendamiento = async (req, res) => {
    try {
      const arrendamiento = await Arrendamiento.findById(req.params.id);
      if (!arrendamiento) {
        return res.status(404).send({ message: "Arrendamiento no encontrado" });
      }
      // Cambiar el estado de la bodega a disponible
      const bodega = await Bodega.findById(arrendamiento.bodega);
      if (bodega) {
        bodega.availability = true;
        await bodega.save();
        console.log(bodega)
      }
      // Eliminar el arrendamiento
      let deleteArrenda = await Arrendamiento.deleteOne(arrendamiento);
      if(deleteArrenda.deletedCount === 0) return res.status(404).send({message: 'Arrendamiento no encontrado y no eliminado'});
      return res.send({ message: "Arrendamiento eliminado correctamente" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Error al eliminar el arrendamiento" });
    }
  };