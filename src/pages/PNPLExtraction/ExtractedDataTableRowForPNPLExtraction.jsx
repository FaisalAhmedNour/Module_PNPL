import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, IconButton, Modal, TableCell, TableRow, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '58%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    border: 0,
    borderRadius: 2
};

const ExtractedDataTableRowForPNPLExtracted = ({
    index,
    headers,
    finalData,
    handleChange,
    handleDelete
}) => {
    const [open5, setOpen5] = useState(false);

    const handleOpen5 = () => {
        setOpen5(true)
    };

    const handleClose5 = () => {
        setOpen5(false)
    }

    return (
        <>
            <TableRow
                key={index}
                sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:nth-of-type(even)": {
                        backgroundColor: "#bee2fd",
                    },
                    "&:nth-of-type(odd)": {
                        backgroundColor: "#eeeeee",
                    },
                }}
            >
                {headers?.map(
                    (header, indx) =>
                    (
                        <TableCell
                            sx={{
                                whiteSpace: "nowrap",
                                backgroundColor: finalData[index].type === 'n'
                                    ? "" :
                                    finalData[index].type === 'e' ?
                                        "#f0a6a6" : "yellow",
                            }}
                            key={indx}
                            align="center"
                        >
                            <p className={`p-0`}>
                                <input
                                    type="text"
                                    className={`h-full text-center py-1 px-1 w-full border rounded index text-[14px] ${index % 2 === 0 && "bg-[#e0e3ea]"
                                        }`}
                                    value={finalData[index][header]}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            headers[indx],
                                            e.target.value
                                        )
                                    }
                                />
                            </p>
                        </TableCell>
                    )
                )}
                <TableCell
                    align="center"
                    sx={{
                        position: 'sticky',
                        right: 0,
                        zIndex: 20,
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
            <Modal
                open={open5}
                onClose={handleClose5}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <div className="relative">
                        <span onClick={handleClose5} className="absolute -top-5 -right-4 cursor-pointer text-xl">
                            <CloseIcon />
                        </span>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontWeight: 600,
                                fontSize: '20px'
                            }}
                        >
                            Message
                        </Typography>
                        {/* <Typography id="modal-modal-title" sx={{ fontSize: '18px', fontWeight: 500 }}>
                            Note:
                        </Typography> */}
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'justify' }}>
                            {/* Though system have no records about invoice. UiCommercial offer you to download the standard format of Exp and fill up the required filed data by using copy paste process. Once you have download the format & filled up the data then you are ready for uploading the file in the UiCommercial portal. */}
                            {finalData[index]["MESSAGE"]}
                        </Typography>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ExtractedDataTableRowForPNPLExtracted;


{/* <TableRow
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
    {headers?.map(
        (header, indx) =>
            header !== "Success" && (
                                                    
                                                )
    )}
    <TableCell
        align="center"
        sx={{
            position: 'sticky',
            right: 0,
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
</TableRow> */}