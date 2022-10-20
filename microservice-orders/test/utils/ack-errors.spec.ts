import { AckErrors } from '../../src/utils/ack-errors';

describe('AckErrors', () => {
  describe('hasAckErrors()', () => {
    test('Should return true if payload is included in ackErrors list', () => {
      const message = 'E11000 - duplicated key';
      const result = AckErrors.hasAckErrors(message);
      expect(result).toBeTruthy();
    });

    test('Should return false if payload is not included in ackErrors list', () => {
      const message = 'any_error_message';
      const result = AckErrors.hasAckErrors(message);
      expect(result).toBeFalsy();
    });
  });
});
