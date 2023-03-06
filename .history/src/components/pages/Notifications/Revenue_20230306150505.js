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
                    <th>Customer </th>
                </tr>
            </thead>
        </Table>
    </>
  )
}

export default HOC(Revenue)