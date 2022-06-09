import Image from 'next/image';

export function Header() {
  return (
    <header className="h-16">
      <div className="h-16 max-w-7xl px-5 my-0 mx-auto flex items-center">
        <Image
          src="/Logo.svg"
          alt="Logomarca do Carteira Global"
          width={36}
          height={26}
        />
        <span className="text-base font-semibold text-black-900 ml-3.5">Planejador de Poupança</span>
      </div>
    </header>
  )
}