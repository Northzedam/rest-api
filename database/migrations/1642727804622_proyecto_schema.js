'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProyectoSchema extends Schema {
  up () {
    this.create('proyectos', (table) => {
      table.increments() // es el campo id del modelo
      table.integer('user_id',80).unsigned().references('id').inTable('users') // el .reference genera la relacion del proyecto a un user
      table.string('nombre',80).notNullable()
      table.timestamps() // son las fechas de creado y actualizado
    })
  }

  down () {
    this.drop('proyectos')
  }
}

module.exports = ProyectoSchema
