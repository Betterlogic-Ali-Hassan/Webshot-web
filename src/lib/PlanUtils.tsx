import { PlanName } from "@/types/Plan";

export const currentPlan: PlanName = "Pro";

export const isPlanCurrent = (planName: PlanName): boolean => {
  return planName === currentPlan;
};
