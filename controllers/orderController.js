import { Order } from "../models/orderModels.js";
import { Product } from "../models/product.js"
import { asyncerror } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";



// creating new order
export const newOrder = asyncerror(async(req,res,next)=>{


    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })

    res.status(201).json({
        success:true,
        order,
    })

})


// get order details 

export const getOrderDetails=asyncerror(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("order not found",404));
    }

    res.status(200).json({
        success:true,
        order,
    })
})

// get loggedin user orders (showing all orders of a user)

export const myOrders=asyncerror(async(req,res,next)=>{
    const orders = await Order.find({ user: req.user._id });

   

    res.status(200).json({
        success:true,
        orders,
    })
})

// get all orders --- admin 

export const grtAllOrders=asyncerror(async(req,res,next)=>{
    const orders = await Order.find();

   let totalAmount =0;
   orders.forEach((order)=>{
    totalAmount += order.totalPrice;
   })


    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})

// update order status ---- admin
export const updateOrderStatus=asyncerror(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }
    

  if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler("already delevered !",404))
  }
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if(req.body.status  ===  "Delivered"){

      order.deliveredAt=Date.now()
  }

  await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product=await Product.findById(id);

    product.Stock-=quantity;
    await product.save({validateBeforeSave:false});

}


// delete order --- admin 

export const deleteOrder=asyncerror(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);


      if(!order){
        return next(new ErrorHandler("order not found",404));
    }
    await order.deleteOne();

    res.status(200).json({
        success:true,
    })
})
