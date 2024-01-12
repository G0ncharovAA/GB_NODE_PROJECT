const DEFAULT_SCHEDULE_ITEMS = [
  {
    id: 1,
    name: "Йога",
    time: "10:00 - 11:00",
    maxParticipants: 15,
    currentParticipants: 8,
  },
  {
    id: 2,
    name: "Пилатес",
    time: "11:30 - 12:30",
    maxParticipants: 10,
    currentParticipants: 5,
  },
  {
    id: 3,
    name: "Кроссфит",
    time: "13:00 - 14:00",
    maxParticipants: 20,
    currentParticipants: 15,
  },
  {
    id: 4,
    name: "Танцы",
    time: "14:30 - 15:30",
    maxParticipants: 12,
    currentParticipants: 10,
  },
  {
    id: 5,
    name: "Бокс",
    time: "16:00 - 17:00",
    maxParticipants: 8,
    currentParticipants: 6,
  },
];

let scheduleData =
  JSON.parse(localStorage.getItem("schedule")) || DEFAULT_SCHEDULE_ITEMS;

function saveToLocalStorage() {
  localStorage.setItem("schedule", JSON.stringify(scheduleData));
}

function getRow(item) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = item.name;
  row.appendChild(nameCell);

  const timeCell = document.createElement("td");
  timeCell.textContent = item.time;
  row.appendChild(timeCell);

  const maxParticipantsCell = document.createElement("td");
  maxParticipantsCell.textContent = item.maxParticipants;
  row.appendChild(maxParticipantsCell);

  const currentParticipantsCell = document.createElement("td");
  currentParticipantsCell.textContent = item.currentParticipants;
  currentParticipantsCell.id = `currentParticipants-${item.id}`;
  row.appendChild(currentParticipantsCell);

  const actionCell = document.createElement("td");

  const signupButton = document.createElement("button");
  signupButton.textContent = "Записаться";
  signupButton.onclick = () => signup(item);
  signupButton.disabled = item.maxParticipants <= item.currentParticipants;
  actionCell.appendChild(signupButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Отменить запись";
  cancelButton.onclick = () => cancelSignup(item);
  cancelButton.disabled = item.currentParticipants === 0;
  actionCell.appendChild(cancelButton);

  row.appendChild(actionCell);

  return row;
}

function signup(item) {
  if (item.currentParticipants < item.maxParticipants) {
    item.currentParticipants++;
    document.getElementById(`currentParticipants-${item.id}`).textContent =
      item.currentParticipants;
    updateTable();
  }
}

function cancelSignup(item) {
  if (item.currentParticipants > 0) {
    item.currentParticipants--;
    document.getElementById(`currentParticipants-${item.id}`).textContent =
      item.currentParticipants;
    updateTable();
  }
}

function getTableHeader() {
  const header = getRow({
    name: "Название",
    time: "Время",
    maxParticipants: "Макс. количество",
    currentParticipants: "Текущее количество",
    id: "header",
  });
  header.lastElementChild.remove();
  return header;
}

function updateTable() {
  saveToLocalStorage();
  const scheduleTable = document.getElementById("schedule");
  scheduleTable.innerHTML = "";
  const table = [getTableHeader(), ...scheduleData.map((item) => getRow(item))];
  table.forEach((row) => {
    scheduleTable.appendChild(row);
  });
}

updateTable();
