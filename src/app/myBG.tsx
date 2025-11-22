// ./src/app/myBG.tsx

import Particles from "../components/particles";

const MyBG = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-blue-900/50">
      <div className="fixed inset-0 -z-10 bg-contain bg-scroll bg-gradient-radial from-purple-500/15 to-blue-800/50" />
      <div className="fixed inset-0 -z-10 bg-contain bg-scroll bg-gradient-to-t from-blue-500/50 to-blue-800/50" />
      <div className="fixed inset-0 -z-10 bg-contain bg-scroll bg-gradient-radial from-cyan-700/15 to-blue-800/50" />
      <Particles className="fixed inset-0 -z-10" quantity={100} />
      <div className="relative z-0">{children}</div>
    </div>
  );
};
export default MyBG;
