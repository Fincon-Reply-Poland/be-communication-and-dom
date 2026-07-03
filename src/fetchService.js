// fetchService.js
//
// EXERCISE:
// Complete the four functions below so that they work against the public API:
// https://jsonplaceholder.typicode.com/todos
//
// All functions must use the native `fetch` API.
//
// General requirements for ALL functions:
//   1. Must be asynchronous (async/await).
//   2. Must handle errors with try/catch.
//   3. On failure (e.g. non-2xx status, network error) the function must
//      throw an Error with a clear message.
//   4. Must return the parsed JSON data (not the raw Response object).
//
// After completing the file, run:
//   npm install
//   npm test
//
// If your implementation is correct, all tests in
// test/fetchService.test.js should pass.

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

/**
 * GET - fetch the list of todos.
 * @param {string} url - API endpoint (defaults to API_URL)
 * @returns {Promise<Array>} list of todos
 */
async function getTodos(url = API_URL) {
    // TODO: implement using fetch(url)
}

/**
 * POST - create a new todo.
 * @param {{title: string, completed: boolean, userId: number}} todo - todo payload
 * @param {string} url - API endpoint (defaults to API_URL)
 * @returns {Promise<Object>} the created todo, as returned by the API
 */
async function createTodo(todo, url = API_URL) {
    // TODO: implement using fetch(url, { method: 'POST', ... })
}

/**
 * PUT - update an existing todo.
 * @param {number} id - id of the todo to update
 * @param {{title?: string, completed?: boolean, userId?: number}} updates - fields to update
 * @param {string} url - API endpoint (defaults to API_URL)
 * @returns {Promise<Object>} the updated todo, as returned by the API
 */
async function updateTodo(id, updates, url = API_URL) {
    // TODO: implement using fetch(`${url}/${id}`, { method: 'PUT', ... })
}

/**
 * DELETE - delete a todo by id.
 * @param {number} id - id of the todo to delete
 * @param {string} url - API endpoint (defaults to API_URL)
 * @returns {Promise<boolean>} true if the deletion succeeded
 */
async function deleteTodo(id, url = API_URL) {
    // TODO: implement using fetch(`${url}/${id}`, { method: 'DELETE' })
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo, API_URL };
