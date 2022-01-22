'use strict'

const Proyecto = use('App/Models/Proyecto')

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
}

module.exports = ProyectoController
