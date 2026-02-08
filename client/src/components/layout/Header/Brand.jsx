function Brand() {
  return (
    <div className="group relative flex items-center transition-all duration-1000 hover:rotate-4">
      <img
        src="/astra-niaga.svg"
        alt="Logo Astra"
        className="relative w-12 transition-all duration-1000 group-hover:rotate-180 md:w-16"
      />
      <p className="w-min text-2xl leading-none font-bold whitespace-pre-wrap text-blue-500 md:text-3xl">
        Astra Niaga
      </p>
      <a href="" className="absolute h-full w-full"></a>
    </div>
  );
}

export default Brand;
