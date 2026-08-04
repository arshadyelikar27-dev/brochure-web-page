import { create } from 'zustand';

export type PlanType = 'GOOD' | 'BETTER' | 'BEST' | 'CUSTOM' | null;

export type ServiceCategory = 'MARKETING' | 'CREATIVE' | 'DEVELOPMENT' | 'COMMUNICATION';

type ConfigType = 'QUANTITY' | 'TIER';

interface QuantityField {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

interface QuantityConfig {
  type: 'QUANTITY';
  fields: QuantityField[];
}

interface TierConfig {
  type: 'TIER';
  tiers: string[];
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  icon: string;
  config: QuantityConfig | TierConfig;
}

interface SelectedService extends Service {
  selectedValue: Record<string, number> | string;
}

interface ClientDetails {
  name: string;
  businessName: string;
  phone: string;
  email: string;

  budget: string;
  extraRequirements: string;
}

export type BillingCycle = 'MONTHLY' | 'YEARLY';

interface StoreState {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
  
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  
  selectedServices: SelectedService[];
  toggleService: (service: Service) => void;
  updateServiceValue: (serviceId: string, value: number | string, fieldId?: string) => void;
  
  clientDetails: ClientDetails;
  setClientDetails: (details: Partial<ClientDetails>) => void;
  
  getTimeline: () => string;
}

const initialClientDetails = {
  name: '',
  businessName: '',
  phone: '',
  email: '',

  budget: '',
  extraRequirements: '',
};

export const useStore = create<StoreState>((set, get) => ({
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => {
    const nextStep = (state.step === 3 && state.selectedPlan !== 'CUSTOM') 
      ? 1 
      : Math.max(state.step - 1, 1);
      
    if (nextStep === 1) {
      return { step: 1, selectedPlan: null, selectedServices: [] };
    }
    return { step: nextStep };
  }),
  reset: () => set({
    step: 1,
    selectedPlan: null,
    selectedServices: [],
    clientDetails: initialClientDetails,
    billingCycle: 'MONTHLY',
  }),
  
  billingCycle: 'MONTHLY',
  setBillingCycle: (cycle) => set({ billingCycle: cycle }),
  
  selectedPlan: null,
  setSelectedPlan: (plan) => set((state) => {
    if (state.selectedPlan !== plan) {
      return { selectedPlan: plan, selectedServices: [] };
    }
    return { selectedPlan: plan };
  }),
  
  selectedServices: [],
  toggleService: (service) => set((state) => {
    const exists = state.selectedServices.find((s) => s.id === service.id);
    if (exists) {
      return { selectedServices: state.selectedServices.filter((s) => s.id !== service.id) };
    } else {
      let defaultValue: any;
      if (service.config.type === 'QUANTITY') {
        defaultValue = {};
        service.config.fields.forEach(f => defaultValue[f.id] = f.min);
      } else {
        defaultValue = service.config.tiers[0];
      }
      return { selectedServices: [...state.selectedServices, { ...service, selectedValue: defaultValue }] };
    }
  }),
  updateServiceValue: (serviceId, value, fieldId) => set((state) => {
    return {
      selectedServices: state.selectedServices.map(service => {
        if (service.id === serviceId) {
          if (service.config.type === 'QUANTITY' && fieldId) {
             return { ...service, selectedValue: { ...(service.selectedValue as Record<string, number>), [fieldId]: value as number } };
          }
          return { ...service, selectedValue: value as string };
        }
        return service;
      })
    };
  }),
  
  clientDetails: initialClientDetails,
  setClientDetails: (details) => set((state) => ({ 
    clientDetails: { ...state.clientDetails, ...details } 
  })),
  
  getTimeline: () => {
    const { selectedPlan, selectedServices, billingCycle } = get();
    if (!selectedPlan) return 'TBD';
    
    if (selectedPlan === 'CUSTOM') {
      return '30 Days';
    }

    return billingCycle === 'MONTHLY' ? '30 Days' : '365 Days';
  }
}));
