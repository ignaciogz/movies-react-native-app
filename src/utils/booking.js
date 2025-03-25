export const generateAvailableWeekdays = () => {
  const date = new Date();
  let availableWeekdays = [];
  let weekday = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

  for (let i = 0; i < 5; i++) {
    let dateData = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
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
