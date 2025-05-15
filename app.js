const fs = require('fs');
const xml2js = require('xml2js');

// Функция для парсинга XML файла
async function parseXML(filePath) {
  try {
    // Читаем XML файл
    const xmlData = fs.readFileSync(filePath, 'utf8');

    // Создаем новый парсер
    const parser = new xml2js.Parser({
      explicitArray: false, // Отключает создание массивов для одиночных элементов
      trim: true // Удаляет пробелы
    });

    // Парсим XML
    const result = await parser.parseStringPromise(xmlData);

    return result;
  } catch (error) {
    console.error('Ошибка при парсинге XML:', error);
    throw error;
  }
}

// Пример использования
async function main() {
  try {
    // Укажите путь к вашему XML файлу
    const filePath = './may.xml';

    const parsedData = await parseXML(filePath);

    const thirdPageArr = parsedData?.Report?.third_page || [];

    const phonesArr = thirdPageArr.reduce((acc,item) => {

      return [...acc,...item.td.c];
    }, []).filter((item) => item.s.includes('телефония'));

    const result = phonesArr.reduce((acc,item) => {
      const date = item.d.split(" ")[0];
      if(acc[date] !== undefined) {
        acc[date] = ++acc[date];
      } else {
        acc[date] = 1;
      }
      return acc;
    }, {});

    // Выводим результат
    // console.log('Распарсенные данные:', JSON.stringify(parsedData, null, 2));
    // console.log(JSON.stringify(phonesArr, null, 2));
    // console.log(phonesArr.length);
    console.log(result);
    // fs.writeFile(filePath, JSON.stringify(result, null, 2));


  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// Запускаем парсер
main();
