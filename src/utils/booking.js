export const generateAvailableWeekdays = () => {
  const date = new Date();
  let availableWeekdays = [];
  let weekday = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  let monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  for (let i = 0; i < 5; i++) {
    let currentDate = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
    let day = String(currentDate.getDate()).padStart(2, '0');
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let year = currentDate.getFullYear();
    let fullDate = `${year}-${month}-${day}`;
    let fullMonth = monthNames[currentDate.getMonth()];

    let dateData = {
      date: currentDate.getDate(),
      day: weekday[currentDate.getDay()],
      fullDate: fullDate,
      fullMonth: fullMonth,
    };

    availableWeekdays.push(dateData);
  }

  return availableWeekdays;
};

export const generateSeats = (row, columns) => {
  let seatRowArray = [];
  let seatNumber = 1;

  for (let i = 0; i < row; i++) {
    let seatsColumnArray = [];

    for (let j = 0; j < columns; j++) {
      let seatObject = {
        number: seatNumber,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };

      seatsColumnArray.push(seatObject);
      seatNumber++;
    }

    seatRowArray.push(seatsColumnArray);
  }

  return seatRowArray;
};
