// Класс для представления отдельной карточки автомобиля
class CarItem {
  constructor(brand, color, year) {
    this.brand = brand; // Бренд автомобиля
    this.color = color; // Цвет автомобиля
    this.year = year; // Год выпуска автомобиля
    this.element = this.createElement(); // Создаем HTML элемент карточки автомобиля
  }

  // Метод для создания HTML элемента карточки автомобиля
  createElement() {
    const curYear = new Date().getFullYear(); // Текущий год
    const carCard = document.createElement("div"); // Создаем div для карточки
    carCard.classList.add("autoCard"); // Добавляем класс "autoCard"

    // Заполняем HTML содержимым карточки
    carCard.innerHTML = `
      <h2>${this.brand.toUpperCase()} ${this.year}</h2>
      <p>Автомобиль ${this.brand.toUpperCase()} - ${
      this.year
    } года. Возраст авто - ${curYear - this.year} лет.</p>
      <div>Цвет:<div style="background-color:${
        this.color
      }; width: 1em; height: 1em;"></div></div>
      <button type="button" class='btn'>Удалить</button>
      <button type="button" class='editing'>Редактировать</button>
      <div class="editing-div" style="display:none">
        <input type="text" placeholder="Бренд" value="${this.brand}">
        <input type="number" placeholder="Год" value="${this.year}">
        <input type="color" value="${this.color}">
        <button type="button" class="save">Сохранить изменения</button>
      </div>
    `;

    this.addEventListeners(carCard); // Добавляем обработчики событий к карточке
    return carCard; // Возвращаем элемент карточки
  }

  // Метод для добавления обработчиков событий
  addEventListeners(carCard) {
    const deleteButton = carCard.querySelector(".btn"); // Кнопка удаления
    deleteButton.addEventListener("click", () => this.deleteCar()); // Обработчик для удаления карточки

    const editButton = carCard.querySelector(".editing"); // Кнопка редактирования
    editButton.addEventListener("click", () => this.toggleEdit()); // Обработчик для переключения редактирования

    const saveButton = carCard.querySelector(".save"); // Кнопка сохранения изменений
    saveButton.addEventListener("click", () => this.saveChanges(carCard)); // Обработчик для сохранения изменений
  }

  // Метод для удаления карточки
  deleteCar() {
    this.element.remove(); // Удаляем элемент из DOM
  }

  // Метод для переключения режима редактирования
  toggleEdit() {
    const editingDiv = this.element.querySelector(".editing-div"); // Находим блок редактирования
    editingDiv.style.display =
      editingDiv.style.display === "none" ? "block" : "none"; // Переключаем видимость
  }

  // Метод для сохранения изменений в карточке
  saveChanges(carCard) {
    const inputs = carCard.querySelectorAll(".editing-div input"); // Получаем все инпуты в блоке редактирования
    this.brand = inputs[0].value; // Обновляем бренд
    this.year = parseInt(inputs[1].value); // Обновляем год
    this.color = inputs[2].value; // Обновляем цвет

    // Обновляем содержимое карточки новыми значениями
    carCard.querySelector("h2").innerHTML = `${this.brand.toUpperCase()} ${
      this.year
    }`;
    carCard.querySelector(
      "p"
    ).innerHTML = `Автомобиль ${this.brand.toUpperCase()} - ${
      this.year
    } года. Возраст авто - ${new Date().getFullYear() - this.year} лет.`;
    carCard.querySelector(
      "div"
    ).innerHTML = `Цвет:<div style="background-color:${this.color}; width: 1em; height: 1em;"></div>`;

    this.toggleEdit(); // Закрываем блок редактирования
  }
}

// Класс для формы добавления и редактирования автомобиля
class CarForm {
  constructor(onAddCar) {
    this.onAddCar = onAddCar; // Функция для добавления нового автомобиля
    this.form = this.createForm(); // Создаем форму
  }

  // Метод для создания HTML формы
  createForm() {
    const form = document.createElement("form"); // Создаем элемент формы
    form.innerHTML = `
      <input type="text" id="brand" placeholder="Бренд" required>
      <input type="number" id="year" placeholder="Год" required>
      <input type="color" id="color" required>
      <button type="submit">Добавить автомобиль</button>
    `;
    form.addEventListener("submit", (e) => this.handleSubmit(e)); // Добавляем обработчик события отправки формы
    return form; // Возвращаем форму
  }

  // Метод для обработки отправки формы
  handleSubmit(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы
    const brand = document.getElementById("brand").value; // Получаем значение бренда
    const year = parseInt(document.getElementById("year").value); // Получаем значение года
    const color = document.getElementById("color").value; // Получаем значение цвета

    this.onAddCar(brand, color, year); // Вызываем функцию для добавления нового автомобиля

    // Сбрасываем поля формы
    document.getElementById("brand").value = "";
    document.getElementById("year").value = "";
    document.getElementById("color").value = "#000000"; // Цвет по умолчанию
  }
}

// Класс для списка автомобилей
class CarList {
  constructor() {
    this.cars = []; // Массив для хранения автомобилей
    this.element = this.createList(); // Создаем HTML элемент списка

    // Добавляем три автомобиля по умолчанию
    this.addCar("Tesla", "red", 2015);
    this.addCar("Lexus", "silver", 2016);
    this.addCar("Nissan", "black", 2012);
  }

  // Метод для создания элемента списка
  createList() {
    const carListDiv = document.createElement("div"); // Создаем div для списка
    carListDiv.classList.add("autos"); // Добавляем класс "autos"
    return carListDiv; // Возвращаем элемент списка
  }

  // Метод для добавления нового автомобиля в список
  addCar(brand, color, year) {
    const newCar = new CarItem(brand, color, year); // Создаем новый объект CarItem
    this.cars.push(newCar); // Добавляем новый автомобиль в массив
    this.element.appendChild(newCar.element); // Добавляем элемент карточки в DOM
  }
}

// Главная функция приложения
const app = () => {
  const listOfCars = document.createElement("div"); // Создаем div для обертки списка автомобилей
  listOfCars.classList.add("wrapper"); // Добавляем класс "wrapper"
  document.body.appendChild(listOfCars); // Добавляем div в тело документа

  const carList = new CarList(); // Создаем новый список автомобилей
  listOfCars.appendChild(carList.element); // Добавляем список в обертку

  const carForm = new CarForm((brand, color, year) => {
    carList.addCar(brand, color, year); // Добавляем новый автомобиль в список при отправке формы
  });
  document.body.prepend(carForm.form); // Добавляем форму в начало тела документа
};

// Запускаем приложение
app();
