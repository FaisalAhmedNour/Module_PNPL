import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import ClearIcon from "@mui/icons-material/Clear";

const TimerSection = ({
  isDataToRun,
  dataToRunText,
  isSuccess,
  successText,
  isFaild,
  engineStatus
}) => {
  const [isExpand, setIsExpand] = useState(true);
  const [successCount, setSuccessCount] = useState(0);
  const [dataToExtract, setDataToExtract] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [remainingTime, setRemainingTime] = useState('00:00');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  // useEffect(() => {
  //   if (engineStatus != null) {
  //     setIsExpand(true);
  //     setTitle(engineStatus)
  //   }
  // }, [engineStatus])

  function calculateRemainingTime(total, complete, failed, speed) {
    const toDo = total - (complete + failed)
    return new Date(toDo * speed * 1000).toISOString().substring(14, 19)
  }

  const fetchStatus = () => {
    window.engine.onStatus(function (status) {
      // console.log("status", status);
      let { channel, total, complete, failed, speed, title, details } = status

      if (typeof title === 'string') setTitle(title)
      if (typeof total === 'number') setDataToExtract(total)
      if (typeof complete === 'number') setSuccessCount(complete);
      if (typeof failed === 'number') setFailedCount(failed)
      if (typeof details === 'string') setDetails(details)
      if (typeof total === 'number' && typeof complete === 'number' && typeof failed === 'number')
        // console.log("time", calculateRemainingTime(total, complete, failed, speed))
        setRemainingTime(calculateRemainingTime(total, complete, failed, speed))
    })
  }

  const getEngineOnSignal = () => {
    window.engine.onProcessStop(function (message) {
      console.log("message stop", message);
    });
  }

  const getEngineOffSignal = () => {
    window.engine.onProcessStart(function (message) {
      console.log("message start", message);
    });
  }

  useEffect(() => {
    fetchStatus();
    getEngineOffSignal();
    getEngineOnSignal();
    return undefined;
  }, []);

  return (
    <Paper
      sx={{
        overflow: "hidden",
        py: isExpand ? 2 : 1,
        px: isExpand ? 2 : 1,
        width: 250,
        height: 200,
        // maxHeight: isExpand ? 200 : 40,
        // minHeight: isExpand ? 100 : 40,
        transition: "width 1s,max-height 1s, min-height 1s",
      }}
      className="space-y-1"
    >
      {/* {isExpand && (
        <ClearIcon
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
            color: "gray",
            cursor: "pointer",
            fontSize: 18,
          }}
          onClick={() => setIsExpand(false)}
        />
      )}
      {isExpand || (
        <LaunchIcon
          sx={{
            color: "gray",
            rotate: "180deg",
            cursor: "pointer",
          }}
          onClick={() => setIsExpand(true)}
        />
      )} */}
      {isExpand && isDataToRun && (
        <Typography
          sx={{
            display: "flex",
            color: "#9b51e0",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: 400,
            whiteSpace: "nowrap",
          }}
        >
          <span>{dataToRunText}</span>
          <span>{dataToExtract}</span>
        </Typography>
      )}
      {isExpand && isSuccess && (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: 400,
            color: "green",
          }}
        >
          <span className="flex text-[green]">
            <img src="./Success.svg" alt="Success" className="w-4 mr-[1px]" />
            {successText}
          </span>
          <span>{successCount}</span>
        </Typography>
      )}
      {isExpand && isFaild && (
        <Typography
          sx={{
            // color: "#4f4a4a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: 400,
            color: "red",
          }}
        >
          <span className="flex text-[red]">
            <img src="./Failed.svg" alt="Success" className="w-3 mx-[2px]" />
            Failed
          </span>
          <span>{failedCount}</span>
        </Typography>
      )}
      {isExpand && remainingTime != 0 && (
        <Typography
          sx={{
            paddingY: 0,
            color: "#9b51e0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          {remainingTime}
        </Typography>
      )}
      {isExpand && (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            textTransform: "capitalize",
            textAlign: "center",
            // pt: 0.5,
          }}
        // className="py-1 text-[#4f4a4a] rounded flex justify-center text-sm font-semibold"
        >
          {/* <span> */}
            {/* Stopped */}
            {title}
          {/* </span> */}
        </Typography>
      )}
      {isExpand && (
        <Typography
          sx={{
            fontSize: 12,
            // fontWeight: 600,
            textTransform: "capitalize",
            textAlign: "center",
            pb: 0.5,
            overflow: 'auto'
          }}
        // className="py-1 text-[#4f4a4a] rounded flex justify-center text-sm font-semibold"
        >
          <span>
            {details}
            {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis eius atque, tenetur est non quas id? Blanditiis tempora doloribus deleniti eius vel fugit. Earum rem animi nihil voluptatibus nam cupiditate. */}
          </span>
        </Typography>
      )}
    </Paper>
  );
};

export default TimerSection;
