import React, {useState} from 'react'
import randompng from "../assets/randompng.png"
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import ProductDetails from './ProductDetails'
import AddProduct from './AddProduct'

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState(1);

  const headings = " Available Products!"
   
    // data fetch  fn
    const dataFetching = async ({queryKey})=> {
         const response = await axios.get(`http://localhost:8000/products?_page=${queryKey[1].page}&_per_page=6`);
         return response.data;
    }


   const handleClickforDetails = (id)=> {
         setDetails(id)
    }
    
    // query
   const {data: ListofProduct, error, isLoading} =  useQuery({
        queryKey:["products", {page}],
        queryFn: dataFetching,
    })
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Something went wrong...! {error.message}</div>
  return (
    <>
    <section className="flex justify-start items-start p-3 ">
      <div className="w-3/10 h-auto  p-3 my-3 flex justify-start items-start ">
       <AddProduct/>
      </div>


      <div className="w-4/10 h-auto p-3  flex flex-col justify-start items-start  ">
      <div className="w-full h-auto text-center">
            <h2 className="text-3xl my-2">{headings}</h2>
      </div>
       <div >
         <div className="grid grid-cols-2  md:grid-cols-3 items-start justify-start">
      {ListofProduct.data && ListofProduct.data.map(item => (
        <div key={item.id} className="flex flex-col  items-center m-2 rounded-sm border ">
             <img loading="lazy" className="flex object-cover h-20 w-20 rounded-sm" src={randompng} alt={item.title} />
             <p className="text-[16px] my-2">{item.title}</p>
             <button onClick={()=> handleClickforDetails(item?.id)} >See Details</button>
             
        </div>
      ))

      }
    </div>
        </div> 

        <div className="flex items-center gap-3 ">
        


          {ListofProduct.prev && (
            <button onClick={()=> setPage(ListofProduct.prev)} className="py-1 px-2 bg-gray-500 text-white ">Previews</button>
          )

          }
           {ListofProduct.next && (
            <button onClick={()=> setPage(ListofProduct.next)} className="py-1 px-2 bg-gray-500 text-white ">Next</button>
          )

          }

        </div>
   
      </div>

      <div className="w-3/10 h-auto  p-3 my-3 flex justify-start items-start ">
       <ProductDetails headings="Product details" id={details} />
      </div>

      
    

    </section>
    </>
  )
}

export default ProductList