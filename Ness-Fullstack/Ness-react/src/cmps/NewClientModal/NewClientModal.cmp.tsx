import React, { useEffect, useState } from 'react'
import './NewClientModal.scss'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { client } from '../../models/clientsModel';
import ModalButtons from '../ModalButtons/ModalButtons.cmp';



interface NewClientModalProps {
  openModalStateFunc: () => void;
  addNewClient: (clients: client) => void;
  checkForDuplicateIds: (id: string) => boolean;
}

export default function NewClientModal({ openModalStateFunc, addNewClient, checkForDuplicateIds }: NewClientModalProps) {
  const [showModalContainer, setShowModalContainer] = useState<boolean>(false);
  const [newClient, setNewClient] = useState<client>({ fullName: "", id: "", phoneNumber: "", ipAddress: "", geoLocation: "" })
  const [newClientValidation, setNewClientValidation] = useState<any>({ fullName: false, id: false, phoneNumber: false, ipAddress: false })
  const [notValidFlag, setNotValidFlag] = useState<boolean>(false);
  const [duplicateId, setDuplicateId] = useState<boolean>(false);



  useEffect(() => { console.log(newClient) }, [newClient])
  // function that validates that every input has a valid client data before creating it.
  const validateNewClient = () => {
    let flag: boolean = false;
    let tempValidationState: any = { ...newClientValidation }

    // Loop that iterates through the newClient object keys.
    for (const key of Object.keys(newClient)) {
      switch (key) {
        // If fullName property is empty it will raise a flag.
        case "fullName":
          tempValidationState.fullName = !newClient.fullName.length;
          if (tempValidationState.fullName)
            flag = tempValidationState.fullName;
          break;
        // If id doesn't validate with 9 characters exactly or it is duplicate it will raise a flag.
        case "id":
          const idRegex: RegExp = /^\d{9}$/
          tempValidationState.id = !idRegex.test(newClient.id)
          console.log(tempValidationState.id)
          const isIdDuplicate = checkForDuplicateIds(newClient.id)
          if (tempValidationState.id || isIdDuplicate) {
            flag = true;
          }
          setDuplicateId(isIdDuplicate)

          break;
        // If phone number doesn't validate like the regex a flag will be raised.
        case "phoneNumber":
          const phoneRegex: RegExp = /^\+?\d{3}-?\d{9}$/;

          tempValidationState.phoneNumber = !phoneRegex.test(newClient.phoneNumber)
          if (tempValidationState.phoneNumber)
            flag = tempValidationState.phoneNumber

          break;
        // If the IP address is not a valid IP it will raise a flag.
        case "ipAddress":
          const ipRegex: RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

          tempValidationState.ipAddress = !ipRegex.test(newClient.ipAddress);
          if (tempValidationState.ipAddress)
            flag = tempValidationState.ipAddress

          break;
      }
    }
    setNotValidFlag(flag);
    setNewClientValidation({ ...tempValidationState });
    if (!flag) {
      addNewClient(newClient)
      openModalStateFunc()
    }
  }

  // Function that updates the client object state by the id name of the input that fits the specific property name.
  const onChangeInput = (title: string, value: string) => {
    setNewClient((prevState: client) => {
      return ({ ...prevState, [title]: value })
    })
  }

  return (
    <div className='newClientModalBackDrop' onClick={openModalStateFunc}>
      <div className={`newClientModal`} onClick={(e) => e.stopPropagation()}>
        <span>Add Client</span>
        <section>
          <TextField type='number' label="ID" fullWidth value={newClient.id} required error={newClientValidation.id || duplicateId} onChange={(e) => onChangeInput(e.target.id, e.target.value)} id='id' helperText={duplicateId ? "Unique ID" : null} />
          <TextField label="Full name" fullWidth required error={newClientValidation.fullName} id='fullName' onChange={(e) => onChangeInput(e.target.id, e.target.value)} />
          <TextField label="Phone number" placeholder='Example: +972-5734832839' fullWidth required error={newClientValidation.phoneNumber} id='phoneNumber' onChange={(e) => onChangeInput(e.target.id, e.target.value)} />
          <TextField label="IP Address" fullWidth required error={newClientValidation.ipAddress} id='ipAddress' onChange={(e) => onChangeInput(e.target.id, e.target.value)} />
        </section>
        <ModalButtons firstButtonFunc={validateNewClient} secondButtonFunc={openModalStateFunc} firstButtonTitle={"confirm"} secondButtonTitle={"cancel"} />
        {<span style={{ color: "red", visibility: `${notValidFlag ? "visible" : "hidden"}` }}>One or more inputs are invalid</span>}
      </div>
    </div>
  )
}
