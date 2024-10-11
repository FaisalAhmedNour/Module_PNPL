import { useState } from 'react';
import Button from '@mui/material/Button';
import Loader from './Loader';

const ExportExcelButton = ({
    data,
    headers,
    filename,
    includeTable,
}) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const exportToExcel = async () => {
        setIsDownloading(true);
        const { Workbook } = await import('exceljs');
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        if (includeTable) {
            worksheet.addTable({
                name: 'MyTable',
                ref: `A1`,
                headerRow: true,
                style: {
                    theme: 'TableStyleMedium2',
                    showRowStripes: true,
                },
                columns: headers.map(header => ({ name: header, filterButton: true })),
                rows: data?.map(row => headers?.map(header => row[header])),
            });
        }
        else {
            worksheet.addRow(headers);

            data.forEach(row => {
                worksheet.addRow([row?.id, row?.title, row?.completed]);
            });
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.${includeTable ? 'xlsx' : 'csv'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsDownloading(false);
    };

    return (
        <Button
            size='small'
            variant='outlined'
            disabled={isDownloading}
            onClick={exportToExcel}
            sx={{ whiteSpace: 'nowrap', width: '100%', height: 25 }}
        >
            {isDownloading ? <Loader /> : "Export to Excel"}
        </Button>
    );
};

export default ExportExcelButton;
