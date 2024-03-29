"use client";
import { useReducer, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import ToastHot from 'react-hot-toast';
import MainLayout from "../MainLayout";
import { ADD_PRODUCT_CART_LIST_API_URL, DELETE_PRODUCT_FROM_CART_API_URL, GET_CART_TOTAL_API_URL, GET_PRODUCT_BRAND_LIST_API_URL, GET_PRODUCT_CART_LIST_API_URL, GET_PRODUCT_LIST_API_URL } from "../../utils/apiUrl";
import Reducer from "../../utils/Reducer";
import { CallWithAuth } from "../../actions/apiAction";
import { PRODUCT_LINK } from "../../utils/constants";
import Link from "next/link";

const initialStateForProduct = {
    promoCode: "",
    summaryDetails: "",
    cartList: '',
    totalItem: '',
    loading: false,
    validate: false
};

export default function ShoppingCartPage() {
    const [state, dispatch] = useReducer(Reducer, initialStateForProduct);
    const { user } = useAuth();
    useEffect(() => {
        getFilterwithPaginationList()
        // getCartDetails()
    }, []);


    const getFilterwithPaginationList = async () => {
        dispatch({ type: 'LOAD', payload: true });
        let payload = {
            "userId": user.id
        }
        let response = await CallWithAuth("POST", GET_PRODUCT_CART_LIST_API_URL, payload);

        if (response?.data) {
            if (response.data.status === 200) {
                dispatch({ type: 'LOAD', payload: false });
                dispatch({ type: "SETDATA", payload: { "name": "cartList", "value": response.data?.data?.cartList } })
                dispatch({ type: "SETDATA", payload: { "name": "summaryDetails", "value": response.data?.data } })
                dispatch({ type: "SETDATA", payload: { "name": "totalItem", "value": response.data?.data?.totalCount } })
            } else {
                dispatch({ type: 'LOAD', payload: false });
                dispatch({ type: "SETDATA", payload: { "name": "cartList", "value": [] } })
                dispatch({ type: "SETDATA", payload: { "name": "totalItem", "value": 0 } })
            }

        } else {
            dispatch({ type: 'LOAD', payload: false });
            ToastHot.error('Something went wrong')
        }
    };
    const getCartDetails = async () => {
        dispatch({ type: 'LOAD', payload: true });
        let payload = {
            "userId": user.id
        }
        let response = await CallWithAuth("GET", GET_CART_TOTAL_API_URL);

        if (response?.data) {
            if (response.data.status === 200) {
                dispatch({ type: 'LOAD', payload: false });
                dispatch({ type: "SETDATA", payload: { "name": "summaryDetails", "value": response.data?.data?.data } })
            } else {
                dispatch({ type: 'LOAD', payload: false });
                dispatch({ type: "SETDATA", payload: { "name": "summaryDetails", "value": [] } })
            }

        } else {
            dispatch({ type: 'LOAD', payload: false });
            ToastHot.error('Something went wrong')
        }
    };
    const addToCart = async (listing, values) => {
        let payload = {
          "userId": user.id,
          "priceListItemID": listing.priceListItemID,
          "quantity": values
        }
        let response = await CallWithAuth("PATCH", ADD_PRODUCT_CART_LIST_API_URL, payload);
    
        if (response?.data) {
          if (response.data.status === 200) {
            getFilterwithPaginationList()
            // ToastHot.success("Add to cart sucessfully")
            // let userDetails = {...user}
            // userDetails.cart = userDetails.cart ? userDetails.cart+1 : 1
            // updateUser(userDetails);
            // router.push(PRODUCT_CART_LINK);
          } else {
            dispatch({ type: 'LOAD', payload: false });
          }
    
        } else {
          dispatch({ type: 'LOAD', payload: false });
          ToastHot.error('Something went wrong')
        }
      }

    const updateRate = (values, index) => {
        let searchState = state.cartList && state.cartList.length > 0 ? [...state.cartList] : []
        searchState[index].quantity = values
        addToCart(searchState[index], values)
        dispatch({ type: "SETDATA", payload: { "name": "cartList", "value": searchState } })
        // dispatch({ type: "SETDATA", payload: { "name": "hourlyDetails", "value": values } })
    }
    const removeCartItem = async (listing, index) => {
        
        let response = await CallWithAuth("DELETE", DELETE_PRODUCT_FROM_CART_API_URL+"?cartId="+listing.id);

        if (response?.data) {
            if (response.data.status === 200) {
                dispatch({ type: 'LOAD', payload: false });
                ToastHot.success("Product Removed successfully")
                getFilterwithPaginationList()
            } else {
                dispatch({ type: 'LOAD', payload: false });
            }

        } else {
            dispatch({ type: 'LOAD', payload: false });
            ToastHot.error('Something went wrong')
        }
    }

    const getData = (e) => {
        dispatch({ type: "ONCHANGE", payload: e })
    }

    console.log("Cart Page", state)
    return (

        <MainLayout>
            Test
        </MainLayout >


    );
}