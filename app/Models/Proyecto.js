'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proyecto extends Model {

    user(){
        return this.belongsTo('App/Models/User') // belongsTo indica la relacion de que un Proyecto pertenece a un usuario
    }

    tareas(){
        return this.hasMany('App/Models/Tarea') // un proyecto tiene muchas tareas
    }

}

module.exports = Proyecto
