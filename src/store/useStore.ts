import { create } from 'zustand';

export type PlanType = 'GOOD' | 'BETTER' | 'BEST' | 'CUSTOM' | null;

export type ServiceCategory = 'MARKETING' | 'CREATIVE' | 'DEVELOPMENT' | 'COMMUNICATION';

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  icon: string;
}

export interface ClientDetails {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  projectGoal: string;
  budget: string;
  extraRequirements: string;
}

interface StoreState {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  
  selectedServices: Service[];
  toggleService: (service: Service) => void;
  
  clientDetails: ClientDetails;
  setClientDetails: (details: Partial<ClientDetails>) => void;
  
  getTimeline: () => string;
}

export const basePlanTimelines = {
  GOOD: '14 Days',
  BETTER: '30 Days',
  BEST: '45 Days',
  CUSTOM: 'TBD',
};

const initialClientDetails = {
  name: '',
  businessName: '',
  phone: '',
  email: '',
  projectGoal: '',
  budget: '',
  extraRequirements: '',
};

export const useStore = create<StoreState>((set, get) => ({
  step: 0, // 0: Welcome, 1: Plan, 2: Builder, 3: Review, 4: Success
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })), // Don't go back to animation (0)
  reset: () => set({
    step: 0,
    selectedPlan: null,
    selectedServices: [],
    clientDetails: initialClientDetails,
  }),
  
  selectedPlan: null,
  setSelectedPlan: (plan) => set((state) => {
    // If they change their plan, clear any add-ons they had selected
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
      return { selectedServices: [...state.selectedServices, service] };
    }
  }),
  
  clientDetails: initialClientDetails,
  setClientDetails: (details) => set((state) => ({ 
    clientDetails: { ...state.clientDetails, ...details } 
  })),
  
  getTimeline: () => {
    const { selectedPlan, selectedServices } = get();
    if (!selectedPlan) return 'TBD';
    
    if (selectedPlan === 'CUSTOM') {
      if (selectedServices.length === 0) return 'TBD';
      return `${selectedServices.length * 3} Days`;
    }

    let baseDays = parseInt(basePlanTimelines[selectedPlan]);
    let extraDays = selectedServices.length * 2; 
    
    return `${baseDays + extraDays} Days`;
  }
}));
