import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ViewAll = () => {
    const userId = localStorage.getItem('userId');
    console.log(userId) 
    const [allItems, setAllItems] = useState([]);
    useEffect(() => {
        try {
            axios.get('http://127.0.0.1:8000/allpasswords', 
            {
              params: {
                user_id: userId,
              }
            })
            .then(response => {
              setAllItems(response.data.data);
            })
            .catch(error => {
              console.log('Error:', error);
              console.log('Error:', error.response.data.message);
            })
          } catch (error) {
            console.log('Error:', error);
            console.log('Error:', error.response.data.message);
          }
    }, [])
    return (
        <div>
            <h4 className='d-flex justify-content-center mt-4'>All passwords</h4>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Site</th>
                        <th scope="col">password</th>
                        <th scope="col">date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allItems.map((item, idx) => (
                            <tr>
                            <th scope="row">{idx}</th>
                            <td>{item.site}</td>
                            <td>{item.password}</td>
                            <td>{item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewAll