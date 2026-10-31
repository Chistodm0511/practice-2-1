// Задание 2: Функции работы с каталогом
// Управление данными без мутации исходных объектов (иммутабельность)

// TODO 0: Импортируйте типы Book и Catalog из файла task1-types.ts
import type { Book, Catalog } from './task1-types';

// TODO 1: Добавьте книгу в каталог
export function addBook(catalog: Catalog, book: Book): Catalog {
  // Создаем новый объект, распаковывая старый каталог и добавляя новую книгу по ключу book.id
  return {
    ...catalog,
    [book.id]: book,
  };
}

// TODO 2: Удалите книгу из каталога по id
export function removeBook(catalog: Catalog, id: string): Catalog {
  // Используем деструктуризацию с вычисляемым ключом [id] и rest-оператор ...rest
  // Это "вырезает" книгу с нужным id из объекта, оставляя всё остальное в rest
  const { [id]: _, ...rest } = catalog;
  return rest;
}

// TODO 3: Найдите книгу в каталоге по id
export function getBook(catalog: Catalog, id: string): Book | undefined {
  // Просто обращаемся к свойству по ключу. 
  // Если ключа нет, JavaScript вернет undefined, что соответствует типу возврата.
  return catalog[id];
}