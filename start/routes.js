'use strict'

const auth = require('@adonisjs/auth');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group( ()=> {
  Route.post('users/register','UserController.store')
  Route.post('users/login','UserController.login')

  //rutas de los proyectos
  Route.get('proyectos', 'ProyectoController.index').middleware('auth') // en los controller donde recibimos auth, debemos colocar el middelware aquí
  Route.get('proyectos/:id', 'ProyectoController.index').middleware('auth') // en los controller donde recibimos auth, debemos colocar el middelware aquí
  Route.post('proyectos','ProyectoController.create').middleware('auth'); // crear un nuevo proyecto
  Route.patch('proyectos/:id','ProyectoController.update').middleware('auth'); // actualizar un proyecto
  Route.delete('proyectos/:id','ProyectoController.destroy').middleware('auth'); // crear un nuevo proyecto

  //rutas de las tareas
  Route.get('proyectos/:id/tareas', 'TareaController.index').middleware('auth') // en los controller donde recibimos auth, debemos colocar el middelware aquí
  Route.post('proyectos/:id/tareas', 'TareaController.create').middleware('auth') // crear una nueva tarea
  Route.patch('tareas/:id','TareaController.update').middleware('auth'); // actualizar un proyecto
  Route.delete('tareas/:id','TareaController.destroy').middleware('auth'); // crear un nuevo proyecto

}).prefix('api/v1/'); // o si queremos proteger todo el grupo de rutas se puede colocar el middleware aquí

Route.get('/exit', () => {
  process.exit();
})
