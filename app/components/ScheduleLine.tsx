export interface Props {
  schedule: {
    court: string;
    startTime: string;
    gameType: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: string | null;
    awayScore: string | null;
  };
  emptyBlock?: boolean;
}

export const ScheduleLine = ({ schedule, emptyBlock }: Props) => {
  const winner = () => {
    if (Number(schedule.homeScore) > Number(schedule.awayScore)) {
      return "HOME";
    } else if (Number(schedule.homeScore) < Number(schedule.awayScore)) {
      return "AWAY";
    } else {
      return "TIE";
    }
  };

  const gameComplete = () => {
    return schedule.homeScore !== null;
  };

  if (emptyBlock) {
    return (
      <div
        className={`${
          gameComplete() ? "bg-green-500" : "bg-slate-700"
        } flex items-center gap-2 justify-between px-2 text-slate-700`}
      >
        <div>
          <p>{schedule.startTime}</p>
          <p>{schedule.gameType}</p>
        </div>
        <div className="grow">
          <p className={`${winner() === "HOME" ? "font-bold" : null}`}>
            {schedule.homeTeam}
          </p>
          <p className={`${winner() === "AWAY" ? "font-bold" : null}`}>
            {schedule.awayTeam}
          </p>
        </div>
        <div>
          {schedule.homeScore === null ? (
            <p>vs</p>
          ) : (
            <>
              <p className={`${winner() === "HOME" ? "font-bold" : null}`}>
                {schedule.homeScore}
              </p>
              <p className={`${winner() === "AWAY" ? "font-bold" : null}`}>
                {schedule.awayScore}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        gameComplete() ? "bg-green-500" : "bg-slate-500"
      } rounded-md shadow-md shadow-black flex items-center gap-2 justify-between px-2`}
    >
      <div>
        <p>{schedule.startTime}</p>
        <p>{schedule.gameType}</p>
      </div>
      <div className="grow">
        <p className={`${winner() === "HOME" ? "font-bold" : null}`}>
          {schedule.homeTeam}
        </p>
        <p className={`${winner() === "AWAY" ? "font-bold" : null}`}>
          {schedule.awayTeam}
        </p>
      </div>
      <div>
        {schedule.homeScore === null ? (
          <p>vs</p>
        ) : (
          <>
            <p className={`${winner() === "HOME" ? "font-bold" : null}`}>
              {schedule.homeScore}
            </p>
            <p className={`${winner() === "AWAY" ? "font-bold" : null}`}>
              {schedule.awayScore}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
