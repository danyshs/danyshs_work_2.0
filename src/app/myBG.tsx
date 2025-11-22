// ./src/app/myBG.tsx

import Particles from "../components/particles";

const MyBG = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-blue-900/70">
      <Particles className="fixed inset-0 -z-10" quantity={200} />
      <div className="fixed inset-0 -z-10 bg-contain bg-scroll bg-gradient-radial from-cyan-800/15 to-blue-800/50" />
      <div className="fixed inset-0 -z-10 bg-contain bg-scroll bg-gradient-to-t from-cyan-800/50 to-blue-800/50" />
      <div className="fixed inset-0 -z-10 bg-contain bg-scroll bg-gradient-radial from-cyan-800/15 to-blue-800/50" />
      <div className="relative z-0">{children}</div>
    </div>
  );
};
export default MyBG;
