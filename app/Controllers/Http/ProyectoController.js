'use strict'

const Proyecto = use('App/Models/Proyecto')
const AutorizacionService = use('App/Services/AutorizacionService')

class ProyectoController {
    async index({auth}){
          const user = await auth.getUser();
          console.log(user.id);
          return await user.proyectos().fetch(); // obtenemos todos los proyectos de un usuario
    }

    async create({auth, request}){
        const user = await auth.getUser(); // tomamos el usuario
        const {nombre} = request.all(); // tomamos el nombre de todo lo que se esta enviando al servidor
        const proyecto = new Proyecto();
        proyecto.fill({
            nombre
        });
        await user.proyectos().save(proyecto); // guarda el proyecto en la bd
        return proyecto;
    }

    async update({auth, request, params}){
        const user = await auth.getUser();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        proyecto.merge(request.only('nombre'));  // le decimos que de la request vamos a tomar solo el nombre
        AutorizacionService.verificarPermiso(proyecto, user); // devuelve un error en caso de que el user del proyecto no sea igual al user logueado
        await proyecto.save();
        return proyecto;
    }

    async destroy({auth, response, params}){ // params son los parametros que se toman de la ruta
        const user = await auth.getUser();
        const {id} = params; // esta es una forma de deconstruir objetos segun ES6 . Sería lo mismo colocar: const id = params.id
        const proyecto = await Proyecto.find(id);
       AutorizacionService.verificarPermiso(proyecto, user); // devuelve un error en caso de que el user del proyecto no sea igual al user logueado
            await proyecto.delete();
        
        return proyecto;
    }
}

module.exports = ProyectoController
