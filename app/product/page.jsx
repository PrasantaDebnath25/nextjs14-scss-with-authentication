"use client";
import { useReducer, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import CheckIcon from '@mui/icons-material/Check';
import UnCheckIcon from '@mui/icons-material/Unarchive';
import Slider from '@mui/material/Slider';
import ToastHot from 'react-hot-toast';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MainLayout from "../MainLayout";
import { ADD_PRODUCT_CART_LIST_API_URL, GET_PRODUCT_BRAND_LIST_API_URL, GET_PRODUCT_LIST_API_URL } from "../../utils/apiUrl";
import Reducer from "../../utils/Reducer";
import { CallWithAuth } from "../../actions/apiAction";
import moment from "moment";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useRouter } from "next/navigation";
import { PRODUCT_CART_LINK, PRODUCT_DESCRIPTION_LINK } from "../../utils/constants";
import { useEffectOnce } from "../../hooks/useEffectOnce";

import Image from "next/image";

const initialStateForProduct = {

  searchTerm: '',
  productList: '',
  totalItem: '',
  brandList: '',
  totalBrandItem: '',
  loading: false,
  validate: false
};


export default function ProductPage() {
  const [state, dispatch] = useReducer(Reducer, initialStateForProduct);
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState(30);


  useEffectOnce(() => {
    getBrandList()
  });

  const getBrandList = async () => {

    let response = await CallWithAuth("GET", GET_PRODUCT_BRAND_LIST_API_URL + ``);

    if (response?.data) {
      if (response.data.status === 200) {
        // let list = [...state.productList, ...response.data.data?.data]
        dispatch({ type: "SETDATA", payload: { "name": "brandList", "value": response.data.data?.data } })
        dispatch({ type: "SETDATA", payload: { "name": "totalBrandItem", "value": response.data?.data?.totalCount } })
      } else {
        dispatch({ type: "SETDATA", payload: { "name": "brandList", "value": [] } })
        dispatch({ type: "SETDATA", payload: { "name": "totalBrandItem", "value": 0 } })
      }

    } else {
      dispatch({ type: 'LOAD', payload: false });
      ToastHot.error('Something went wrong')
    }


  };

 
  console.log("state for product page", state)

  return (

    <MainLayout>
      After login dashboard
    </MainLayout>


  );
}