//<Introducebar />

export default function Introducebar() {
  return (
    <div className="py-8 px-8 max-w-sm mx-auto bg-blue-400/80 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src="img/me.jpg"
        alt="Graphic of a retro game character"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-cyan-900 font-semibold">Danysh S</p>
          <p className="text-slate-500 text-blue-900">Data Scientist</p>
          <p className="text-slate-500 text-blue-900">
            Aspiring Game Developer
          </p>
        </div>
      </div>
    </div>
  );
}
