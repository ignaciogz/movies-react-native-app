import { useState } from 'react';

import { CONFIG } from '../global/config';
import { generateAvailableWeekdays, generateSeats } from '../utils/booking';

const columns = CONFIG.CINEMA_ROOM.COLUMNS;
const rows = CONFIG.CINEMA_ROOM.ROWS;
const bookingTicketPrice = CONFIG.CINEMA_ROOM.TICKETS.GENERAL_PRICE;

const useBooking = () => {
  const [bookingAvailableDatesArray, setBookingAvailableDatesArray] = useState(generateAvailableWeekdays());
  const [bookingSeatsArray, setBookingSeatsArray] = useState(generateSeats(rows, columns));
  const [bookingTimesArray, setBookingTimesArray] = useState([]);
  const [bookingTotalPrice, setBookingTotalPrice] = useState(0);

  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedSeatsArray, setSelectedSeatsArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);

  /* console.log("------------------")
  console.log(":: Seats - Array: ", bookingSeatsArray)
  console.log("Selected Seat - Array: ", selectedSeatsArray)
  console.log("Selected Date - Index: ", bookingAvailableDatesArray[selectedDateIndex])
  console.log("Selected Time - Index: ", bookingTimesArray[selectedTimeIndex])
  console.log(":: Total Price: ", bookingTotalPrice)
  console.log("------------------") */

  const clearBooking = () => {
    setBookingSeatsArray(generateSeats(rows, columns));
    setBookingTotalPrice(0);
    setSelectedDateIndex(null);
    setSelectedSeatsArray([]);
    setSelectedTimeIndex(null);
  };

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
    clearBooking,
    selectSeat,
    setBookingTimesArray,
    setSelectedDateIndex,
    setSelectedTimeIndex,
  };
};

export default useBooking;
