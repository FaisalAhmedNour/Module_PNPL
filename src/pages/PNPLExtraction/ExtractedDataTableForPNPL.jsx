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
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../Components/Loader";
import ExportExcelButton from "../../Components/ExportExcelButton";
import convertDateFormate from "../../Functions/ConvertToDate";
import Swal from "sweetalert2";
import ExtractedDataTableRowForPNPLExtracted from "./ExtractedDataTableRowForPNPLExtraction";
import { process } from "./PNPLExtraction";

export const headers = [
    "Supplier Name",
    "Creation Date",
    "Packing note number",
    "Supplier Order Number",
    "Estimated Time Of Arrival",
    "Port Of Loading",
    "Carrier",
    "Destination Country",
    "Country of origin",
    "TransportTerm",
    "StyleNumber",
    "Style Name",
    "No Of Cartons",
    "Total Pieces",
    "Net Weight",
    "Gross Weight",
    "Volume",
    "Sign",
    "Comment",
];

const ExtractedDataTableOfPNPL = ({
    setReload,
    isReadyToUpload
}) => {
    const [isUploadButtonVisible, setIsUploadButtonVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [finalData, setFinalData] = useState([]);

    useEffect(() => {
        if (finalData?.length != 0) {
            setIsUploadButtonVisible(true);
        }
    }, [finalData])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getEngineOnSignal = () => {
        window.engine.onProcessStart(function (message) {
            console.log("message stop", message);
            setFinalData([])
        });
    }

    useEffect(() => {
        getEngineOnSignal()

        let isMounted = true;

        const handleTableData = (dt) => {
            console.log(dt)
            if (isMounted) {
                const tableRow = {};
                headers?.forEach((header, index) => (
                    tableRow[header] = dt?.data?.[index] || ""
                ));
                // console.log(tableRow)
                tableRow.type = dt.type;
                setFinalData((prev) => [...prev, tableRow]);
            }
        };

        window.engine.onTableData(handleTableData);

        // Cleanup function to prevent state update after unmount
        return () => {
            isMounted = false;
        };
    }, []);

    const handleUpload = async () => {
        setError("");
        setIsLoading(true);
        const uploadedFIleData = {
            Name: `PN ( ${Date().slice(16, 24)} ${convertDateFormate(Date())} )`,
            meta: {
                "Upload Type": "engine",
            },
            payload: finalData,
        };

        try {
            const result = await window.engine.Proxy("/protected/" + process + "/uploadFile", 'post', uploadedFIleData);
            console.log(result);
            if (result?.statusText === "OK") {
                setIsUploadButtonVisible(false);
                setReload(prev => !prev);
                setFinalData([]);
                Swal.fire({
                    title: "Updated!",
                    text: "Your file has been updated.",
                    icon: "success",
                });
            } else {
                setError("Failed to upload. Please try again.");
            }
            // console.log(result);
        } catch (error) {
            console.error(error);
            setError("Failed to upload. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (rowIndex, key, value) => {
        const temp = [...finalData];
        const row = temp[rowIndex];
        row[key] = value;
        setFinalData(temp);
    };

    const handleDelete = (rowIndex) => {
        const temp = [...finalData];
        temp.splice(rowIndex, 1);
        setFinalData(temp);
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
                    filename={`PN Extraction`}
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
                    // display: "flex",
                    position: "relative",
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
                                    header !== "Success" && (
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
                                    position: 'sticky',
                                    right: 0,
                                    color: 'white',
                                    backgroundColor: "#409cff",
                                    whiteSpace: "nowrap",
                                    textAlign: "center",
                                    borderLeft: 1,
                                    borderColor: "white",
                                    fontSize: 14,
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
                {/* <Table
                    sx={{
                        borderTopRightRadius: 5,
                        overflow: "hidden",
                        position: "sticky",
                        right: 0,
                        zIndex: 30,
                    }}
                    stickyHeader
                    aria-label="sticky table"
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    backgroundColor: "#409cff",
                                    whiteSpace: "nowrap",
                                    textAlign: "center",
                                    borderLeft: 1,
                                    borderColor: "white",
                                    fontSize: 14,
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
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((dataRow, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                            "&:nth-child(even)": {
                                                backgroundColor: "#bee2fd",
                                            },
                                            "&:nth-child(odd)": {
                                                backgroundColor: "#eeeeee",
                                            },
                                        }}
                                    >
                                        <TableCell
                                            align="center"
                                            sx={{
                                                whiteSpace: "nowrap",
                                                backgroundColor: finalData[index].type === 'n'
                                                    ? "" :
                                                    finalData[index].type === 'e' ?
                                                        "#f0a6a6" : "yellow",
                                            }}
                                        >
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <DeleteIcon
                                                    style={{
                                                        color: "#f64040",
                                                        padding: 0,
                                                    }}
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table> */}
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
                        onClick={handleUpload}
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

export default ExtractedDataTableOfPNPL;