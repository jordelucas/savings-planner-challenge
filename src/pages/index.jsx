import Head from 'next/head';

import { SimulationProvider } from '../context/simulation';

import { Header } from '../components/Header';
import { BasicDataForm } from '../components/BasicDataForm';
import { FinancialProjectionChart } from '../components/FinancialProjectionChart';
import { ParticipationPercentagesChart } from '../components/ParticipationPercentagesChart';

export default function Home() {
  return (
    <>
      <Head>
        <title>Planejador de Poupança | Carteira Global</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <SimulationProvider>
        <div className="max-w-7xl px-5 pb-5 my-0 mx-auto flex flex-col space-y-5 md:flex-none md:space-y-0 md:grid md:grid-cols-10 md:gap-5">
          <div className='col-span-10'>
            <BasicDataForm />
          </div>

          <div className='col-span-4'>
            <ParticipationPercentagesChart />
          </div>

          <div className='col-span-6'>
            <FinancialProjectionChart />
          </div>
        </div>
      </SimulationProvider>
    </>
  )
};
