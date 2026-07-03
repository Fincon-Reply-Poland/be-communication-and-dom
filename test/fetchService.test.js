const { getTodos, createTodo, updateTodo, deleteTodo, API_URL } = require('../src/fetchService');

const mockTodos = [
    { id: 1, title: 'Buy milk', completed: false, userId: 1 },
    { id: 2, title: 'Write report', completed: true, userId: 1 },
];

const newTodo = { title: 'Learn axios', completed: false, userId: 1 };
const createdTodo = { id: 201, ...newTodo };

const updates = { completed: true };
const updatedTodo = { id: 1, title: 'Buy milk', completed: true, userId: 1 };

describe('fetchService', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getTodos (GET)', () => {
        test('returns the list of todos on a successful response (200)', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockTodos,
            });

            const todos = await getTodos();

            expect(global.fetch).toHaveBeenCalledWith(API_URL);
            expect(todos).toEqual(mockTodos);
        });

        test('throws when the response status is an error (e.g. 404)', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            await expect(getTodos()).rejects.toThrow();
        });

        test('throws when fetch rejects (e.g. network error)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network Error'));

            await expect(getTodos()).rejects.toThrow();
        });
    });

    describe('createTodo (POST)', () => {
        test('sends a POST request with the correct body and returns the created todo', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                status: 201,
                json: async () => createdTodo,
            });

            const result = await createTodo(newTodo);

            expect(global.fetch).toHaveBeenCalledWith(
                API_URL,
                expect.objectContaining({
                    method: 'POST',
                    headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
                    body: JSON.stringify(newTodo),
                })
            );
            expect(result).toEqual(createdTodo);
        });

        test('throws when the response status is an error (e.g. 500)', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
            });

            await expect(createTodo(newTodo)).rejects.toThrow();
        });
    });

    describe('updateTodo (PUT)', () => {
        test('sends a PUT request to the correct URL with the correct body', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => updatedTodo,
            });

            const result = await updateTodo(1, updates);

            expect(global.fetch).toHaveBeenCalledWith(
                `${API_URL}/1`,
                expect.objectContaining({
                    method: 'PUT',
                    headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
                    body: JSON.stringify(updates),
                })
            );
            expect(result).toEqual(updatedTodo);
        });

        test('throws when the response status is an error (e.g. 404)', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            await expect(updateTodo(999, updates)).rejects.toThrow();
        });
    });

    describe('deleteTodo (DELETE)', () => {
        test('sends a DELETE request to the correct URL and returns true', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
            });

            const result = await deleteTodo(1);

            expect(global.fetch).toHaveBeenCalledWith(
                `${API_URL}/1`,
                expect.objectContaining({ method: 'DELETE' })
            );
            expect(result).toBe(true);
        });

        test('throws when the response status is an error (e.g. 404)', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            await expect(deleteTodo(999)).rejects.toThrow();
        });
    });
});
