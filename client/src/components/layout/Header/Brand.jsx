function Brand() {
  return (
    <div className="relative flex items-center hover:rotate-4 transition-all duration-200">
      <img src="/astra-niaga.svg" alt="Logo Astra" className="w-12 md:w-16" />
      <p className="w-min text-2xl leading-none font-bold whitespace-pre-wrap text-blue-500 md:text-3xl">
        Astra Niaga
      </p>
      <a href="" className="absolute h-full w-full"></a>
    </div>
  );
}

export default Brand;
