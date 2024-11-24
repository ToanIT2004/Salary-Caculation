const penaltyForm = (minute) => {
   if (minute >= 5) {
      return 10000
   } else if (minute >= 30) {
      return 50000
   } else {
      return 0
   }
}

// Hàm tính toán trễ cho một ca
const calculateLate = (shift, time) => {
   let sumLate = 0;
   let numberLate = 0;
   let lostMoney = 0;

   time.map((entry) => {
      if (entry[shift][0] !== undefined) {
         const timeString = entry[shift][0];
         const result = timeString.split(":");

         // Xử lý trường hợp bấm tay sớm
         const timeInMinutes = (Number(result[0]) * 60) + Number(result[1]);
         let late = 0;
         
         // Xử lý theo từng ca
         if (shift === 'shift1') {
            if (timeInMinutes > 480) {
               late = timeInMinutes - 480; // Tính trễ so với 08:00
            }
         } else if (shift === 'shift2') {
            if (timeInMinutes > 780) {
               late = timeInMinutes - 780; // Tính trễ so với 13:00
            }
         }

         // Cộng dồn
         sumLate += late;

         // Số lần đi trễ
         if (late > 0) {
            numberLate++;
         }

         // Cộng tiền phạt
         lostMoney += penaltyForm(late);
      }
   });

   return { sumLate, numberLate, lostMoney };
};

// Hàm tính tổng kết quả cho ca 1 và ca 2
const timeLate = (time) => {
   // Tính toán cho ca 1 và ca 2
   const shift1Result = calculateLate('shift1', time);
   const shift2Result = calculateLate('shift2', time);

   // Tổng hợp kết quả
   const sumLate = shift1Result.sumLate + shift2Result.sumLate;
   const numberLate = shift1Result.numberLate + shift2Result.numberLate;
   const lostMoney = shift1Result.lostMoney + shift2Result.lostMoney;

   // Tính tổng tiền phạt
   const sumMoney = (sumLate * 500) + lostMoney;

   console.log("Phút", sumLate);
   console.log("Số lần", numberLate);
   console.log("Tiền phạt", sumMoney);
};

export { timeLate };