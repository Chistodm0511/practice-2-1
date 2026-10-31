// Задание 4: Интеграция с DOM (Парсинг сырых данных)
// Преобразование данных из HTML-формы в строго типизированный объект

import { Book } from "./task1-types";

/**
 * Создаёт объект Book из данных HTML-формы.
 * 
 * ВАЖНО: Данные из формы всегда приходят как строки. 
 * Ваша задача — преобразовать их в правильные типы и проверить границы значений.
 */
export function createBookFromForm(formData: FormData): Book {
  // TODO 1: Получите сырые значения полей формы
  const title = formData.get("title") as string;
  const authorsRaw = formData.get("authors") as string;
  const yearRaw = formData.get("year") as string;
  const ratingRaw = formData.get("rating") as string;

  // TODO 2: Обработайте авторов
  // Разбейте строку по запятой, уберите лишние пробелы (trim), 
  // отфильтруйте пустые строки. Результат должен быть массивом string[].
  const authors = authorsRaw
    .split(",")
    .map((author) => author.trim())
    .filter((author) => author !== "");

  // TODO 3: Преобразуйте год
  // Если поле года заполнено, преобразуйте строку в число через parseInt(str, 10).
  // Если поле пустое, значение должно остаться undefined.
  let year: number | undefined = undefined;
  if (yearRaw && yearRaw.trim() !== "") {
    year = parseInt(yearRaw, 10);
  }

  // TODO 4: Преобразуйте и ВАЛИДИРУЕМ рейтинг
  let rating: number | undefined = undefined;
  if (ratingRaw && ratingRaw.trim() !== "") {
    const parsedRating = parseFloat(ratingRaw);
    // Проверяем на NaN (если ввели текст вместо числа) и на выход за границы 0-5
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      throw new Error("Рейтинг должен быть числом от 0 до 5");
    }
    rating = parsedRating;
  }

  // TODO 5: Сгенерируйте уникальный ID
  const id = crypto.randomUUID();

  // TODO 6: Верните итоговый объект Book
  return {
    id,
    title,
    authors,
    year,
    rating,
  };
}