import {
    Table,
    Paper,
    TextField,
    Button,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    IconButton,
    TableContainer,
    TablePagination,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ExtractedDataTableRowForPNPLExtracted from "./ExtractedDataTableRowForPNPLExtraction";
import Loader from "../../Components/Loader";
import ExportExcelButton from "../../Components/ExportExcelButton";
import { headers } from "./ExtractedDataTableForPNPL";

// const headers = [
//     "Supplier Name",
//     "Creation Date",
//     "Packing note number",
//     "Supplier Order Number",
//     "Estimated Time Of Arrival",
//     "Port Of Loading",
//     "Carrier",
//     "Destination Country",
//     "Country of origin",
//     "TransportTerm",
//     "StyleNumber",
//     "Style Name",
//     "No Of Cartons",
//     "Total Pieces",
//     "Net Weight",
//     "Gross Weight",
//     "Volume",
//     "Sign",
//     "Comment",
// ];

const UploadedFileDataOfPNPL = ({
    uploadedFilesSelectedData,
    setUploadedFilesSelectedData
}) => {
    const [isUploadButtonVisible, setIsUploadButtonVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [finalData, setFinalData] = useState([]);
    const [fileToUpload, setFileToUpload] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        // setFileToUpload(uploadedFilesSelectedData);
        // uploadedFilesSelectedData?.payload?.forEach(data => {
        //     // const convertedRow = HalfToFull(data);
        //     setFinalData((prev) => [...prev, convertedRow]);
        // });
        setFinalData(uploadedFilesSelectedData?.payload);
        return () => undefined;
    }, [uploadedFilesSelectedData]);

    const handleUpdate = async () => {
        setIsLoading(true);
        const data = {
            Name: uploadedFilesSelectedData?.Name,
            payload: finalData,
        };
        try {
            console.log('/protected/' + process + '/updateFileContent/' + uploadedFilesSelectedData?.f_id)
            const result = await window.engine.Proxy('/protected/' + process + '/updateFileContent/' + uploadedFilesSelectedData?.f_id, 'patch', data);
            //   "/protected/" + process + "/updateFileContent/" + id
            // console.log(result);
            if (result?.data?.status === "updated") {
                Swal.fire({
                    title: "Updated!",
                    text: "Your file has been updated.",
                    icon: "success",
                });
                // setReload(prev => !prev);
                setUploadedFilesSelectedData([])
                setIsUploadButtonVisible(false);
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: result?.data?.message || "Unknown error occurred.",
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: error?.message,
                icon: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (rowIndex, key, value) => {
        const temp = [...finalData];
        const row = temp[rowIndex];
        row[key] = value;
        setFinalData(temp);
        setFileToUpload(temp)
    };

    const handleDelete = (rowIndex) => {
        const temp = [...finalData];
        temp.splice(rowIndex, 1);
        setFinalData(temp);
        setFileToUpload(temp)
        Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Typography
                fontSize={14}
                sx={{
                    textAlign: "center",
                }}
            >
                Error: {error}
            </Typography>
        );
    }

    return (
        <div className="relative rounded-md overflow-hidden border-b-2 mt-2">
            <h3 className="text-center text-lg mt-3 font-semibold text-[#2e2d2d] absolute w-full whitespace-nowrap ms-2">
                Uploaded Data List
            </h3>
            <div className="absolute mt-3 ms-2 z-10">
                <ExportExcelButton
                    data={finalData}
                    headers={headers}
                    includeTable={true}
                    filename={`EP Validation`}
                />
            </div>
            <TablePagination
                sx={{ backgroundColor: "#e4e4e4" }}
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={finalData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableContainer
                component={Paper}
                sx={{
                    position: "relative",
                    // overflow: 'hidden'
                }}
            >
                <Table
                    sx={{
                        borderTopLeftRadius: 5,
                        // overflow: "hidden",
                    }}
                    stickyHeader
                    aria-label="sticky table"
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            {headers?.map(
                                (header, index) =>
                                (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: "#409cff",
                                            whiteSpace: "nowrap",
                                            textAlign: "center",
                                            borderRight: 1,
                                            borderColor: "white",
                                            fontSize: 14,
                                        }}
                                    >
                                        <p className="w-[200px]">{header}</p>
                                    </TableCell>
                                )
                            )}
                            <TableCell
                                sx={{
                                    color: 'white',
                                    backgroundColor: "#409cff",
                                    whiteSpace: "nowrap",
                                    textAlign: "center",
                                    borderLeft: 1,
                                    borderColor: "white",
                                    fontSize: 14,
                                    position: 'sticky',
                                    right: 0
                                }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {finalData &&
                            finalData?.length > 0 &&
                            finalData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((dataRow, index) => (
                                    <ExtractedDataTableRowForPNPLExtracted
                                        key={index}
                                        index={index}
                                        headers={headers}
                                        finalData={finalData}
                                        handleChange={handleChange}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                <div className="my-1 flex justify-center">
                    <Button
                        sx={{
                            height: 25,
                        }}
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={handleUpdate}
                        disabled={
                            !isUploadButtonVisible ||
                            isLoading ||
                            isReadyToUpload
                        }
                    >
                        {isLoading ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            }
        </div>
    )
}

export default UploadedFileDataOfPNPL;