import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl font-racing text-center my-3">
        Golden Spike 2024
      </h1>
    </div>
  );
}
