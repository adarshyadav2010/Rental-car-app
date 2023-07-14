
const Orders = require('../model/PlacedOrdersSchema');

const orderRegisterCtrl = async (req, res) => {
  try{
     let data = new Orders(req.body);
        let createData = await data.save();
        res.status(201).send(createData)
    }catch(err){
    res.status(400).json({message:err.message})
}
};


const getOrdersCtrl = async (req, res) => {
  console.log(req.params.id)
    try {
      const UserId= req.params.id
      const allOrders = await Orders.find({userId:UserId});
      console.log(allOrders)
      res.status(200).json({
        status: "success",
        data: allOrders,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };


const deleteOrderCtrl= async(req,res)=>{
try {
  const _id=req.params.id;
  await Orders.deleteOne({_id}).then(data=>{
    console.log(data)
    res.status(200).send({status:'success',
        record:data})
  }).catch(err=>{
    res.status(400).send({message:err.message})
  });
  
} catch (error) {
  res.status(400).send({message:error.message})
}
  }

  const updateOrderCtrl= async(req,res)=>{
  try {
  const _id=req.params.id;
  const updatedData = await Orders.findByIdAndUpdate({_id},req.body,{new:true});
  res.status(201).send(updatedData)
} catch (error) {
  res.status(400).send({message:error.message})
}
 }
  


module.exports = {orderRegisterCtrl, getOrdersCtrl,deleteOrderCtrl ,updateOrderCtrl};
