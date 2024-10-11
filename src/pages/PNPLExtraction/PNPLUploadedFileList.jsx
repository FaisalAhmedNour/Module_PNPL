import {
    Table,
    Paper,
    Button,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    IconButton,
    TableContainer,
    Typography,
    TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import Swal from "sweetalert2";
import { process } from "./PNPLExtraction";

export default function PNPLUploadedFileList({
    reload,
    setReload,
    setUploadedFilesSelectedData
}) {
    const [page, setPage] = useState(0);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();

    const handleError = (message) => {
        setError(message);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await window.engine.Proxy('/protected/'+process+'/fileList', 'get');
                console.log(result);
                if (result?.statusText === "OK") {
                    setUploadedFiles(result?.data);
                    handleError("");
                } else {
                    handleError(result?.statusText);
                }
            } catch (error) {
                handleError(error?.response?.data?.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [reload]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         // console.log(
    //         //     'haiu'
    //         // )
    //         // getUploadedFile()
    //         const result = await getUploadedFile(process);
    //         console.log(result);
    //         if (result?.statusText === "OK") {
    //           setUploadedFiles(result?.data);
    //           handleError("");
    //         } else {
    //           handleError(result?.statusText);
    //         }
    //       } catch (error) {
    //         handleError(error?.response?.data?.message);
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     };

    //     fetchData();
    //   }, [reload]);

    // const confirmDelete = async (id) => {
    //     try {
    //         const result = await deleteUploadedData(id, process);
    //         if (result?.data?.status === "deleted") {
    //             Swal.fire({
    //                 title: "Deleted!",
    //                 text: "Your file has been deleted.",
    //                 icon: "success",
    //             });
    //             setReload(!reload);
    //             setUploadedFilesSelectedData([]);
    //         } else {
    //             Swal.fire({
    //                 title: "Deleted!",
    //                 text: "Your file has been deleted.",
    //                 icon: "success",
    //             });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             title: "Failed!",
    //             text: error?.message,
    //             icon: "error",
    //         });
    //     }
    // };

    // const handleDelete = async (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!",
    //     }).then((result) => {
    //         if (result?.isConfirmed) {
    //             confirmDelete(id);
    //         }
    //     });
    // };

    // const confirmSave = async (id) => {
    //     try {
    //         const result = await saveFile(id, process);
    //         // console.log(result);
    //         if (result?.data?.status === "saved") {
    //             Swal.fire({
    //                 position: "center",
    //                 icon: "success",
    //                 title: "Your file has been saved",
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             });
    //             setUploadedFilesSelectedData([]);
    //             navigate(
    //                 `/my-dashboard/service/${service}/process/${process}?Tab=1`
    //             );
    //         } else {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Error!",
    //                 text: result?.data?.message,
    //             });
    //         }
    //         setReload(!reload);
    //     } catch (error) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Error!",
    //             text: "Something went wrong please try again later.",
    //         });
    //     }
    // };

    // const handleSave = async (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         // text: "You won't be able to revert this!",
    //         icon: "info",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, save it!",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             confirmSave(id);
    //         }
    //     });
    // };

    // const displayUploadedFilesSelectedData = async (id) => {
    //     try {
    //         const result = await getUploadedFileData(id, process);
    //         console.log(result);
    //         if (result?.statusText === "OK") {
    //             setUploadedFilesSelectedData([result?.data]);
    //         } else {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: result?.statusText,
    //                 text: "Something went wrong please try again later.",
    //             });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         Swal.fire({
    //             icon: "error",
    //             title: "Error!",
    //             text: "Something went wrong please try again later.",
    //         });
    //     }
    // };

    const confirmDelete = async (id) => {
        try {
            const result = await window.engine.Proxy('/protected/'+process+'/deleteFile/' + id, 'delete', null);
            // "/protected/" + process + "/deleteFile/" + id
            if (result?.data?.status === "deleted") {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
                setReload(!reload);
                setUploadedFilesSelectedData([]);
            } else {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: error?.message,
                icon: "error",
            });
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result?.isConfirmed) {
                confirmDelete(id);
            }
        });
    };

    const confirmSave = async (id) => {
        console.log(id)
        try {
            const result = await window.engine.Proxy('/protected/'+process+'/markSaved/' + id, 'patch', null);
            // "/protected/" + process + "/markSaved/" + id
            console.log(result)
            if (result?.data?.status === "saved") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your file has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setUploadedFilesSelectedData([]);
                // navigate(
                //     `/my-dashboard/service/${service}/process/${process}?Tab=1`
                // );
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: result?.data?.message,
                });
            }
            setReload(prev => !prev);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something went wrong please try again later.",
            });
        }
    };

    const handleSave = async (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, save it!",
        }).then((result) => {
            if (result.isConfirmed) {
                confirmSave(id);
            }
        });
    };

    const displayUploadedFilesSelectedData = async (id) => {
        try {
            const result = await window.engine.Proxy('/protected/'+process+'/getFile/' + id, 'get', null);
            // "/protected/" + process + "/getFile/" + id
            console.log(result);
            if (result?.statusText === "OK") {
                setUploadedFilesSelectedData(result?.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: result?.statusText,
                    text: "Something went wrong please try again later.",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something went wrong please try again later.",
            });
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="relative rounded-md overflow-hidden mt-2">
            <h2 className="text-center text-lg font-semibold text-[#3a3737] mt-3 ms-2 w-full">
                Uploaded File List
            </h2>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Typography
                    fontSize={14}
                    sx={{
                        textAlign: "center",
                        color: "red",
                    }}
                >
                    Error: {error}
                </Typography>
            ) : (
                // <p className="text-center text-[red] text-sm"></p>
                <div>
                    <TablePagination
                        sx={{ backgroundColor: "#e4e4e4" }}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={uploadedFiles?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            width: 10,
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                    >
                                        Upload Id
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: 5,
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        File Name
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: 10,
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        Upload Type
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: 5,
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        Upload Date & Time
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: 5,
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        Quantity of EP
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: 5,
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: 5,
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        Action
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: 5,
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            fontSize: 14,
                                        }}
                                        align="center"
                                    >
                                        Data
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    uploadedFiles &&
                                    uploadedFiles?.length !== 0 &&
                                    uploadedFiles
                                        ?.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row, index) => {
                                            // const dateAndTime = row?.updated_at.split("T");
                                            // const formatedDate = convertDateFormate(row?.updated_at);
                                            // const newFormatedDate = `${dateAndTime?.[1].slice(
                                            //     0,
                                            //     8
                                            // )} ${formatedDate}`;
                                            return (
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
                                                        {row?.f_id}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            whiteSpace: "nowrap",
                                                            fontSize: 14,
                                                        }}
                                                        align="left"
                                                    >
                                                        {row?.Name}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            whiteSpace: "nowrap",
                                                            fontSize: 14,
                                                        }}
                                                        align="center"
                                                    >
                                                        {row?.meta["Upload Type"]}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            whiteSpace: "nowrap",
                                                            fontSize: 14,
                                                        }}
                                                        align="center"
                                                    >
                                                        {row?.updated_at}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            whiteSpace: "nowrap",
                                                            fontSize: 14,
                                                        }}
                                                        align="center"
                                                    >
                                                        {row?.payloadCount}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            whiteSpace: "nowrap",
                                                            fontSize: 14,
                                                        }}
                                                        align="center"
                                                    >
                                                        {row?.meta.Status}
                                                    </TableCell>
                                                    <TableCell
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
                                                    </TableCell>
                                                </TableRow>
                                                // <></>
                                            );
                                        })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
}
