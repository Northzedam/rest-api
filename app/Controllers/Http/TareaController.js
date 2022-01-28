'use strict'

const Proyecto = use('App/Models/Proyecto')
const Tarea = use ('App/Models/Tarea')
const AutorizacionService = use('App/Services/AutorizacionService');

class TareaController {

    async index({auth, request, params}){
        const user = await auth.getUser()
        const { id } = params;
        const proyecto = await Proyecto.find(id)
        AutorizacionService.verificarPermiso(proyecto,user)
        return await proyecto.tareas().fetch()
    }

    async create({auth, request, params}){
        const user = await auth.getUser();
        const {descripcion} = request.all();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto,user);
        const tarea = new Tarea();
        tarea.fill({
            descripcion 
        })
        await proyecto.tareas().save(tarea)

        return tarea;
    }

    async update({auth, params, request}){ // params son los parametros que se toman de la ruta
        const user = await auth.getUser();
        const {id} = params; // esta es una forma de deconstruir objetos segun ES6 . Sería lo mismo colocar: const id = params.id
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user); // devuelve un error en caso de que el user del proyecto no sea igual al user logueado
        tarea.merge(request.only([
            'descripcion',
            'completada'
        ]))
        await tarea.save();
        return tarea;
    }

    async destroy({auth, params}){ // params son los parametros que se toman de la ruta
        const user = await auth.getUser();
        const {id} = params; // esta es una forma de deconstruir objetos segun ES6 . Sería lo mismo colocar: const id = params.id
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user); // devuelve un error en caso de que el user del proyecto no sea igual al user logueado
        await tarea.delete();
        
        return tarea;
    }
}

module.exports = TareaController
