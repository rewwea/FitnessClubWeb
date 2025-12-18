export class ValidationService {

  static validatePhone(phone) {
    const regex = /^\+7\d{10}$/;
    return regex.test(phone);
  }

  static validateAge(age) {
    return Number.isInteger(age) && age >= 0 && age <= 120;
  }

}