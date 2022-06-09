import { useContext } from 'react';

import { SimulationContext } from '../context/simulation';

export function useSimulation() {
  const context = useContext(SimulationContext);

  return context;
}