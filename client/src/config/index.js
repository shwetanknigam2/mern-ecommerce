import { icons } from "lucide-react"
import path from "path"
import { LayoutDashboard,ShoppingBasket,Shirt } from "lucide-react"

export const registerFormControls=[
    {
       name:'username',
       label:'Username',
         type:'text',
         componenttype:'input',
         placeholder:'Enter your username',
         options:"text"


    }
    ,
    {
       name:'email',
       label:'Email',
         type:'email',
         componenttype:'input',
         placeholder:'Enter your email',
    },
    {
       name:'password',
       label:'Password',
         type:'password',
         componenttype:'input',
         placeholder:'Enter your password',
    }
]

export const loginFormControls=[
    {
       name:'username',
       label:'Username',
         type:'text',
         componenttype:'input',
         placeholder:'Enter your username',
         options:"text"


    }
    ,
  
    {
       name:'password',
       label:'Password',
         type:'password',
         componenttype:'input',
         placeholder:'Enter your password',
    }
]

export const addproductFormControls=[
    {
       name:'title',
       label:'Title',
         type:'text',
         componenttype:'input',
         placeholder:'Enter product title',
    },
    {
       name:'price',
       label:'Price',
         type:'number',
         componenttype:'input',
         placeholder:'Enter product price',
    },
    {
       name:'description',
       label:'Description',
         type:'text',
         componenttype:'textarea',
         placeholder:'Enter product description',
    },
    {
       name:'category',
       label:'Category',
        componenttype:'select',
        options:[
          {id:'men',label:'Men'},
          {id:'women',label:'women'   },
          {id:'kids',label:'kids'},
          {id:'accessories',label:'Accessories'},
          {id:'footwear',label:'footwear'},
        ],
    },
    {
      name:'brand',
      label:'Brand',
        componenttype:'select',
       options:[
         {id:'nike',label:'Nike'},
         {id:'adidas',label:'Adidas'   },
         {id:'levi',label:"Levi's"},
         {id:'zara',label:'Zara'},
         {id:'h&m',label:'H&M'},
         {id:'puma',label:'PUMA'},
       ],
   },
   
    {
       name:'saleprice',
       label:'Sale Price',
         type:'number',
         componenttype:'input',
         placeholder:'Enter Sale price',
    },
    {
        name:'stock',
        label:'Stock',
          type:'number',
          componenttype:'input',
          placeholder:'Enter product stock',
      },
    

  ]

  export const shoppingviewheaderitems=[
    {
      id:'home',
      label:'Home',
      path:'/shopping/home',
    },
    {
      id:'products',
      label:'Products',
      path:'/shopping/listing'
    }
    ,
    {
      id:'men',
      label:'Men',
      path:'/shopping/listing'
     },
     {
      id:'women',
      label:'WoMen',
      path:'/shopping/listing'
     },
     {
      id:'kids',
      label:'Kids',
      path:'/shopping/listing'
     },
     {
      id:'accessories',
      label:'Accessories',
      path:'/shopping/listing'
     },
      {
        id:'footwear',
        label:'Footwear',
        path:'/shopping/listing'
      },
      {
        id:'search',
        label:'Search',
        path:'/shopping/search'
      }
  ]

  export const filterOptions = {
    category: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
    brand: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  };

  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];


  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componenttype: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componenttype: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componenttype: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componenttype: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componenttype: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];