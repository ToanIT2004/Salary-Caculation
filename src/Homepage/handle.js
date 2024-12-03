const devideString = (string) => {
   const result = string.split(":");
   return result
}

function formatVND(amount) {
   if (!amount && amount !== 0) return '';
   return amount
      .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      .replace(/\s/, ''); // Loại bỏ khoảng trắng nếu cần
}

const penaltyForm = (minute) => {
   if (minute >= 5 && minute < 30) {
      return 10000
   } else if (minute >= 30) {
      return 50000
   } else {
      return 0
   }
}

const delayTime = (schedule) => {
   // Tổng thời gian đi trễ
   let sumTimeLate = 0;

   // Tổng số lần đi trễ
   let sumLate = 0;

   // Tiền phạt
   let sumPenaltyMoney = 0;

   schedule.forEach((i) => {
      // Chuyển chuỗi thời gian vào buổi sáng
      const morningTimeLate = devideString(i.morningTimeStart);
      // Chuyển chuỗi thời gian vào buổi chiều
      const afternoonTimeLate = devideString(i.afternoonTimeStart);

      // Tính thời gian vào ca làm việc ra phút (Sáng)
      const mtimeInMinutes = (+morningTimeLate[0] * 60) + +morningTimeLate[1];
      // Tính thời gian vào ca làm việc ra phút (Chiều)
      const atimeInMinutes = (+afternoonTimeLate[0] * 60) + +afternoonTimeLate[1];

      // Biến thời gian đi trễ buổi sáng
      let mTimeLate = 0;

      // Biến thời gian đi trễ buổi chiều
      let aTimeLate = 0;

      // Tính thời gian đi trễ và số lần đi trễ cho buổi sáng
      if (mtimeInMinutes > 480) {  // 480 phút = 08:00 AM
         mTimeLate = mtimeInMinutes - 480;
         sumLate++; // Tăng số lần đi trễ

         sumPenaltyMoney += penaltyForm(mTimeLate)
      }

      // Tính thời gian đi trễ và số lần đi trễ cho buổi chiều
      if (atimeInMinutes > 780) {  // 780 phút = 01:00 PM
         aTimeLate = atimeInMinutes - 780;
         sumLate++; // Tăng số lần đi trễ
         sumPenaltyMoney += penaltyForm(mTimeLate)
      }

      // Cộng dồn thời gian đi trễ
      sumTimeLate += mTimeLate + aTimeLate;
   });

   // Tính tổng thời gian đi trễ
   sumPenaltyMoney += (sumTimeLate * 500)

   return {
      sumTimeLate, sumLate, sumPenaltyMoney
   }
}

const leaveEarly = (schedule) => {
   // Tổng thời gian về sớm
   let sumLeaveEarly = 0
   let sumMoneyLeavelEarly = 0
   let sumLeave = 0;
   schedule.map((i) => {

      // Chuyển chuỗi thời gian vào buổi sáng
      const morningLeaveEarly = devideString(i.morningTimeEnd);
      // Chuyển chuỗi thời gian vào buổi chiều
      const afterLeaveEarly = devideString(i.afternoonTimeEnd);

      // Tính thời gian vào ca làm việc ra phút (Sáng)
      var mtimeOutMinutes = 0;
      if ((+morningLeaveEarly[0] * 60) + (+morningLeaveEarly[1]) < 720) {
         mtimeOutMinutes = 720 - ((+morningLeaveEarly[0] * 60) + (+morningLeaveEarly[1]))
         sumLeave++
      }

      // Tính thời gian vào ca làm việc ra phút (Chiều)
      var atimeOutMinutes = 0;
      if ((+afterLeaveEarly[0] * 60) + (+afterLeaveEarly[1]) < 1020) {
         // Tính thời gian vào ca làm việc ra phút (Sáng)
         atimeOutMinutes = 1020 - ((+afterLeaveEarly[0] * 60) + (+afterLeaveEarly[1]))
         sumLeave++
      }

      // Cộng dồn thời gian đi trễ
      sumLeaveEarly += mtimeOutMinutes + atimeOutMinutes;
   })

   // Tính tổng thời gian đi trễ
   sumMoneyLeavelEarly += (sumLeaveEarly * 500)

   return {
      sumLeaveEarly, sumMoneyLeavelEarly, sumLeave
   }
}


const timeArriveLate = () => { }
const timeLeaveEarly = () => { }

export { delayTime, leaveEarly, formatVND, timeArriveLate, timeLeaveEarly }


