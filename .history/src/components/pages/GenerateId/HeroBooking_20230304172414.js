import React from 'react'
import HOC from '../../layout/HOC'
import { Table } from 'react-bootstrap'

const HeroBooking = () => {
  return (
    <>
        <Table striped bordered hover>


            <thead>
                <tr>
                    <th></th>
                </tr>

            </thead>

        </Table>
    </>
  )
}

export default HOC(HeroBooking)