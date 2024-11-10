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

export const SUBSCRIPTION_STATUS_DISPLAY = {
  [SUBSCRIPTION_STATUS.FREE]: 'Free',
  [SUBSCRIPTION_STATUS.ACTIVE]: 'Premium',
  [SUBSCRIPTION_STATUS.CANCELED]: 'Canceled',
  [SUBSCRIPTION_STATUS.PAST_DUE]: 'Payment Due'
};

// Función auxiliar para determinar si un estado de suscripción es "premium"
export function isPremiumStatus(status: string): boolean {
  return status === SUBSCRIPTION_STATUS.ACTIVE;
}

// Función auxiliar para obtener los límites basados en el estado de suscripción
export function getLimitsForStatus(status: string) {
  return STATUS_LIMITS[status] || STATUS_LIMITS[SUBSCRIPTION_STATUS.FREE];
}

export default function Component() {
  return null;
}