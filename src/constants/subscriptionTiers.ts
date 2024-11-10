export const SUBSCRIPTION_STATUS = {
  FREE: 'free',
  ACTIVE: 'active',
  CANCELED: 'canceled',
  PAST_DUE: 'past_due'
};

export const STATUS_LIMITS = {
  [SUBSCRIPTION_STATUS.FREE]: {
    maxCanvases: 3,
    canExportPDF: false,
    hasAIAccess: false,
    maxItemsPerSection: 5,
  },
  [SUBSCRIPTION_STATUS.ACTIVE]: {
    maxCanvases: Infinity,
    canExportPDF: true,
    hasAIAccess: true,
    maxItemsPerSection: Infinity,
  },
  [SUBSCRIPTION_STATUS.CANCELED]: {
    maxCanvases: 3,
    canExportPDF: false,
    hasAIAccess: false,
    maxItemsPerSection: 5,
  },
  [SUBSCRIPTION_STATUS.PAST_DUE]: {
    maxCanvases: 3,
    canExportPDF: false,
    hasAIAccess: false,
    maxItemsPerSection: 5,
  }
};

export const TIER_LIMITS = STATUS_LIMITS;

export { SUBSCRIPTION_STATUS as SUBSCRIPTION_TIERS };
export { STATUS_LIMITS as TIER_LIMITS };

export const SUBSCRIPTION_STATUS_DISPLAY = {
  [SUBSCRIPTION_STATUS.FREE]: 'Free',
  [SUBSCRIPTION_STATUS.ACTIVE]: 'Premium',
  [SUBSCRIPTION_STATUS.CANCELED]: 'Canceled',
  [SUBSCRIPTION_STATUS.PAST_DUE]: 'Payment Due'
};

export function isPremiumStatus(status: string): boolean {
  return status === SUBSCRIPTION_STATUS.ACTIVE;
}

export function getLimitsForStatus(status: string) {
  return STATUS_LIMITS[status] || STATUS_LIMITS[SUBSCRIPTION_STATUS.FREE];
}

export function getMaxItemsPerSection(status: string): number {
  return STATUS_LIMITS[status]?.maxItemsPerSection || STATUS_LIMITS[SUBSCRIPTION_STATUS.FREE].maxItemsPerSection;
}

export default function Component() {
  return null;
}