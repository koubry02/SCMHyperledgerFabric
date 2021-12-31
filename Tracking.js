/**
 * @param {org.supplychainminiprojet.TransferProduct} trade
 * @transaction
 */
 function TransferProduct (trade) {
   console.log(trade);

   var NS = 'org.supplychainminiprojet';
   var factory = getFactory();
   var me = getCurrentParticipant();

   trade.product.provider = me;
   trade.product.owner = trade.newOwner;
   trade.product.purchaseOrder = trade.purchaseOrder;

   var newTrace = factory.newConcept(NS, 'Trace');
   newTrace.timestamp = new Date();
   newTrace.location = trade.shippingLocation;
   newTrace.holder = trade.newOwner;
   trade.product.trace.push(newTrace);



   


     return getAssetRegistry('org.supplychainminiprojet.Product')
        .then(function (assetRegistry) {
            return assetRegistry.update(trade.product);
       });
}

