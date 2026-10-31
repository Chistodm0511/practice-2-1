// Задание 3: Фильтрация
// Использование функций высшего порядка и предикатов для поиска данных

import { Book, BookFilter } from "./task1-types";

// TODO 1: Создайте фильтр по имени автора
export const filterByAuthor = (authorName: string): BookFilter => {
  return (book: Book) => {
    const searchName = authorName.toLowerCase();
    // Метод some проверяет, есть ли хотя бы один автор, содержащий искомую подстроку
    return book.authors.some((author) => 
      author.toLowerCase().includes(searchName)
    );
  };
};

// TODO 2: Создайте фильтр по минимальному году издания
export const filterByMinYear = (year: number): BookFilter => {
  return (book: Book) => {
    // Обязательно проверяем на undefined, иначе TS выдаст ошибку
    return book.year !== undefined && book.year >= year;
  };
};

// TODO 3: Создайте фильтр по минимальному рейтингу
export const filterByMinRating = (rating: number): BookFilter => {
  return (book: Book) => {
    // То же самое для рейтинга
    return book.rating !== undefined && book.rating >= rating;
  };
};

// TODO 4: Примените массив фильтров к массиву книг
export const applyFilters = (books: Book[], filters: BookFilter[]): Book[] => {
  // filter оставляет только те книги, для которых колбэк вернул true.
  // every проверяет, что ВСЕ фильтры из массива вернули true для данной книги.
  return books.filter((book) => filters.every((filter) => filter(book)));
};