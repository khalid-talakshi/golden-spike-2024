import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { authenticateForSheets } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const sheetsApi = await authenticateForSheets();
  const standingType = new URL(request.url).searchParams.get("type");
  const timesRange = `autostandings!A2:I12`;
  const response = await sheetsApi.spreadsheets.values.batchGet({
    spreadsheetId: "1CEQ2_v-NzTJLN5wslQShU_lIl0kiTampVM-UQq7rmNU",
    ranges: [timesRange],
  });
  const standings = response?.data?.valueRanges
    ? response?.data?.valueRanges[0].values
    : [];

  let parsedStandings;

  switch (standingType) {
    case "overall":
      parsedStandings = standings?.map((standing: string[]) => {
        return {
          team: standing[0],
          group: standing[1],
          points: standing[2],
          wins: standing[3],
          draws: standing[4],
          losses: standing[5],
          pointDiff: standing[6],
          pointsFor: standing[7],
          pointsAgains: standing[8],
        };
      });
      break;
    case "group":
      const groups = ["A", "B", "C"];
      let subParsedStandings = [];
      for (let group of groups) {
        subParsedStandings.push(
          standings
            ?.filter((standing: string[]) => standing[1] === group)
            .map((standing: string[]) => {
              return {
                team: standing[0],
                group: standing[1],
                points: standing[2],
                wins: standing[3],
                draws: standing[4],
                losses: standing[5],
                pointDiff: standing[6],
                pointsFor: standing[7],
                pointsAgains: standing[8],
              };
            })
        );
        console.log(subParsedStandings);
      }
      parsedStandings = subParsedStandings;
    default:
      parsedStandings = standings?.map((standing: string[]) => {
        return {
          team: standing[0],
          group: standing[1],
          points: standing[2],
          wins: standing[3],
          draws: standing[4],
          losses: standing[5],
          pointDiff: standing[6],
          pointsFor: standing[7],
          pointsAgains: standing[8],
        };
      });
      break;
  }

  return { standings: parsedStandings, type: standingType };
}

export default function Standings() {
  const fetcher = useFetcher<typeof loader>();
  const [standingType, setStandingType] = useState("overall");

  useEffect(() => {
    fetcher.load(`/resource/standings?type=${standingType}`);
  }, [standingType]);

  const standingMarkup = () => {
    switch (fetcher.data?.type) {
      case "overall":
        return (
          <div>
            <div className="flex gap-2 justify-between border-b-2">
              <div className="w-1/12 font-bold">Rank</div>
              <div className="w-4/12 font-bold">Team</div>
              <div className="w-1/12 font-bold">Points</div>
              <div className="w-4/12 font-bold">Record (Diff)</div>
            </div>
            {fetcher.data?.standings?.map((standing: any, index: number) => {
              return (
                <div key={index} className="flex gap-2 justify-between">
                  <div className="w-1/12">{index + 1}</div>
                  <div className="w-4/12">{standing.team}</div>
                  <div className="w-1/12">{standing.points}</div>
                  <div className="w-4/12">
                    {standing.wins}-{standing.draws}-{standing.losses} (
                    {standing.pointDiff})
                  </div>
                </div>
              );
            })}
          </div>
        );
      case "group":
        return null;
      case "wildcard":
        return fetcher.data?.standings?.map((standing: any, index: number) => {
          return (
            <div key={index} className="flex gap-2 justify-between">
              <div className="w-1/2">{standing.team}</div>
              <div className="w-1/2">{standing.points}</div>
            </div>
          );
        });

      default:
        return fetcher.data?.standings?.map((standing: any, index: number) => {
          return (
            <div key={index} className="flex gap-2 justify-between">
              <div className="w-1/2">{standing.team}</div>
              <div className="w-1/2">{standing.points}</div>
            </div>
          );
        });
    }
  };

  return (
    <div className="bg-slate-700 p-2 rounded-md shadow-lg shadow-black">
      <div className="flex mb-2 ">
        <div
          className="w-1/12 text-3xl flex justify-center items-center transition-colors ease-in-out duration-75 hover:text-slate-400 hover:cursor-pointer"
          onClick={() =>
            fetcher.load(`/resource/standings?type=${standingType}`)
          }
        >
          <i className="fa-solid fa-arrows-rotate"></i>
        </div>
        <h2 className="text-center text-3xl font-racing grow">Standings</h2>
        <div className="w-1/12 text-3xl flex justify-center items-center">
          <i
            className={`fa-solid fa-spinner fa-spin ${
              fetcher.state === "idle" ? "!hidden" : null
            }`}
          ></i>
        </div>
      </div>
      <div className="flex gap-2 justify-between mb-2">
        <div
          className="bg-slate-500 w-full text-center rounded-md shadow-md shadow-black font-racing text-xl hover:bg-slate-600 hover:cursor-pointer transition-colors ease-in-out duration-75 flex justify-center items-center"
          onClick={() => setStandingType("overall")}
        >
          Overall
        </div>
        <div
          className="bg-slate-500 w-full text-center rounded-md shadow-md shadow-black font-racing text-xl hover:bg-slate-600 hover:cursor-pointer transition-colors ease-in-out duration-75 flex justify-center items-center"
          onClick={() => setStandingType("group")}
        >
          Group
        </div>
        <div
          className="bg-slate-500 w-full text-center rounded-md shadow-md shadow-black font-racing text-xl hover:bg-slate-600 hover:cursor-pointer transition-colors ease-in-out duration-75 flex justify-center items-center"
          onClick={() => setStandingType("wildcard")}
        >
          Wild Card
        </div>
      </div>
      {standingMarkup()}
    </div>
  );
}
