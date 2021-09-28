import { FETCH_PRODUCTS } from "../types"

export const fetchProducts = async (dispatch) => {
    const res = await fetch(`http://localhost:3002/products`)

    dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data
    })
}