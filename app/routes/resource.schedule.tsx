import { useFetcher, useLoaderData } from "@remix-run/react";
import { parse } from "postcss";
import { useEffect } from "react";
import { ScheduleLine } from "~/components";
import { authenticateForSheets } from "~/utils";

export async function loader() {
  const sheetsApi = await authenticateForSheets();

  const timesRange = `schedule!A2:H31`;
  const response = await sheetsApi.spreadsheets.values.batchGet({
    spreadsheetId: "1CEQ2_v-NzTJLN5wslQShU_lIl0kiTampVM-UQq7rmNU",
    ranges: [timesRange],
  });
  const times = response?.data?.valueRanges
    ? response?.data?.valueRanges[0].values
    : [];

  const parsedTimes = times?.map((time: string[]) => {
    return {
      startTime: time[0],
      court: time[1],
      gameType: time[2],
      homeTeam: time[3],
      homeScore: time[4] || null,
      awayScore: time[5] || null,
      awayTeam: time[6],
      pointDiff: Number(time[7]),
    };
  });

  return { scheudule: parsedTimes };
}

export default function Schedule() {
  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    fetcher.load("/resource/schedule");
  }, []);

  return (
    <div className="bg-slate-700 p-2 rounded-md shadow-lg shadow-black">
      <div className="flex  mb-2">
        <div
          className="w-1/12 text-3xl flex justify-center items-center transition-colors ease-in-out duration-75 hover:text-slate-400 hover:cursor-pointer"
          onClick={() => fetcher.load("/resource/schedule")}
        >
          <i className="fa-solid fa-arrows-rotate"></i>
        </div>
        <h2 className="text-center text-3xl font-racing grow">Schedule </h2>
        <div className="w-1/12 text-3xl flex justify-center items-center">
          <i
            className={`fa-solid fa-spinner fa-spin ${
              fetcher.state === "idle" ? "!hidden" : null
            }`}
          ></i>
        </div>
      </div>
      <div className="flex max-sm:flex-col gap-2">
        <div className="w-full sm:w-1/3 space-y-2">
          <h3 className="text-center text-2xl font-racing">Court 1</h3>
          {fetcher.data?.scheudule
            ?.filter((x) => x.court === "1")
            .map((time: (typeof fetcher.data.scheudule)[0], index: number) => {
              if (time.gameType === "NULL") {
                return <ScheduleLine schedule={time} emptyBlock key={index} />;
              } else {
                return <ScheduleLine schedule={time} key={index} />;
              }
            })}
        </div>
        <div className="w-full sm:w-1/3 space-y-2">
          <h3 className="text-center text-2xl font-racing">Court 2</h3>
          {fetcher.data?.scheudule
            ?.filter((x) => x.court === "2")
            .map((time: (typeof fetcher.data.scheudule)[0], index: number) => {
              if (time.gameType === "NULL") {
                return <ScheduleLine schedule={time} emptyBlock key={index} />;
              } else {
                return <ScheduleLine schedule={time} key={index} />;
              }
            })}
        </div>
        <div className="w-full sm:w-1/3 space-y-2">
          <h3 className="text-center text-2xl font-racing">Court 3</h3>
          {fetcher.data?.scheudule
            ?.filter((x) => x.court === "3")
            .map((time: (typeof fetcher.data.scheudule)[0], index: number) => {
              if (time.gameType === "NULL") {
                return <ScheduleLine schedule={time} emptyBlock key={index} />;
              } else {
                return <ScheduleLine schedule={time} key={index} />;
              }
            })}
        </div>
      </div>
    </div>
  );
}
