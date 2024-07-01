//./graphics/darkbg.tsx
export default function MyBG({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="absolute inset-0 bg-gradient-radial from-blue-200 to-purple-350">
        {children}
      </div>
    </div>
  );
}
