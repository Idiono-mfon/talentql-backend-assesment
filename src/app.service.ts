import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppService {
  private errorMsg =
    'Invalid dob timestamp. @example: 12/25/1960; December 25 1960; 1662209945; 1662209945204; 12-25-2008; 2008-12-25';

  getHello(): string {
    return 'Welcome to my Talentql Backend assessment';
  }

  getAge(dob: string): string {
    let timestamp: number;

    const parsedDob = Number(dob);

    if (isNaN(parsedDob)) {
      // string timestamp was passed
      timestamp = new Date(dob).getTime();
    } else {
      // Numeric timestamp was passed
      const lenInSeconds = Math.floor(Date.now() / 1000).toString().length;

      const lenInMilliseconds = Math.floor(Date.now()).toString().length;

      const modifiedtimeStamp =
        dob.length === lenInSeconds ? parsedDob * 1000 : parsedDob;

      if (dob.length < lenInSeconds || dob.length > lenInMilliseconds) {
        throw new BadRequestException(this.errorMsg);
      }
      timestamp = new Date(modifiedtimeStamp).getTime();
    }

    const valid = this.isNumeric(timestamp);

    if (!valid) {
      throw new BadRequestException(this.errorMsg);
    }
    const age = this.computeAge(timestamp);

    if (age < 0) {
      throw new BadRequestException(
        'Invalid dob. dob must not exceed the current year',
      );
    }

    return `Your age is: ${age}year${age >= 2 ? 's' : ''}`;
  }

  computeAge(timestamp: number): number {
    const currentYear = new Date(Date.now()).getFullYear();

    const birthYear = new Date(timestamp).getFullYear();

    const age = currentYear - birthYear;

    return age;
  }

  isNumeric(n: number) {
    return !isNaN(parseFloat(n.toString())) && isFinite(n);
  }
}
