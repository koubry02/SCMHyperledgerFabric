/**
 * Initiate from orderer
 * @param {org.supplychainminiprojet.InitiateOrder} InitiateOrder - the InitiateOrder to be processed
 * @transaction
*/
function initiatePurchaseOrder (InitiateOrder) {
    
    var factory = getFactory();
    var NS = 'org.supplychainminiprojet';
    var me = getCurrentParticipant();

    var order = factory.newResource(NS, 'ActorOrder', InitiateOrder.orderId);
      /*// Process the the boolean result.
       console.log('InitiateOrder');
  
      var factory = getFactory();
      var NS = 'org.supplychainminiprojet';
      var me = getCurrentParticipant();
  
      var order = factory.newResource(NS, 'ActorOrder', InitiateOrder.orderId);
      order.orderdetails = InitiateOrder.orderdetails; 
      order.orderer = me;
     
     
      order.provider = InitiateOrder.provider;
      order.orderStatus = 'INITIATED';
  
         return getAssetRegistry(order.getFullyQualifiedType())
             .then(function (assetRegistry) {
                 return assetRegistry.add(order);
           });*/
            


return getParticipantRegistry('org.supplychainminiprojet.Customer')
.then(function (participantRegistry) {
  // Get the specific driver from the driver participant registry.
  return participantRegistry.get(InitiateOrder.provider);
})
.then(function (error) {
  throw new Error('Provider cannot be same as Orderer');
})
.catch(function (customer) {
  if (InitiateOrder.provider != InitiateOrder.orderer)
  {
   console.log('InitiateOrder');

    
    order.orderdetails = InitiateOrder.orderdetails; 
    order.orderer = me;
   
   
    order.provider = InitiateOrder.provider;
    order.orderStatus = 'INITIATED';

       return getAssetRegistry(order.getFullyQualifiedType())
           .then(function (assetRegistry) {
               return assetRegistry.add(order);
         });
  }
  else
  {throw new Error('Provider cannot be customer');}
  
});

}
    
    
 


 /**
 * Confirmation From Provider
 * @param {org.supplychainminiprojet.ConfirmOrder} ConfirmOrder - the ConfirmOrder to be processed
 * @transaction
*/
async function ConfirmPurchaseOrder (ConfirmOrder) {
    console.log('ConfirmOrder');


    const orderRegistry = await getAssetRegistry('org.supplychainminiprojet.ActorOrder');

    ConfirmOrder.order.orderStatus = 'CONFIRMED';

    await orderRegistry.update(ConfirmOrder.order);
   
     	};


 /**
 * DeliverOrder From Provider
 * @param {org.supplychainminiprojet.DeliverOrder} DeliverOrder - the DeliverOrder to be processed
 * @transaction
*/
async function DeliverPurchaseOrder (DeliverOrder) {
    console.log('DeliverOrder');


    const orderRegistry = await getAssetRegistry('org.supplychainminiprojet.ActorOrder');

    DeliverOrder.order.orderStatus = 'DELIVERED';

    await orderRegistry.update(DeliverOrder.order);
   
     	};
    


 /**
 * Deliver Confirmation From Orderer
 * @param {org.supplychainminiprojet.ConfirmDeliverOrder} ConfirmDeliverOrder - the ConfirmDeliverOrder to be processed
 * @transaction
*/
async function DeliverConfirmPurchaseOrder (ConfirmDeliverOrder) {
    
    console.log('ConfirmDeliverOrder');


    const orderRegistry = await getAssetRegistry('org.supplychainminiprojet.ActorOrder');

    ConfirmDeliverOrder.order.orderStatus = 'DELIVERED';

    await orderRegistry.update(ConfirmDeliverOrder.order);
   
     	};
    
 


 


