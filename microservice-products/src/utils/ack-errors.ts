const ackErrors: string[] = ['E11000'];

export class AckErrors {
  static hasAckErrors(message: string): boolean {
    const filteredAckErrors = ackErrors.filter((ackError) =>
      message.includes(ackError),
    );
    return !!filteredAckErrors.length;
  }
}
