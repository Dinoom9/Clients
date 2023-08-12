import { client } from "../models/clientsModel";
import axios from 'axios'

// Object that holds all the crud operations functions for the client API
export const crudOperations = {
    async delete(ids: string[]): Promise<number | boolean> {
        try {
            const resp = await axios.post('http://localhost:3001/Clients/deleteClient', ids)
            return resp.status
        } catch (err) {
            console.log(err)
            return false;
        }
    },
    async create(client: client) {
        try {
            const resp = await axios.post('http://localhost:3001/Clients/addClient', client, { headers: { 'Content-Type': 'application/json' } });
            console.log(resp)
        } catch (err) {
            console.log(err)
        }
    },
    async getClients(): Promise<client[] | undefined> {
        try {
            const resp = await axios.get('http://localhost:3001/Clients/getClients')
            console.log("🚀 ~ file: clients.service.ts:27 ~ getClients ~ resp:", resp.data)

            return resp.data as client[]
        } catch (err) {
            console.log(err)
        }
    },

}