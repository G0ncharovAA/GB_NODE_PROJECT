// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)

const musicCollectionIterator = Symbol.iterator;

const musicCollection = {
  albums: [
    {
      title: "Dark Side of the Moon",
      artist: "Pink Floyd",
      year: "1973",
    },
    {
      title: "Back in Black",
      artist: "AC/DC",
      year: "1980",
    },
    {
      title: "Thriller",
      artist: "Michael Jackson",
      year: "1982",
    },
  ],

  [musicCollectionIterator]: function* () {
    for (let album of this.albums) {
      yield `${album.title} - ${album.artist} (${album.year})`;
    }
  },
};

for (let album of musicCollection) {
  console.log(album);
}

// Задание 2
// Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:

// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

// Повара и их специализации:

// Виктор - специализация: Пицца.
// Ольга - специализация: Суши.
// Дмитрий - специализация: Десерты.

// Блюда и их повара:

// Пицца "Маргарита" - повар: Виктор.
// Пицца "Пепперони" - повар: Виктор.
// Суши "Филадельфия" - повар: Ольга.
// Суши "Калифорния" - повар: Ольга.
// Тирамису - повар: Дмитрий.
// Чизкейк - повар: Дмитрий.

// Заказы:

// Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
// Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
// Клиент Ирина заказала: Чизкейк.

const dishesToChef = new Map([
  ["Пицца Маргарита", "Виктор"],
  ["Пицца Пепперони", "Виктор"],
  ["Суши Филадельфия", "Ольга"],
  ["Суши Калифорния", "Ольга"],
  ["Тирамису", "Дмитрий"],
  ["Чизкейк", "Дмитрий"],
]);

const orders = new Map();

const orderAlexey = new Map([
  ["Пицца Пепперони", 1],
  ["Тирамису", 1],
]);
orders.set({ name: "Алексей" }, orderAlexey);

const orderMaria = new Map([
  ["Суши Калифорния", 1],
  ["Пицца Маргарита", 1],
]);
orders.set({ name: "Мария" }, orderMaria);

const orderIrina = new Map([["Чизкейк", 1]]);
orders.set({ name: "Ирина" }, orderIrina);

for (let [dish, chef] of dishesToChef) {
  console.log(`Повар ${chef} готовит ${dish}`);
}

for (let [client, order] of orders) {
  console.log(`${client.name} заказал:`);
  for (let [dish, quantity] of order) {
    console.log(`${quantity} порция(и) ${dish}`);
  }
}
