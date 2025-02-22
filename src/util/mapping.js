export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function monthNumberToString(monthNumber) {
   if (typeof monthNumber !== 'number' || monthNumber < 1 || monthNumber > 12) {
      return "Invalid Month Number";
   }

   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   return months[monthNumber - 1]; g
}