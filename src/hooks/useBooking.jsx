import { useState } from 'react';

import { CONFIG } from '../global/config';
import { generateAvailableWeekdays, generateSeats } from '../utils/booking';

const columns = CONFIG.CINEMA_ROOM.COLUMNS;
const rows = CONFIG.CINEMA_ROOM.ROWS;
const bookingTimesArray = CONFIG.CINEMA_ROOM.TIMES;
const bookingTicketPrice = CONFIG.CINEMA_ROOM.TICKETS.GENERAL_PRICE;

const useBooking = () => {
  const [bookingAvailableDatesArray, setBookingAvailableDatesArray] = useState(generateAvailableWeekdays());
  const [bookingSeatsArray, setBookingSeatsArray] = useState(generateSeats(rows, columns));
  const [bookingTotalPrice, setBookingTotalPrice] = useState(0);

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSeatsArray, setSelectedSeatsArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

  /* console.log("------------------")
  console.log(":: Seats - Array: ", bookingSeatsArray)
  console.log("Selected Seat - Array: ", selectedSeatsArray)
  console.log("Selected Date - Index: ", selectedDateIndex)
  console.log("Selected Time - Index: ", selectedTimeIndex)
  console.log(":: Total Price: ", bookingTotalPrice)
  console.log("------------------") */

  const selectSeat = (rowNumber, columnNumber, seatNumberSelected) => {
    if (!bookingSeatsArray[rowNumber][columnNumber].taken) {
      let selectedSeats = [...selectedSeatsArray];
      let seatsArray = [...bookingSeatsArray];

      seatsArray[rowNumber][columnNumber].selected = !seatsArray[rowNumber][columnNumber].selected;

      const isSeatSelected = selectedSeats.some(seat => seat.number === seatNumberSelected);
      if (!isSeatSelected) {
        selectedSeats.push({
          number: seatNumberSelected,
          row: rowNumber,
        });
        setSelectedSeatsArray(selectedSeats);
      } else {
        selectedSeats = selectedSeats.filter(seat => seat.number !== seatNumberSelected);
        setSelectedSeatsArray(selectedSeats);
      }

      setBookingTotalPrice(selectedSeats.length * bookingTicketPrice);
      setBookingSeatsArray(seatsArray);
    }
  };

  return {
    bookingAvailableDatesArray,
    bookingSeatsArray,
    bookingTimesArray,
    bookingTotalPrice,
    selectedDateIndex,
    selectedSeatsArray,
    selectedTimeIndex,
    selectSeat,
    setSelectedDateIndex,
    setSelectedTimeIndex,
  };
};

export default useBooking;
