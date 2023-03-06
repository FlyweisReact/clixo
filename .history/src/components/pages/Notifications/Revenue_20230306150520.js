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
                </tr>
            </thead>
        </Table>
    </>
  )
}

export default HOC(Revenue)