import React from 'react'
import { Table } from 'react-bootstrap'
import HOC from '../../layout/HOC'

const Revenue = () => {
  return (
    <>
        <Table striped bordered hover >
            <thead>
                <tr>
                    <th>Project Id</th>
                    <th>Customer</th>
                    <th>Hero</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Total Amount</th>
                    <th>Commission</th>
                    <th>Earning</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </Table>
    </>
  )
}

export default HOC(Revenue)