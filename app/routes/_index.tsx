import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticateForSheets } from "~/utils";
import Schedule from "./resource.schedule";
import Standings from "./resource.standings";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const sheetsApi = await authenticateForSheets();

  const timesRange = `schedule!A2:H20`;
  const response = await sheetsApi.spreadsheets.values.batchGet({
    spreadsheetId: "1CEQ2_v-NzTJLN5wslQShU_lIl0kiTampVM-UQq7rmNU",
    ranges: [timesRange],
  });
  const times = response?.data?.valueRanges
    ? response?.data?.valueRanges[0].values
    : [];
  console.log(times);

  return { sheetsApi: sheetsApi };
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-2">
      <h1 className="text-4xl sm:text-6xl font-racing text-center my-3">
        Golden Spike 2024
      </h1>
      <div className="flex max-sm:flex-col justify-center gap-2">
        <div className="w-full sm:w-1/3">
          <Standings />
        </div>
        <div className="w-full sm:w-2/3">
          <Schedule />
        </div>
      </div>
    </div>
  );
}
