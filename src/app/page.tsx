//./src/app/page.tsx
//import MyBG from "../../graphics/darkbg";
import Introducebar from "../../graphics/bars";

export default function Home() {
  return (
    <MyBG>
      <main className="">
        <div className=""></div>
      </main>
    </MyBG>
  );
}
//<div className="text-8xl py-4 font-khfont">Danysh S</div>;
function MyBG({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="absolute inset-0 bg-gradient-radial from-blue-800/50 to-cyan-900/65">
        {children}
      </div>
    </div>
  );
}
/*

*/
