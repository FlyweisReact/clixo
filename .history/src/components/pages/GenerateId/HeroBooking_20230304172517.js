import React from 'react'
import HOC from '../../layout/HOC'
import { Table } from 'react-bootstrap'

const HeroBooking = () => {

    const fetchData = async () => {
        try{

        }catch(e) {
            console.log(e)
        }
    }

  return (
    <>
        <Table striped bordered hover>


            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>

            </thead>

            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>

        </Table>
    </>
  )
}

export default HOC(HeroBooking)