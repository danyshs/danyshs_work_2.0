//./src/app/page.tsx
import MyBG from "../../graphics/darkbg";

export default function Home() {
  return (
    <MyBG>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="">Danysh S</div>
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
