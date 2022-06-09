import { useState, useCallback, createContext } from 'react';

export const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [projectionData, setProjectionData] = useState(null);
  const [participationData, setParticipationData] = useState(null);

  const setFinancialProjection = useCallback(value => {
    return setProjectionData(value)
  }, []);
  
  const setParticipationPercentages = useCallback(value => {
    return setParticipationData(value)
  }, []);

  return (
    <SimulationContext.Provider value={{
      projectionData,
      participationData,
      setFinancialProjection,
      setParticipationPercentages,
    }}>
      {children}
    </SimulationContext.Provider>
  )
}
