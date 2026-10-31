import './styles.css';
import { Book, formatBook, Catalog } from './task1-types';
import { addBook, removeBook, getBook } from './task2-functions';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from "./task4-integration";

// Готовые данные для старта
let initialBooks: Catalog = {
  '1': { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2024 },
  '2': { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
};

// ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ DOM (Слайд 15)
const bookList = document.querySelector('#bookList') as HTMLDivElement;
const form = document.querySelector('#bookForm') as HTMLFormElement;
const filterBtn = document.querySelector('#applyFilters') as HTMLButtonElement;
const authorInput = document.querySelector('#filterAuthor') as HTMLInputElement;
const yearInput = document.querySelector('#filterYear') as HTMLInputElement;
const errorMessage = document.querySelector('#errorMessage') as HTMLDivElement;

// ФУНКЦИЯ ОТРИСОВКИ
function renderBooks(books: Book[]) {
  // Очищаем контейнер перед новой отрисовкой
  bookList.innerHTML = ''; 

  // Если книг нет, показываем сообщение
  if (books.length === 0) {
    bookList.textContent = 'Книги не найдены. Попробуйте изменить фильтры.';
    return;
  }

  // Перебираем книги и создаём для каждой карточку
  books.forEach(book => {
    // TODO 3.1: Создайте элемент div и добавьте ему класс 'book-card'
    const card = document.createElement('div');
    card.classList.add('book-card');

    // TODO 3.2: Создайте элемент h3 для названия.
    const titleH3 = document.createElement('h3');
    titleH3.textContent = formatBook(book);
    card.append(titleH3);

    // TODO 3.3: Создайте элемент p для авторов.
    const authorsP = document.createElement('p');
    authorsP.textContent = book.authors.join(', ');
    card.append(authorsP);

    // TODO 3.4: Если book.year существует
    if (book.year !== undefined) {
      const yearP = document.createElement('p');
      yearP.textContent = `Год: ${book.year}`;
      card.append(yearP);
    }

    // TODO 3.5: Если book.rating существует
    if (book.rating !== undefined) {
      const ratingP = document.createElement('p');
      ratingP.textContent = `Рейтинг: ${book.rating} ⭐`;
      card.append(ratingP);
    }

    // TODO 3.6: Создайте кнопку "Удалить"
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => {
      initialBooks = removeBook(initialBooks, book.id);
      renderBooks(Object.values(initialBooks));
    });
    card.append(deleteBtn);

    // TODO 3.7: Добавьте карточку в bookList
    bookList.append(card);
  });
}

// Первичная отрисовка при загрузке страницы
renderBooks(Object.values(initialBooks));

// ОБРАБОТЧИК ФОРМЫ
form.addEventListener('submit', (e) => {
  // TODO 4.1: Отмените стандартную перезагрузку страницы
  e.preventDefault();
  
  errorMessage.textContent = '';

  try {
    // TODO 4.2: Создайте объект FormData
    const formData = new FormData(form);

    // TODO 4.3: Вызовите createBookFromForm
    const newBook = createBookFromForm(formData);

    // TODO 4.4: Обновите состояние каталога
    initialBooks = addBook(initialBooks, newBook);

    // TODO 4.5: Очистите поля формы и перерисуйте список
    form.reset();
    renderBooks(Object.values(initialBooks));
    
  } catch (error) {
    // TODO 4.6: Выведите ошибку, если это экземпляр Error
    if (error instanceof Error) {
      errorMessage.textContent = error.message;
    }
  }
});

// ОБРАБОТЧИК ФИЛЬТРОВ
filterBtn.addEventListener('click', () => {
  // TODO 5.1: Создайте пустой массив для функций-фильтров
  const filters: ((book: Book) => boolean)[] = [];
  
  // TODO 5.2: Фильтр по автору
  const authorValue = authorInput.value.trim();
  if (authorValue !== '') {
    filters.push(filterByAuthor(authorValue));
  }
  
  // TODO 5.3: Фильтр по году
  const yearValue = yearInput.value.trim();
  if (yearValue !== '') {
    filters.push(filterByMinYear(parseInt(yearValue, 10)));
  }

  // TODO 5.4: Получите все книги из каталога
  const allBooks = Object.values(initialBooks);
  
  // TODO 5.5: Примените фильтры и перерисуйте
  const filteredBooks = applyFilters(allBooks, filters);
  renderBooks(filteredBooks);
});