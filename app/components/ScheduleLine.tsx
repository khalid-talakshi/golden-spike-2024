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
}

export const ScheduleLine = ({ schedule }: Props) => {
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
