export enum OrderStatus {
  /** When ticket order has been created
   *  but has not been reserved
   */
  Created = 'created',

  /** Ticket order is trying to reserve has already been reserved, or
   *  the user has cancelled the order, or
   *  the order expires before payment
   */
  Cancelled = 'cancelled',

  /** The order has successfully reserved the ticket, and
   *  waiting for payment confirmation
   */
  AwaitingPaymant = 'awaiting:payment',

  /** The order has reserved the ticket and
   *  the user has successfully provided the payment */
  Completed = 'completed'
};