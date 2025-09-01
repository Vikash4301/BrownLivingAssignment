const express=require("express");
const port=3000;

//this is port number on which server is going to run
const app=express();

//this is middleware to parse data
app.use(express.json());

const products=[
    {id: 1, name: "Washing Machine", price:35000},
    {id: 2, name: "Mobile", price: 80000},
    {id: 3, name: "Motorcycle", price: 1500000},
    {id: 4, name: "Camera", price: 60000}
];

//this is get api for fetching all the products details
app.get("/products",(req,res)=>{
    res.json(products);
})

app.post("/cart",(req,res)=>{
    const {Id,quantity} = req.body;

    const product = products.find(p => p.id === Id);

    if (!product) {
    return res.status(404).json({ error: "Product not found" });
    }

    
    if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
    }

    const totalPrice = product.price * quantity;
    res.json({
    product: product.name,
    quantity,
    totalPrice
  });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


