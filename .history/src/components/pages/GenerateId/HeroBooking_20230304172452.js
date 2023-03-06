import React from 'react'
import HOC from '../../layout/HOC'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const HeroBooking = () => {

    const fetchData = await axios.get(`http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/bookings/getbookingbyidbyHeroIdbyAdmin/63de12567257381606dc46a1`)

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