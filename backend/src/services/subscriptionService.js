/**
 * Рассчитывает дату окончания абонемента
 * @param {Date} startDate
 * @param {number} durationDays
 * @returns {Date}
 */

function calculateEndDate(startDate, durationDays) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + durationDays);
  return endDate;
}

/**
 * Проверка доступа клиента (заглушка без БД)
 * @returns {boolean}
 */

function checkAccessMock(subscription) {
  const today = new Date();
  return today >= subscription.startDate && today <= subscription.endDate;
}

module.exports = {
  calculateEndDate,
  checkAccessMock,
};