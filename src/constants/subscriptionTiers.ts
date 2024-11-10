export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium'
};

export const SUBSCRIPTION_STATUS = {
  FREE: 'free',
  ACTIVE: 'active',
  CANCELED: 'canceled',
  PAST_DUE: 'past_due'
};

export const TIER_LIMITS = {
  [SUBSCRIPTION_TIERS.FREE]: {
    maxCanvases: 3,
    canExportPDF: false,
    hasAIAccess: false,
    maxItemsPerSection: 5,
  },
  [SUBSCRIPTION_TIERS.PREMIUM]: {
    maxCanvases: Infinity,
    canExportPDF: true,
    hasAIAccess: true,
    maxItemsPerSection: Infinity,
  }
};

export const STATUS_LIMITS = {
  [SUBSCRIPTION_STATUS.FREE]: TIER_LIMITS[SUBSCRIPTION_TIERS.FREE],
  [SUBSCRIPTION_STATUS.ACTIVE]: TIER_LIMITS[SUBSCRIPTION_TIERS.PREMIUM],
  [SUBSCRIPTION_STATUS.CANCELED]: TIER_LIMITS[SUBSCRIPTION_TIERS.FREE],
  [SUBSCRIPTION_STATUS.PAST_DUE]: TIER_LIMITS[SUBSCRIPTION_TIERS.FREE]
};

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
  return STATUS_LIMITS[status] || TIER_LIMITS[SUBSCRIPTION_TIERS.FREE];
}