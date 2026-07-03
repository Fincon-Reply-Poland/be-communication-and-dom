const axios = require('axios');
const { getTodos, createTodo, updateTodo, deleteTodo, API_URL } = require('../src/axiosService');

// axios is auto-mocked - no real network request ever leaves the machine
jest.mock('axios');

const mockTodos = [
    { id: 1, title: 'Buy milk', completed: false, userId: 1 },
    { id: 2, title: 'Write report', completed: true, userId: 1 },
];

const newTodo = { title: 'Learn axios', completed: false, userId: 1 };
const createdTodo = { id: 201, ...newTodo };

const updates = { completed: true };
const updatedTodo = { id: 1, title: 'Buy milk', completed: true, userId: 1 };

describe('axiosService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getTodos (GET)', () => {
        test('returns the list of todos on a successful response (200)', async () => {
            axios.get.mockResolvedValueOnce({ data: mockTodos, status: 200 });

            const todos = await getTodos();

            expect(axios.get).toHaveBeenCalledWith(API_URL);
            expect(todos).toEqual(mockTodos);
        });

        test('throws when axios rejects (e.g. 404)', async () => {
            axios.get.mockRejectedValueOnce(new Error('Request failed with status code 404'));

            await expect(getTodos()).rejects.toThrow();
        });
    });

    describe('createTodo (POST)', () => {
        test('sends a POST request with the correct body and returns the created todo', async () => {
            axios.post.mockResolvedValueOnce({ data: createdTodo, status: 201 });

            const result = await createTodo(newTodo);

            expect(axios.post).toHaveBeenCalledWith(API_URL, newTodo);
            expect(result).toEqual(createdTodo);
        });

        test('throws when axios rejects (e.g. 500)', async () => {
            axios.post.mockRejectedValueOnce(new Error('Request failed with status code 500'));

            await expect(createTodo(newTodo)).rejects.toThrow();
        });
    });

    describe('updateTodo (PUT)', () => {
        test('sends a PUT request to the correct URL with the correct body', async () => {
            axios.put.mockResolvedValueOnce({ data: updatedTodo, status: 200 });

            const result = await updateTodo(1, updates);

            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/1`, updates);
            expect(result).toEqual(updatedTodo);
        });

        test('throws when axios rejects (e.g. 404)', async () => {
            axios.put.mockRejectedValueOnce(new Error('Request failed with status code 404'));

            await expect(updateTodo(999, updates)).rejects.toThrow();
        });
    });

    describe('deleteTodo (DELETE)', () => {
        test('sends a DELETE request to the correct URL and returns true', async () => {
            axios.delete.mockResolvedValueOnce({ status: 200 });

            const result = await deleteTodo(1);

            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/1`);
            expect(result).toBe(true);
        });

        test('throws when axios rejects (e.g. 404)', async () => {
            axios.delete.mockRejectedValueOnce(new Error('Request failed with status code 404'));

            await expect(deleteTodo(999)).rejects.toThrow();
        });
    });
});
