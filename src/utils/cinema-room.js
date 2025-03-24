export const generateCinemaRoomDates = () => {
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

export const generateCinemaRoomSeats = (roomRows, roomColumns) => {
  let cinemaRowArray = [];
  let seatNumber = 1;

  for (let i = 0; i < roomRows; i++) {
    let cinemaColumnArray = [];

    for (let j = 0; j < roomColumns; j++) {
      let seatObject = {
        number: seatNumber,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };

      cinemaColumnArray.push(seatObject);
      seatNumber++;
    }

    cinemaRowArray.push(cinemaColumnArray);
  }

  return cinemaRowArray;
};