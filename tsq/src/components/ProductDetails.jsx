import React, {memo} from 'react'
import axios from 'axios'
import randompng from "../assets/randompng.png"
import {useQuery} from '@tanstack/react-query'

const ProductDetails = ({id, headings}) => {
   // data fetch  fn
    const dataDetails = async ({queryKey})=> {
         const response = await axios.get(`http://localhost:8000/${queryKey[0]}/${queryKey[1]}`);
         return response.data;
    }


   const {data: DetailsofProduct, error, isLoading} = useQuery({
        queryKey: ["products", id],
        queryFn: dataDetails,
    })
   
    if(isLoading) return <div>Loading...!</div>
    if(error) return <div>Something went wrong {error.message}</div>

    
  
  return (
    <>
    <div className="space-y-3">
        <h1>{headings}</h1>
        <div>
            <img className="w-20 h-20" loading="lazy" src={randompng} alt={DetailsofProduct.title} />
            <h2>{DetailsofProduct.title}</h2>
            <p className="w-[150px]" >{DetailsofProduct.description}</p>
        </div>
    </div>
    </>
  )
}

export default memo(ProductDetails)