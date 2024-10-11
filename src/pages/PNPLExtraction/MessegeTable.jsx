import { useEffect, useState } from "react";
import {
    Table,
    Paper,
    TextField,
    Button,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const MessageTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [messages, setMessages] = useState([]);

    const fetchMessage = () => {
        window.engine.onMessage(function (msg) {
            console.log(msg)
            const messageData = {};
            messageData.time = (new Date()).toTimeString()
            messageData.message = msg.message
            messageData.title = msg.title
            // [n => 'normal', w => 'warning, e => 'error]
            setMessages(prev => [messageData, ...prev]);
        })
    }

    const getEngineOnSignal = () => {
        window.engine.onProcessStart(function (message) {
            console.log("message stop", message);
            setMessages([]);
        });
    }

    useEffect(() => {
        getEngineOnSignal();
        fetchMessage();
        return undefined;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        // <div className="w-full h-full border">
        <TableContainer component={Paper} sx={{ height: 200 }}>
            <Table
                stickyHeader
                sx={{ minWidth: 650, overflow: scroll, maxHeight: 200 }}
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                width: 200,
                                fontWeight: 400,
                                backgroundColor: "#409cff",
                                color: 'white',
                                whiteSpace: "nowrap",
                                fontSize: 14,
                            }}
                        >
                            Time Stamp
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 400,
                                width: 120,
                                backgroundColor: "#409cff",
                                color: 'white',
                                whiteSpace: "nowrap",
                                fontSize: 14,
                            }}
                            align="center"
                        >
                            Title
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 400,
                                // width: 10,
                                backgroundColor: "#409cff",
                                color: 'white',
                                whiteSpace: "nowrap",
                                fontSize: 14,
                            }}
                            align="center"
                        >
                            Message
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* <div > */}
                <TableBody
                    className="max-h-20 over"
                >
                    {
                        messages &&
                        messages?.length !== 0 &&
                        messages
                            // ?.slice(
                            //     page * rowsPerPage,
                            //     page * rowsPerPage + rowsPerPage
                            // )
                            .map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:nth-of-type(even)": {
                                            backgroundColor: "#bee2fd",
                                        },
                                        "&:nth-of-type(odd)": {
                                            backgroundColor: "#eeeeee",
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        component="th"
                                        scope="row"
                                    >
                                        {row?.time}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        {row?.title}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        {row?.message}
                                    </TableCell>
                                    {/* <TableCell
                                                    sx={{
                                                        whiteSpace: "nowrap",
                                                        fontSize: 14,
                                                    }}
                                                    align="center"
                                                >
                                                    <div className="flex justify-center">
                                                        <IconButton
                                                            sx={{ padding: 0, height: 25 }}
                                                            disabled={row?.meta?.Status === "Saved"}
                                                            aria-label="edit"
                                                            onClick={() =>
                                                                displayUploadedFilesSelectedData(row?.f_id)
                                                            }
                                                        >
                                                            <BorderColorIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            sx={{ padding: 0, height: 25 }}
                                                            disabled={row?.meta?.Status === "Saved"}
                                                            aria-label="delete"
                                                            onClick={() => handleDelete(row?.f_id)}
                                                        >
                                                            <DeleteIcon
                                                                style={{
                                                                    color:
                                                                        row?.meta?.Status === "Saved" ||
                                                                        "#f64040",
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        whiteSpace: "nowrap",
                                                        fontSize: 14,
                                                    }}
                                                    align="center"
                                                >
                                                    <Button
                                                        disabled={row?.meta?.Status === "Saved"}
                                                        variant="contained"
                                                        size="small"
                                                        sx={{ padding: 0 }}
                                                        onClick={() => handleSave(row.f_id)}
                                                    >
                                                        {row?.meta?.Status === "Saved" ? (
                                                            <span>saved</span>
                                                        ) : (
                                                            <span>save</span>
                                                        )}
                                                    </Button>
                                                </TableCell> */}
                                </TableRow>
                            )
                            )}
                </TableBody>
                {/* </div> */}
            </Table>
        </TableContainer>
        // </div>
    )
}

export default MessageTable;