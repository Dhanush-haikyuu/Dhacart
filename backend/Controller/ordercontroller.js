const ordermodel = require('../models/ordermodel');
const productmodel = require('../models/productmodel');
exports.createorder=async (req,res,next)=>{
    console.log(req.body,'DATA');
    const cartitems = req.body;
    const amount = Number(cartitems.reduce((acc,item)=>(acc+item.product.price*item.qty),0)).toFixed(2);
    const status = 'pending';

    const order=await ordermodel.create({cartitems,amount,status});

    cartitems.forEach(async(items)=>{
        const product = await productmodel.findById(items.product._id);
        product.stock -= items.qty
        await product.save();


    })

    console.log(amount);

    res.json({
        status:'success',
        order
        
    })
}