import React,{useState,useEffect} from 'react'
import {LoginForm,Loader} from '../components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LOCAL_STORAGE_KEY='loginstate'
const initialState=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
const LoginPage = () => {
const navigate=useNavigate()
const [form,setForm] = useState({email:'',pwd:'',firstName:'',lastName:''})
const [login,setLogin] = useState({email:'',pwd:''})
// const [login,setLogin] = useState({})
const[loading,setLoading] = useState(false);
const [signUp,setSignUp]=useState(initialState==null?false:initialState)
const [confirm,setConfirm]=useState('')
const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
}
const handleChange1 = (e)=>{
    setLogin({...login,[e.target.name]:e.target.value})

}
const handleSignUp=()=>{
    setSignUp(!signUp)
}
const handleConfirm =(e)=>{
    setConfirm(e.target.value)
}
const handleSubmit = async (e)=>{
e.preventDefault();
setLoading(true)
if(signUp==true){
    if(confirm===form.pwd){
        try{
            const url= 'http://localhost:8080/v1/signUp'
            const {data:res} = await axios.post(url,form)
            navigate('/login')
            alert(res.message)
        }catch(error){
            console.log('fuck')
            if(
                error.response &&
                error.response.status>=400 &&
                error.response.status <=500
            ){
                alert(error.response.data.message)
            }
        }
        finally{
            setLoading(false)
        }
    }else{
        alert('the passwords do not match')
    }
}
    else{
        try{
            // console.log(login)
            const url = 'http://localhost:8080/v1/auth'
            const {data:res} = await axios.post(url,login)
            window.location='/'
            console.log('logged in')
            }
        catch(error){
            if(error.response &&
            error.response.status>=400 &&
            error.response.status <=500)
        {
            alert(error.response.data.message)
        }        
        }finally{
            setLoading(false)
        }
    }
}
useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(signUp))
},[signUp])

  return (
    <>
        <p className='mt-1 italic  text-[14px] max-w[500px]'>
            dont have an account? click <a className="text-[#0049B7] underline 
            transition ease-in-out delay-250 hover:text-red-600 cursor-pointer" 
            onClick={handleSignUp}>here</a>
        </p>
        {signUp==false?(
    <div className="flex flex-col bottom-h-screen justify-center items-center">
    {/* <section className='max-w-7xl mx-auto'> */}
     <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
            Login
        </h1>
        <p className='mt-2 text[#666e75] text-[16px] max-w[500px]'>
            login to have a personalised experience on of dalle-clone and store your prompts and images
        </p>
    </div>
    <form className='mt-5 MAX-W-3XL' onSubmit={handleSubmit}>
    <div className='flex flex-col gap-5'>
        <>
        <LoginForm
        labelName="Email"
        type="text"
        name="email"
        placeholder="enter your email..."
        value={login.email}
        handleChange={handleChange1}
        />
        <LoginForm
        labelName="Password"
        type="password"
        name="pwd"
        placeholder="enter your password..."
        value={login.pwd}
        handleChange={handleChange1}
        />
        </>
    </div>
    <button 
    type="submit"
    className='transition ease-in-out delay-250 
    mt-3 text-white bg-[#0049B7]
    font-medium rounded-md text-sm w-full sm:w-auto
    px-5 py-2.5 text-center hover:scale-105 hover:shadow-lg hover:bg-white hover:text-[#0049B7]'
    >
    {signUp?(loading?'creating account...':'Create Account'
    ):(
        loading?'logging in...':'Login')}
    </button>
    </form>
    {/* </section> */}
    </div>
    ):(
        <div className="flex flex-col bottom-h-screen justify-center items-center">
    {/* <section className='max-w-7xl mx-auto'> */}
     <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
            SignUp
        </h1>
        <p className='mt-2 text[#666e75] text-[16px] max-w[500px]'>
            SignUp to have a personalised experience on of dalle-clone and store your prompts and images
        </p>
    </div>
    <form className='mt-5 MAX-W-3XL' onSubmit={handleSubmit}>
    <div className='flex flex-col gap-5'>
        <>
        <LoginForm
        labelName="firstName"
        type="text"
        name="firstName"
        placeholder="enter your first name..."
        value={form.firstName}
        handleChange={handleChange}
        />
        <LoginForm
        labelName="lastName"
        type="text"
        name="lastName"
        placeholder="enter your last name..."
        value={form.lastName}
        handleChange={handleChange}
        />
        <LoginForm
        labelName="Email"
        type="text"
        name="email"
        placeholder="enter your email ID..."
        value={form.email}
        handleChange={handleChange}
        />
        <LoginForm
        labelName="Password"
        type="password"
        name="pwd"
        placeholder="create a password..."
        value={form.pwd}
        handleChange={handleChange}
        />
        <LoginForm
        labelName="Confirm Password"
        type="password"
        // name="pwd"
        placeholder="confirm your password..."
        value={confirm}
        handleChange={handleConfirm}
        />

        </>
    </div>
    <button 
    type="submit"
    className='transition ease-in-out delay-250 
    mt-3 text-white bg-[#0049B7]
    font-medium rounded-md text-sm w-full sm:w-auto
    px-5 py-2.5 text-center hover:scale-105 hover:shadow-lg hover:bg-white hover:text-[#0049B7]'
    >
    {signUp?(loading?'creating account...':'Create Account'
    ):(
        loading?'logging in...':'Login')}
    </button>
    </form>
    {/* </section> */}
    </div>
    )
}
</>
  )
}

export default LoginPage