import { GridColDef } from "@mui/x-data-grid";

export type client = {
    fullName: string;
    id: string;
    phoneNumber: string;
    ipAddress: string;
    geoLocation: string;
}

export const clientsColumns: GridColDef[] = [
    {
        field: 'fullName',
        headerName: 'Full name',
        type: 'string',
        width: 225,
        editable: true,
    },
    {
        field: 'id',
        headerName: 'ID',
        type: 'string',
        width: 225,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        type: 'string',
        width: 225,
        editable: true,
    },
    {
        field: 'ipAddress',
        headerName: 'IP Address',
        type: 'string',
        width: 225,
        editable: true,
    },
    {
        field: 'geoLocation',
        headerName: 'Geo location',
        type: 'string',
        width: 225,
        editable: true,
    },
];

