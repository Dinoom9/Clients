import React, { useEffect, useState } from 'react'
// Styles
import './ClientsTable.scss'
// Mui
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// Util and Service
import { client, clientsColumns } from '../../models/clientsModel'
import { crudOperations } from '../../service/clients.service';
// Cmps
import NewClientModal from '../NewClientModal/NewClientModal.cmp';
import ClientsDeleteModal from '../ClientsDeleteModal/ClientsDeleteModal.cmp';

export default function ClientsTable() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clientRows, setClientRows] = useState<client[]>([])

  // Function that changes the open state of add new client modal.
  const onClickOpenModal = () => {
    setOpenModal(!openModal)
  }

  // Function that changes the open state of delete client modal.
  const onClickOpenDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }

  // Fetches the clients list from db
  useEffect(() => {
    fetchClients();
  }, []);

  // Async function that fetches the clients from the DB.
  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const clients = await crudOperations.getClients();
      setClientRows(clients || []);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  // Function that checks for duplicate ids before adding new client.
  const checkForDuplicateIds = (id: string): boolean => {
    const indexOfClientWithSameId: number = clientRows.findIndex((client: client) => client.id === id)

    return indexOfClientWithSameId >= 0 ? true : false;
  }

  // Async function that deletes one or more clients from the db and fetches the updated list of clients.
  const deleteClients = async () => {
    setIsLoading(true)
    try {
      await crudOperations.delete(selectedRows)
      await fetchClients();
    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
  }

  // Async function that adds a new client to the db and fetches the updated list of clients.
  const addNewClient = async (client: client) => {
    setIsLoading(true)
    try {
      await crudOperations.create(client)
      await fetchClients();

    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
  }
  return (
    <>
      <div className={"clientsTableContainer"}>
        <Box
          className={"dataGridBoxContainer"} 
        >
          <DataGrid
            loading={isLoading}
            rows={clientRows}
            columns={clientsColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            // disableRowSelectionOnClick
            onRowSelectionModelChange={(e) => setSelectedRows(e as string[])}
            // autoHeight
            // autoPageSize
            // loading
            // rowSpacingType='border'
            classes={{
              columnHeader: "muiDataGridColumnHeader",
              columnHeaderDraggableContainer: "muiDataGridColumnDragagble",
            }}
          />
          <section className={"clientsTableButtonsContainer"}>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={onClickOpenModal}
            >
              Add
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteRoundedIcon />}
              disabled={selectedRows.length === 0}
              onClick={onClickOpenDeleteModal}
            >
              Delete
            </Button>
          </section>
        </Box>
      </div>
      {openModal && (
        <NewClientModal
          openModalStateFunc={onClickOpenModal}
          addNewClient={addNewClient}
          checkForDuplicateIds={checkForDuplicateIds}
        />
      )}
      {openDeleteModal && (
        <ClientsDeleteModal
          openDeleteModalState={onClickOpenDeleteModal}
          deleteClientsFunc={deleteClients}
        />
      )}
    </>
  );
}
