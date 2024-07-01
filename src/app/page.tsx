//./src/app/page.tsx
import MyBG from "../../graphics/darkbg";

export default function Home() {
  return (
    <MyBG>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="">Danysh S</div>
        //###############
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
          <div className="shrink-0">
            <img className="h-12 w-12" src="./og.png" alt="ChitChat Logo" />
          </div>
          <div>
            <div className="text-xl font-medium text-black">ChitChat</div>
            <p className="text-slate-500">You have a new message!</p>
          </div>
        </div>
        //#######################
      </main>
    </MyBG>
  );
}

//./graphics/darkbg.tsx
/*
function MyBG({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="absolute inset-0 bg-gradient-radial from-blue-200 to-purple-350">
        {children}
      </div>
    </div>
  );
}
*/
