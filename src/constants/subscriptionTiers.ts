export const SUBSCRIPTION_TIERS = {
    FREE: 'free',
    PREMIUM: 'premium'
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