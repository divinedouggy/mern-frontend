

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import apiUrl from "../../apiConfig";

function Items() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading ] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios(`${apiUrl}/items`)
            setItems(response.data.items)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const itemsData = items.map((item) => {
        return <li key={item._id}>
            <NavLink to={`/items/${item._id}`}>{item.title}</NavLink>
        </li>
    })

    return (
        <div>
            <h4>Items</h4>
            <ul>
                {itemsData}
            </ul>
            {isLoading ? <p>Loading...</p> : <p></p>}
        </div>
    )
}

export default Items
