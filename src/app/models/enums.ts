export enum StatusProposal {
  Created = 1,
  InReview,
  Approved,
  Done,
  Denied,
  InWorking
}

export enum DialogType {
  Create,
  Edit
}

export enum AvailabilityStatus {
  Available = 1,
  Busy,
  PartialAAvailable,
  VeryCarefulAvailable
}

export const AvailabilityStatusLabel = new Map<number, string>([
  [AvailabilityStatus.Available, 'Available'],
  [AvailabilityStatus.Busy, 'Busy'],
  [AvailabilityStatus.PartialAAvailable, 'Partial Available'],
  [AvailabilityStatus.VeryCarefulAvailable, 'Very careful available']
]);