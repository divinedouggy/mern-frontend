

import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../shared/Layout";
import apiUrl from "../../apiConfig";


function Item() {
    const [item, setItem] = useState([])
    const [deleted, setDeleted] = useState(false)

    //extracting the id from the current url path
    const { id } = useParams()

    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`${apiUrl}/items/${id}`)
                const result = response.data.item
                setItem(result)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    })


    const destroy = () => {
        axios({
            url: `${apiUrl}/items/${id}`,
            method: 'DELETE'
        }).then(() => setDeleted(true)).catch(console.error)
    }

    useEffect(() => {
        if (deleted) {
            return navigate("/")
        }
    }, [deleted, navigate])

    useEffect(() => {
        if (!item) {
            return <p>Loading...</p>
        }
    }, [item])


    return (
        <Layout>
            <h4>{item.title}</h4>
            <p>Link: {item.link}</p>
            <button onClick={() => destroy()}>Delete Item</button>
         
            <NavLink to={`/items/${id}/edit`} >
                <button>Edit</button>
            </NavLink>

            <NavLink to="/items">Back to all items</NavLink>
        </Layout>
    )
}

export default Item