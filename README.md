# Exercise: fetch vs axios (GET, POST, PUT, DELETE)

Celem tego ćwiczenia jest zaimplementowanie tych samych czterech operacji HTTP —
**GET**, **POST**, **PUT**, oraz **DELETE** — na dwa sposoby: raz przy użyciu natywnego
`fetch` API, raz przy użyciu `axios`.

Ćwiczenie korzysta z publicznego API https://jsonplaceholder.typicode.com/todos.

## Jak uruchomić

```bash
npm install
npm test
```

Testy mockują `fetch` oraz `axios`, więc **prawdziwe połączenie sieciowe nie jest
wymagane** — każdy może zweryfikować swoją implementację lokalnie i otrzymać
natychmiastową informację zwrotną.

## Co zaimplementować

W plikach `src/fetchService.js` oraz `src/axiosService.js` uzupełnij:

| Function                          | HTTP method | Notes                              |
|-----------------------------------|-------------|------------------------------------|
| `getTodos(url)`                   | GET         | zwraca liste todos                 |
| `createTodo(todo, url)`           | POST        | wysyla `todo` jako request body    |
| `updateTodo(id, updates, url)`    | PUT         | wysyla `updates` jako request body |
| `deleteTodo(id, url)`             | DELETE      | zwraca `true` kiedy success        |

## Wymagania ogólne

1. Wszystkie funkcje muszą być `async`.
2. Wszystkie funkcje muszą używać `try/catch` do obsługi błędów.
3. W przypadku niepowodzenia (nieprawidłowy status HTTP, błąd sieciowy) funkcja musi rzucić
   `Error` z czytelnym komunikatem.
4. Funkcje muszą zwracać sparsowane dane (nie surowy obiekt `Response`/axios).

### Oddanie zadania
Po rozwiązaniu ćwiczenia:
```
git add .
git commit -m "Solve Backend communication exercises"
git push
```
