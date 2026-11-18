import Particles from "../components/particles";

const LAYER = "fixed inset-0 -z-10 bg-contain bg-scroll";
const RADIAL = `${LAYER} bg-gradient-radial from-cyan-800/15 to-blue-800/50`;

export default function MyBG({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className={`${LAYER} bg-blue-700/60`} />
      <div className={RADIAL} />
      <div className={`${LAYER} bg-gradient-to-t from-cyan-800/50 to-blue-800/50`} />
      <div className={RADIAL} />
      <Particles className="fixed inset-0 -z-10" quantity={200} />
      <div className="relative z-0">{children}</div>
    </div>
  );
}
