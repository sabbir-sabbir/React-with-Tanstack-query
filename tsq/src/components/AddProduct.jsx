import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AddProduct = () => {
 const QueryClient = useQueryClient();
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  // useMutation
  const mutation = useMutation({
     mutationFn: (newProduct)=> axios.post("http://localhost:8000/products",newProduct),
     onSuccess: ()=> {
         QueryClient.invalidateQueries(["products"])
     }
  });


  // submit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const newdataIDS = {...state, id: crypto.randomUUID().toString()};
    mutation.mutate(newdataIDS);
    
  };

  // input change fn
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name
    const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
    setState({
      ...state,
      [name]: value
    })
  };

  
  if(mutation.isLoading) {
    return <span>Submitting...</span>
  }
  if(mutation.isError) {
    return <span>Something went wrong {mutation.error.message}</span>
  }

  return (
    <>
      <div>
        <h2>Add new product</h2>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start gap-2"
          >
            <div className="flex flex-col gap-2 ">
              <label>Title</label>
              <input
                type="text"
                value={state.title}
                name="title"
                onChange={handleChange}
                placeholder="Enter product title."
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label>Description</label>
              <textarea
                name="description"
                type="text"
                value={state.description}
                onChange={handleChange}
                placeholder="Enter product description."
              ></textarea>
            </div>

            <div className="flex flex-col gap-2 ">
              <label>Price</label>
              <input
                type="number"
                value={state.price}
                name="price"
                onChange={handleChange}
                placeholder="Enter product price."
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label>Thumbnail URL</label>
              <input
                type="text"
                value={state.thumbnail}
                name="thumbnail"
                onChange={handleChange}
                placeholder="Enter productthumbnail url."
              />
            </div>
            
            <div>
              <button  type="submit" >Complete</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
