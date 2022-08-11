




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../shared/Layout'
import ItemForm from '../shared/ItemForm'
import apiUrl from "../../apiConfig";

function ItemCreate() {
    const navigate = useNavigate();
    const [item, setItem] = useState({
        title: '',
        link: '',
    })

    const [createdItem, setCreatedItem] = useState()
   

    const handleChange = (event) => {
        const updatedField = { [event.target.name]: event.target.value }
        const editedItem = Object.assign(item, updatedField)
        setItem(editedItem)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // If the entry is created in the database, save the response data
        axios({
            url: `${apiUrl}/items`,
            method: 'POST',
            data: item
        }).then(res => setCreatedItem(res.data.item)).catch(console.error)
    }

    useEffect(() => {
        if (createdItem) {
            return navigate('/items')
        }
    }, [createdItem, navigate])

    return (
        <Layout>
            <ItemForm
                item={item}
                handleChange={(e) => handleChange(e)}
                handleSubmit={(e) => handleSubmit(e)}
                cancelPath='/'
            />
        </Layout>
    )
}

export default ItemCreate