import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Layout from "../shared/Layout";
import ItemForm from "../shared/ItemForm";
import apiUrl from "../../apiConfig";

function ItemEdit() {
    const navigate = useNavigate()
    const { id } = useParams()  //get the id from the current object to update
    const [item, setItem] = useState({
        title: '',
        link: ''
    })
    const [updated, setUpdated] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`${apiUrl}/items/${id}`)
                console.log(response)
                setItem(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleChange = (event) => {

        const updatedField = { [event.target.name]: event.target.value }

        const editedItem = Object.assign(item, updatedField)

        setItem(editedItem)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios({
            url: `${apiUrl}/items/${id}`,
            method: 'PUT',
            data: item
        }).then(() => setUpdated(true)).catch(console.error)
    }

    useEffect(() => {
        if (updated) {
            return navigate(`/items/${id}`)
        }
    })

    return (
        <Layout>
            <ItemForm
                item={item}
                handleChange={(e) => handleChange(e)}
                handleSubmit={(e) => handleSubmit(e)}
                cancelPath={`/items/${id}`}
            />
        </Layout>
    )
}
export default ItemEdit