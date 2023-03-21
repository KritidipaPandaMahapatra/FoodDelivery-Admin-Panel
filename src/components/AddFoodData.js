import React,{useState} from 'react'
import '../components/AddFoodData.css'
import {db,storage} from '../components/Firebase/FirebaseConfig'
import { addDoc,collection } from 'firebase/firestore'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
export default function 
() {
const [foodname,setFoodName]=useState('')
const [fooddes,setFoodDes]=useState('')
const [foodprice,setFoodPrice]=useState('')
const [foodimage,setFoodImage]=useState(null)
const [foodcat,setFoodCat]=useState('')
const [resname,setResName]=useState('')
const [resaddBuilding,setResAddBuilding]=useState('')
const [resaddStreet,setResAddStreet]=useState('')
const [respincode,setResPincode]=useState('')
const [resaddcity,setResCity]=useState('')
const [resphno,setResPhno]=useState('')
const [foodimageurl,setFoodImageurl]=useState('')
const [foodtype,setFoodType]=useState('')
const [mealtype,setMealType]=useState('')
const [foodAddon,setFoodAddon]=useState('')
const [foodAddonprice,setFoodAddonPrice]=useState('')
const [resemail,setResEmail]=useState('')
const hadleSubmit=(e)=>{
    e.preventDefault()
    if(foodimage==null){
        alert("Please Select an image")
        return
    }
    else{
        const imageRef=ref(storage,`FoodImages/${foodimage.name}`)
        uploadBytes(imageRef,foodimage)
        .then(()=>{
            alert('Image Uploaded Successfully')
            getDownloadURL(imageRef)
            .then((url)=>{
                setFoodImageurl(url)
             console.log(url)
             const foodData={
                foodname,
                fooddes,
                foodprice, 
                foodimageurl:url,
                foodcat,
                resname,
                resphno,
                foodtype,
                mealtype,
                foodAddon,
                foodAddonprice,
                resemail,
                resaddBuilding,
                resaddStreet,
                respincode,
                resaddcity,
                id:new Date().getTime().toString()
            }
            console.log("ID->",foodData.id)
            try{
                const docRef=addDoc(collection(db,"FoodData"),foodData)
                alert("Data Added Sucesssfully",docRef.id)
            }
            catch(error){
                console.error("Error Adding Document:",error)
            }
            })
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
}
  return (
    <div className='form-outer'>
        <h1>Add Food Data</h1>
        <form className='form-inner'>
            <label>Food Name</label>
            <input type='text' name='food_name'
            onChange={(e)=>{setFoodName(e.target.value)}}/>
            <br/>
            <label>Food Description</label>
            <input type='text' name='food_des'
            onChange={(e)=>{setFoodDes(e.target.value)}}/>
            <br/>
            <div className='form-row'>
                <div className='form-col'>
                <label>Food Price</label>
            <input type='number' name='food_price' onChange={(e)=>{setFoodPrice(e.target.value)}}/>
                </div>
                <div className='form-col'>
                <label>Food Type</label>
                 <select name='food_type' onChange={(e)=>{setFoodType(e.target.value)}}>
                    <option value="null">Select Food Type</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                 </select>
                </div>
            </div>
            <br/>
            <div className='form-row'>
                <div className='form-col'>
                   <label>Food Category</label>
                   <select name='food_category' onChange={(e)=>{setFoodCat(e.target.value)}}>
                    <option value="null">Select Food Category</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Italian">Italian</option>
                    <option value="Maxican">Maxican</option>
                    <option value="American">American</option>
                 </select>
                 </div>
                 <div className='form-col'>
                <label>Meal Type</label>
                 <select name='meal_type' onChange={(e)=>{setMealType(e.target.value)}}>
                    <option value="null">Select Meal Type</option>
                    <option value="dinner">Dinner</option>
                    <option value="starters">Starters</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="liquid">Liquid</option>
                 </select>
                </div>
            </div>
            <br/>
            <div className='form-row'>
                <div className='form-col'>
                <label>Add On Name</label>
            <input type='text' name='food_add_on' onChange={(e)=>{setFoodAddon(e.target.value)}}/>
                </div>
                <div className='form-col'>
                <label>Add On Price</label>
                <input type='text' name='food_add_on' onChange={(e)=>{setFoodAddonPrice(e.target.value)}}/>
                </div>
            </div>
            <br/>
            <label>Food Image</label>
            <input type='file' name='food_image'
            onChange={(e)=>{setFoodImage(e.target.files[0])}}/>
            <br/>
            <label>Restaurant Name</label>
            <input type='text' name='restaurant_name'
            onChange={(e)=>{setResName(e.target.value)}}/>
            <br/>
            <div className='form-row'>
                <div className='form-col'>
                <label>Restaurant Building Number/Name</label>
            <input type='text' name='restaurant_address_building' onChange={(e)=>{setResAddBuilding(e.target.value)}}/>
                </div>
                <div className='form-col'>
                <label>Restaurant Street/Area Name</label>
                <input type='text' name='restaurant_address_street' onChange={(e)=>{setResAddStreet(e.target.value)}}/>
                </div>
            </div>
            <br/>
            <div className='form-row'>
                <div className='form-col'>
                <label>Restaurant City</label>
            <input type='text' name='restaurant_city' onChange={(e)=>{setResCity(e.target.value)}}/>
                </div>
                <div className='form-col'>
                <label>Restaurant Pin-code</label>
                <input type='number' name='restaurant_pin_code' onChange={(e)=>{setResPincode(e.target.value)}}/>
                </div>
            </div>
            <br/>
            <div className='form-row'>
                <div className='form-col'>
                <label>Restaurant Email</label>
                 <input type='email' name='restaurant_email' onChange={(e)=>{setResEmail(e.target.value)}}/>
                </div>
                <div className='form-col'>
                <label>Restaurant Phone No</label>
                 <input type='number' name='restaurant_phno'
                  onChange={(e)=>{setResPhno(e.target.value)}}/>
                </div>
            </div>
            <br/>
            <button onClick={hadleSubmit}>Add Food</button>
        </form>
    </div>
  )
}
