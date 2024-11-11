export const SUBSCRIPTION_STATUS = {
  FREE: 'free',
  ACTIVE: 'active',
  CANCELED: 'canceled',
  PAST_DUE: 'past_due'
};

export const TIER_LIMITS = {
  [SUBSCRIPTION_STATUS.FREE]: {
    maxCanvases: 3,
    canExportPDF: false,
    hasAIAccess: false,
    maxItemsPerSection: 3,
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
    maxItemsPerSection: 3,
  },
  [SUBSCRIPTION_STATUS.PAST_DUE]: {
    maxCanvases: 3,
    canExportPDF: false,
    hasAIAccess: false,
    maxItemsPerSection: 3,
  }
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
  return TIER_LIMITS[status] || TIER_LIMITS[SUBSCRIPTION_STATUS.FREE];
}