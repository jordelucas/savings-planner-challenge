import { useState, useEffect, useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';
import { Col, Form, Row } from 'antd';
import { useMutation, useQuery } from '@apollo/client';

import { GENERATE_SIMULATION } from '../../mutations';
import { useSimulation } from '../../hooks/useSimulation';
import { convertPercentToDecimalForm } from '../../utils/convertPercentToDecimalForm';
import { GET_FINANCIAL_PROJECTION, GET_PARTICIPATION_PERCENTAGES } from '../../queries';

import Card from '../Card';
import Input from '../Input';

export function BasicDataForm() {
  const { setFinancialProjection, setParticipationPercentages } = useSimulation();
  
  const [period, setPeriod] = useState(null);
  const [interestRate, setInterestRate] = useState(0);
  const [installmentValue, setInstallmentValue] = useState(0);
  const [initialInvestment, setInitialInvestment] = useState(0);
  
  const [ generateSimulation ] = useMutation(GENERATE_SIMULATION);
  const { data: projection } = useQuery(GET_FINANCIAL_PROJECTION);
  const { data: participation } = useQuery(GET_PARTICIPATION_PERCENTAGES);

  const isThePeriodValid = useMemo(() => period !== null, [period])
  
  const handleGenerateSimulation = useCallback(async () => {
    await generateSimulation({
      variables: {
        period: period,
        interestRate: convertPercentToDecimalForm(interestRate),
        installmentValue: installmentValue,
        initialInvestment: initialInvestment,
      },
      refetchQueries: [
        GET_FINANCIAL_PROJECTION,
        GET_PARTICIPATION_PERCENTAGES,
      ],
    });
  }, [
    generateSimulation, 
    period, 
    interestRate, 
    installmentValue,
    initialInvestment,
  ]);

  useEffect(() => {
    if(isThePeriodValid) {
      handleGenerateSimulation()
    } else {
      setFinancialProjection(null);
      setParticipationPercentages(null);
    }
  }, [handleGenerateSimulation, isThePeriodValid, setFinancialProjection, setParticipationPercentages]);

  useEffect(() => {
    if(!!projection) {
      setFinancialProjection(projection.getFinancialProjection);
    } else {
    }
  }, [projection, setFinancialProjection]);

  useEffect(() => {
    if(!!participation) {
      setParticipationPercentages(participation.getParticipationPercentages);
    }
  }, [participation, setParticipationPercentages]);
  return (
    <Card title="Dados Básicos:">
      <Form layout="vertical">
        <Row gutter={24}>
          <Col xs={12} md={6}>
            <Input
              label="Investimento Inicial:"
              description="Quanto você já economizou até hoje?"
              mask="currency"
              defaultValue={0}
              onChange={value => setInitialInvestment(value)}
            />
          </Col>

          <Col xs={12} md={6}>
            <Input
              label="Valor da Parcela:"
              description="Quanto você pretende poupar por mês?"
              mask="currency"
              defaultValue={0}
              onChange={value => setInstallmentValue(value)}
            />
          </Col>

          <Col xs={12} md={6}>
            <Input
              label="Período (em meses):"
              description="Durante quantos meses você pretende poupar?"
              onChange={value => setPeriod(value)}
            />
          </Col>

          <Col xs={12} md={6}>
            <Input
              label="Taxa de Juros (em % a.a.):"
              description="Qual a taxa de juros à qual o seu dinheiro vai render por ano?"
              mask="percentage"
              defaultValue={0}
              onChange={value => setInterestRate(value)}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
