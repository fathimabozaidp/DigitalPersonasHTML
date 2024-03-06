var table_In_Cart, tableRow_In_Cart, tableData_In_Cart;
var rowIndex = null;
var currentRow = null;
var cells;
var get_New_ItemRow_Payload={}, get_Array_ItemsInCart=[];
var get_New_ItemRow_Payload_Length;
var itemNameInCart,itemPriceInCart,inputItemInCart,itemTotalInCart;
var itemNameValueInCart, itemPriceValueInCart, inputItemValueInCart,itemTotalValueInCart;
var Updated_ItemRow_Payload={};
var totalBill, totalBillValue=0;
var itemTotal, itemTotalValue = 0;
var gst,gstValue = 0;
var deliveryPartnerFee, deliveryPartnerFeeValue=0;
var platformFee,platformFeeValue=0;
var cartEmptyText = document.getElementById("emptyText");
// var placeOrderAmount;
var paymentOptionsListDiv;
var paymentInputId, paymentInputIdValue="";
var cardNoIdValue="",cardExpiryValue="",cardCVVValue="";
var cardNoIdValueArray, cardNoIdLastDigits, bankAccountNumberArray, bankAccountNumberLastDigits;
var leftDiv, rightDiv;
var itemsNames = "", itemsQuantityTotal = 0, randomOrderId = "";
var historyPayload={}, array_ItemsInHistory=[]; 
var get_Array_ItemsInHistory=[];
var regExpUPI = /^[a-zA-Z0-9]{5}@[y]{1}[b]{1}[l]{1}$/;
var regExpAccountNo = /^[0-9]{15}$/;
var regExpCardNo =  /^[0-9]{16}$/;
var regExpCardExpiry = /^[0-1][0-2]\/[2-9][4-9]$/;
var regExpCardCVV = /^[0-9]{3}$/;
debugger;
get_New_ItemRow_Payload = JSON.parse(sessionStorage.getItem('ls_Set_New_ItemRow_Payload')); 
get_Array_ItemsInCart = sessionStorage.getItem('ls_Set_Array_ItemsInCart');   
get_TableBody = sessionStorage.getItem('ls_Set_TableBody');

table_In_Cart = document.getElementById("table_InCartItems");

itemTotal = document.getElementById('span_ItemTotalValue');
gst =  document.getElementById('span_GSTChargesValue');
deliveryPartnerFee =  document.getElementById('span_DeliveryPartnerFeeValue');
platformFee =  document.getElementById('span_PlatformFeeValue')
totalBill = document.getElementById('span_TotalBillValue');
// placeOrderAmount = document.getElementById('p_TotalBillValue');
deliveryPartnerFeeValue = parseInt(deliveryPartnerFee.innerHTML);
platformFeeValue = parseInt(platformFee.innerHTML);
leftDiv = document.getElementById("div_OrderDetails_LeftContainer");
rightDiv = document.getElementById("div_OrderDetails_RightContainer");

if((get_Array_ItemsInCart == undefined || get_Array_ItemsInCart == null || get_Array_ItemsInCart == "[]") && (get_TableBody == undefined || get_TableBody == null))
{
  swal.fire(
    {
      icon: "error",
      title: "Oops...",
      text : `No Items in Cart`,
      position: "center",
      background: "antiquewhite",
      width:"400px",
      confirmButtonColor :"#008080",
      footer: '<a href="orderOnline.html" >Please add Items from here</a>'
    });
  table_In_Cart.hidden = true;

  //hide left and right div
  leftDiv.hidden = true;
  rightDiv.hidden = true;
  
  cartEmptyText.hidden = false;
  itemTotal.innerHTML =0;
  gst.innerHTML =0;
  deliveryPartnerFee.innerHTML = 0;
  platformFee.innerHTML = 0;
  totalBill.innerHTML = '000.00';
  // placeOrderAmount.innerHTML = '000.00';
}
else if(get_Array_ItemsInCart)
{
  table_In_Cart.hidden = false;
  cartEmptyText.hidden = true;

  //show left and right div
  leftDiv.hidden = false;
  rightDiv.hidden = false;
  //get Array, Payload length, get table
  get_Array_ItemsInCart = JSON.parse(get_Array_ItemsInCart);
  
  // get_Array_ItemsInCart.forEach(function(item){
  for (var i in get_Array_ItemsInCart){
    var tableRow_In_Cart = `<tr id=${i}>
                            <td id="item${i}Name_InCart">${get_Array_ItemsInCart[i].itemName}</td>
                            <td id="item${i}Price_InCart">${get_Array_ItemsInCart[i].itemPrice}</td>
                            <td>
                              <div>
                                <div id="div_Grid_Item${i}_Quantity" class="div_Grid_Item_Quantity">
                                  <button id="button_Remove_Item${i}" class="removeItemButton" onclick="decreaseItemValueInCart('item${i}Name_InCart','item${i}Price_InCart','input_Item${i}','item${i}Total_InCart',${i})"><i class="fa fa-minus"></i></button>
                                  <input type="number" id="input_Item${i}" class="inputItem" min=0 value="${get_Array_ItemsInCart[i].itemQuantity}" min="0" readonly />
                                  <button id="button_Add_Item${i}" class="addItemButton" onclick="increaseItemValueInCart('item${i}Name_InCart','item${i}Price_InCart','input_Item${i}','item${i}Total_InCart')"><i class="fa fa-plus"></i></button>
                                </div>                              
                              </div>
                            </td>
                            <td id="item${i}Total_InCart">${get_Array_ItemsInCart[i].itemTotal}</td>
                          <tr>
                          `;
                          table_In_Cart.innerHTML += tableRow_In_Cart;
                          
  }

  //item Total calculation
  itemTotalValue = 0;
  totalBillValue = 0;
  gstValue = 0;

  for(i=0;i<get_Array_ItemsInCart.length;i++){
    
    itemTotalValue += get_Array_ItemsInCart[i].itemTotal;
    itemTotal.innerHTML = itemTotalValue;

    gstValue = (itemTotalValue * 0.05)+ 20.95 ;
    gst.innerHTML = gstValue;
  
    totalBillValue = itemTotalValue + gstValue + deliveryPartnerFeeValue + platformFeeValue;
    totalBill.innerHTML = totalBillValue;

    sessionStorage.setItem('ls_set_TotalBill', totalBillValue);

    // placeOrderAmount.innerHTML = totalBillValue;
  }    
}
function decreaseItemValueInCart(inputNameIdInCart,inputPriceIdInCart, inputItemIdInCart, itemTotalIdInCart, rowId){
  debugger;
  //reads item name in cart
  itemNameInCart = document.getElementById(inputNameIdInCart);
  readItemNameValueInCart(itemNameInCart);

  //reads  item price in cart
  itemPriceInCart = document.getElementById(inputPriceIdInCart);
  readItemPriceValueInCart(itemPriceInCart)

  //reading input-value in cart
  inputItemInCart = document.getElementById(inputItemIdInCart);
  readItemValueInCart(inputItemInCart);

  if(inputItemValueInCart > 1){
    //decreases input by 1 in input box
    inputItemInCart.value = inputItemValueInCart - 1;

    //reads updated input value, creates new payload, update cart data at frontend and backend
    inputItemValueInCart = parseInt(inputItemInCart.value);

    //reading Item Total in cart
    itemTotalInCart = document.getElementById(itemTotalIdInCart);
    // readItemTotalValueInCart(itemTotalInCart);
    itemTotalValueInCart = itemPriceValueInCart * inputItemValueInCart; 
    itemTotalInCart.innerText = itemTotalValueInCart;

    setNewPayload();

    updateCartData();

    //bind updated array data to table
    sessionStorage.setItem('ls_Set_Array_ItemsInCart',JSON.stringify(get_Array_ItemsInCart)); 
  
    itemTotalValue = 0;
    gstValue = 0;
    totalBillValue = 0;

    for(i=0;i<get_Array_ItemsInCart.length;i++){
     
      itemTotalValue += get_Array_ItemsInCart[i].itemTotal;
      itemTotal.innerHTML = itemTotalValue;

      gstValue = (itemTotalValue * 0.05)+ 20.95 ;
      gst.innerHTML = gstValue;

      totalBillValue = itemTotalValue + gstValue + deliveryPartnerFeeValue + platformFeeValue;
      totalBill.innerHTML = totalBillValue;

      sessionStorage.setItem('ls_set_TotalBill', totalBillValue);

      // placeOrderAmount.innerHTML = totalBillValue;

    }
    
  }else if(inputItemValueInCart == 1){
    //alert user that item will be removed from cart
    Swal.fire({
      title: "Item will be removed from Cart",
      text: "Are you sure?",
      icon: "warning",
      iconColor:"red",
      showCancelButton: true,
      background: "antiquewhite",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#008080",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        //get array
        get_Array_ItemsInCart = JSON.parse(sessionStorage.getItem('ls_Set_Array_ItemsInCart'));
        //search array for SAME ITEM NAME and merge Payload
        var existingItem_InCart = get_Array_ItemsInCart.find(item =>item.itemName == itemNameValueInCart);
          if(existingItem_InCart){
            // get_Array_ItemsInCart.splice(existingItem_InCart, 1);
            var rowIdInCart = document.getElementById(rowId)
            rowIdInCart.remove();
            
            //delete specific object from array--//remove specific payload from array 
            var itemToBeRemovedFromArray = get_Array_ItemsInCart[rowId];
            var itemToBeRemovedAtIndex = get_Array_ItemsInCart.indexOf(itemToBeRemovedFromArray);
            get_Array_ItemsInCart.splice(itemToBeRemovedAtIndex,1);
            
            //bind updated array data to table
            sessionStorage.setItem('ls_Set_Array_ItemsInCart',JSON.stringify(get_Array_ItemsInCart)); 
            
            Swal.fire({
              title: "Removed!",
              text: "Item sucessfully removed from Cart",
              icon: "success",
              iconColor: "red",
              background: "antiquewhite",
              showConfirmButton: true,
              position: "top"
            }); 

            // window.location.reload();
            itemTotalValue = 0;
            totalBillValue = 0;
            gstValue = 0; 
            for(i=0;i<=get_Array_ItemsInCart.length;i++){  
              if(get_Array_ItemsInCart.length == 0){
                itemTotal.innerHTML =0;
                gst.innerHTML =0;
                deliveryPartnerFee.innerHTML = 0;
                platformFee.innerHTML =0;
                totalBill.innerHTML = 0;
                setTimeout(function(){
                    window.location.reload();
                }, 2000);
              }else{
                itemTotalValue += get_Array_ItemsInCart[i].itemTotal;
                itemTotal.innerHTML = itemTotalValue;

                gstValue = (itemTotalValue * 0.05)+ 20.95 ;
                gst.innerHTML = gstValue;

                totalBillValue = itemTotalValue + gstValue + deliveryPartnerFeeValue + platformFeeValue;
                totalBill.innerHTML = totalBillValue;

                sessionStorage.setItem('ls_set_TotalBill', totalBillValue);
              }                                 
            }          
          }
      }
    });
  }
  
}
function increaseItemValueInCart(inputNameIdInCart,inputPriceIdInCart, inputItemIdInCart, itemTotalIdInCart){
  debugger;
  //reads item name in cart
  itemNameInCart = document.getElementById(inputNameIdInCart);
  readItemNameValueInCart(itemNameInCart);

  //reads  item price in cart
  itemPriceInCart = document.getElementById(inputPriceIdInCart);
  readItemPriceValueInCart(itemPriceInCart)

  //reading input-value in cart
  inputItemInCart = document.getElementById(inputItemIdInCart);
  readItemValueInCart(inputItemInCart);
  //increases input by 1 in input box
  inputItemInCart.value = inputItemValueInCart + 1;
  inputItemValueInCart = parseInt(inputItemInCart.value); 

  //reading Item Total in cart
  itemTotalInCart = document.getElementById(itemTotalIdInCart);
  // readItemTotalValueInCart(itemTotalInCart);
  itemTotalValueInCart = itemPriceValueInCart * inputItemValueInCart;
  itemTotalInCart.innerText = itemTotalValueInCart;

  //reads updated input value, creates new payload, update cart data at frontend and backend
  setNewPayload();

  updateCartData(); 

  //bind updated array data to table
  sessionStorage.setItem('ls_Set_Array_ItemsInCart',JSON.stringify(get_Array_ItemsInCart)); 

  itemTotalValue = 0;
  totalBillValue = 0;
  gstValue = 0;
  for(i=0;i<get_Array_ItemsInCart.length;i++){
    // itemTotalValue = 0;
    itemTotalValue += get_Array_ItemsInCart[i].itemTotal;
    itemTotal.innerHTML = itemTotalValue;

    gstValue = (itemTotalValue * 0.05)+ 20.95 ;
    gst.innerHTML = gstValue;

    totalBillValue = itemTotalValue + gstValue + deliveryPartnerFeeValue + platformFeeValue;
    totalBill.innerHTML = totalBillValue;
  } 
}

function readItemValueInCart(inputItemInCart){
  debugger;
  inputItemValueInCart = parseInt(inputItemInCart.value);
}
function readItemNameValueInCart(itemNameInCart){
  debugger;
  itemNameValueInCart = itemNameInCart.innerHTML;
}
function readItemPriceValueInCart(itemPriceInCart){
  debugger;
  itemPriceValueInCart = parseInt(itemPriceInCart.innerText);
}
// function readItemTotalValueInCart(itemTotalInCart){
//   itemTotalValueInCart = itemTotalInCart.innerText;
// }

function updateCartData(){
  //get array
  get_Array_ItemsInCart = JSON.parse(sessionStorage.getItem('ls_Set_Array_ItemsInCart'));
  //search array for SAME ITEM NAME and merge Payload
  var existingItem_InCart = get_Array_ItemsInCart.find(item =>item.itemName == itemNameValueInCart);
    if(existingItem_InCart){
      //update payload
      existingItem_InCart.itemQuantity = inputItemValueInCart;
      existingItem_InCart.itemTotal = itemTotalValueInCart;
    }  
}
function setNewPayload(){
  Updated_ItemRow_Payload = {
    "itemName": itemNameValueInCart,
    "itemPrice": itemPriceValueInCart,
    "itemQuantity": inputItemValueInCart,
    "itemTotal" : itemTotalValueInCart
}
}
function showHideDiv(divId){
  debugger;
  const clickedDiv = document.getElementById(divId);
  const rightHeading = document.getElementById("h_rightSide");
  if (divId == 'div_OrderDetails_DeliveryAddress_FullAddressContainer') {
    if(clickedDiv.hidden == true){      
      clickedDiv.hidden = false;
    }else{
      clickedDiv.hidden = true;
    }
  } else if (divId == 'div_OrderDetails_TotalBill_Container'){
    if(clickedDiv.hidden == true){
      clickedDiv.hidden = false;
    }else{
      clickedDiv.hidden = true;
    }
  }
 if(document.getElementById("div_OrderDetails_DeliveryAddress_FullAddressContainer").hidden == true &&
    document.getElementById("div_OrderDetails_TotalBill_Container").hidden == true )
 {
  rightHeading.hidden = true;
 }
 else if(document.getElementById("div_OrderDetails_DeliveryAddress_FullAddressContainer").hidden == false &&
          document.getElementById("div_OrderDetails_TotalBill_Container").hidden == false ){
  //heading visible
  rightHeading.hidden = false;
}
else if(document.getElementById("div_OrderDetails_DeliveryAddress_FullAddressContainer").hidden == false ||
        document.getElementById("div_OrderDetails_TotalBill_Container").hidden == false ){
  rightHeading.hidden = false;
}
}
function displayPaymentOptions(){
  debugger;
  var paymentOptionsDiv = document.getElementById('div_AllPayment_OptionContainer');
  if(paymentOptionsDiv.hidden == true){
    paymentOptionsDiv.hidden = false;
  }else{
    paymentOptionsDiv.hidden = true;
  }
}

function showPopUp(paymentOptionsDivId){
  debugger;
  paymentOptionsListDiv = document.getElementById('div_AllPayment_OptionContainer');
  paymentOptionsListDiv.hidden = true;

  if(paymentOptionsDivId == 'div_Dialog_Upi'){
    document.getElementById('div_Dialog_Upi').style.display = "block";
    document.getElementById('div_Dialog_Banking').style.display = "none";
    document.getElementById('div_Dialog_Card').style.display = "none";
    document.getElementById('div_Dialog_QRScanner').style.display = "none";
  }
  else if(paymentOptionsDivId == 'div_Dialog_Banking'){
    document.getElementById('div_Dialog_Upi').style.display = "none";
    document.getElementById('div_Dialog_Banking').style.display = "block";
    document.getElementById('div_Dialog_Card').style.display = "none";
    document.getElementById('div_Dialog_QRScanner').style.display = "none";

  }
  else if(paymentOptionsDivId == 'div_Dialog_Card'){
    document.getElementById('div_Dialog_Upi').style.display = "none";
    document.getElementById('div_Dialog_Banking').style.display = "none";
    document.getElementById('div_Dialog_Card').style.display = "block";
    document.getElementById('div_Dialog_QRScanner').style.display = "none";
    
  }
  else if(paymentOptionsDivId == 'div_Dialog_QRScanner'){
    document.getElementById('div_Dialog_Upi').style.display = "none";
    document.getElementById('div_Dialog_Banking').style.display = "none";
    document.getElementById('div_Dialog_Card').style.display = "none";
    document.getElementById('div_Dialog_QRScanner').style.display = "block";

    //no validations so coding here only for enabling save button
    setTimeout(()=>{
      document.getElementById("button_QRScanner").disabled = false;
    }, 5000);
  }
}
function closePopUp(paymentOptionsDivId){
  debugger;
  paymentOptionsListDiv = document.getElementById('div_AllPayment_OptionContainer');
  paymentOptionsListDiv.hidden = false;
  document.getElementById(paymentOptionsDivId).style.display = "none";
  if(paymentOptionsDivId == 'div_Dialog_Upi'){
    document.getElementById('input_UpiId').value = "";
    document.getElementById("input_UpiId").style.borderColor = "gainsboro";
  }
  else if(paymentOptionsDivId == 'div_Dialog_Banking'){
    document.getElementById('input_AccountNumber').value = "";
    document.getElementById("input_AccountNumber").style.borderColor = "gainsboro";

  }
  else if(paymentOptionsDivId == 'div_Dialog_Card'){
    document.getElementById('input_CardNo').value = "";
    document.getElementById('input_ExpiryDate').value = "";
    document.getElementById('input_CVV').value = "";
    document.getElementById("input_CardNo").style.borderColor = "gainsboro";
    document.getElementById("input_ExpiryDate").style.borderColor = "gainsboro";
    document.getElementById('input_CVV').style.borderColor = "gainsboro";
  } 
}

function validateInput(inputId){
  debugger;

  paymentInputId = document.getElementById(inputId);
  paymentInputIdValue = paymentInputId.value;

  paymentIcon = document.getElementById("i_PaymentTypeValue");
  paymentValue = document.getElementById("span_PaymentTypeValue");

  //validating UPI payment
  if(inputId == 'input_UpiId'){
    if(paymentInputIdValue.match(regExpUPI)){
      console.log("upi matched");
      //enable button
      document.getElementById('button_UpiId').disabled = false;
      document.getElementById('p_UpiErrorText').hidden = true;
      document.getElementById("input_UpiId").style.borderColor = "darkgreen";
    }
    else{
      document.getElementById('button_UpiId').disabled = true;
      document.getElementById('p_UpiErrorText').hidden = false;
      document.getElementById("input_UpiId").style.borderColor = "red";
    }
  }
  //validating Bank
  if(inputId == 'input_AccountNumber'){
    bankAccountNumberArray = paymentInputIdValue.split('');
    bankAccountNumberLastDigits = bankAccountNumberArray.slice(12).join("");
    if(paymentInputIdValue.match(regExpAccountNo)){
      console.log("bank acc no. matched");
      document.getElementById('button_Banking').disabled = false;
      document.getElementById('p_BankErrorText').hidden = true;
      document.getElementById("input_AccountNumber").style.borderColor = "darkgreen";
    }
    else{
      console.log("bank acc no not matched");
      document.getElementById('input_AccountNumber').style.borderColor = "red";
      document.getElementById('button_Banking').disabled = true;
      document.getElementById('p_BankErrorText').hidden = false;      
    }
  }
  //validating Card
  if(inputId == 'input_CardNo') {
    if(paymentInputIdValue.match(regExpCardNo)){
      console.log("card no. matched");
      // document.getElementById('button_Card').disabled = false;
      document.getElementById('p_BankErrorText').hidden = true;
      document.getElementById("input_CardNo").style.borderColor = "darkgreen";
      document.getElementById("input_ExpiryDate").style.borderColor = "black";
      validateAll();
    }
    else{
      console.log("card no. not matched");
      document.getElementById('input_CardNo').style.borderColor = "red";
      document.getElementById("input_ExpiryDate").style.borderColor = "gainsboro";
      document.getElementById('button_Card').disabled = true;
      document.getElementById('p_BankErrorText').hidden = false;  
    }
  }
  if(inputId == 'input_ExpiryDate'){
    if(paymentInputIdValue.match(regExpCardExpiry)){
      console.log("expiry matched");
      // document.getElementById('button_Card').disabled = false;
      document.getElementById('p_BankErrorText').hidden = true;
      document.getElementById("input_ExpiryDate").style.borderColor = "darkgreen";
      document.getElementById("input_CVV").style.borderColor = "black";
      validateAll();
    }
    else{
      console.log("expiry not matched");
      document.getElementById('input_ExpiryDate').style.borderColor = "red";
      document.getElementById("input_CVV").style.borderColor = "gainsboro";
      document.getElementById('button_Card').disabled = true;
      document.getElementById('p_BankErrorText').hidden = false;      
    }
  }
  if(inputId == 'input_CVV'){
    if(paymentInputIdValue.match(regExpCardCVV)){
      console.log("cvv matched");
      // document.getElementById('button_Card').disabled = false;
      document.getElementById('p_BankErrorText').hidden = true;
      document.getElementById("input_CVV").style.borderColor = "darkgreen";
      validateAll();
    }
    else{
      console.log("cvv not matched");
      document.getElementById('input_CVV').style.borderColor = "red";
      document.getElementById('button_Card').disabled = true;
      document.getElementById('p_BankErrorText').hidden = false;      }
  }
}
  
function validateAll(){
  debugger;
  cardNoIdValue = document.getElementById('input_CardNo').value;
  cardExpiryValue = document.getElementById('input_ExpiryDate').value;
  cardCVVValue = document.getElementById('input_CVV').value;
  cardNoIdValueArray = cardNoIdValue.split('');
  cardNoIdLastDigits = cardNoIdValueArray.slice(12).join("");

  if((cardNoIdValue.match(regExpCardNo)) &&(cardExpiryValue.match(regExpCardExpiry)) && cardCVVValue.match(regExpCardCVV)){
    //enable button
    document.getElementById('button_Card').disabled = false;
  }

}

function savePaymentDetails(saveButtonId){
  debugger;
  //placeorder button id to enable it
  placeOrderButton = document.getElementById('button_PlaceOrder');

  if(saveButtonId == 'button_UpiId'){    
    //change Image in left bottom section
    paymentIcon.className = "fa fa-money";
    //update UPI ID in input to the div
    paymentValue.innerHTML = paymentInputIdValue;

    //place order enabled
    placeOrderButton.disabled = false;

    //clear input value, close popup/dialog, hide payment options div
    paymentInputId.value = "";
    closePopUp('div_Dialog_Upi');
    displayPaymentOptions();
  }
  else if (saveButtonId == 'button_Banking') {
    //change Image in left bottom section
    paymentIcon.className = "fa fa-university";
    //update UPI ID in input to the div
    paymentValue.innerHTML = `XXXX XXXX XXXX ${bankAccountNumberLastDigits}`
    
    //place order enabled
    placeOrderButton.disabled = false;

    //clear input value, close popup/dialog, hide payment options div
    paymentInputId.value = "";
    closePopUp('div_Dialog_Banking');
    displayPaymentOptions();
  }
  else if(saveButtonId == 'button_Card'){
    cardNoId = document.getElementById('input_CardNo');
    cardExpiry = document.getElementById('input_ExpiryDate');
    cardCVV = document.getElementById('input_CVV');

    //change Image in left bottom section
    paymentIcon.className = "fa fa-credit-card";
    //update UPI ID in input to the div
    paymentValue.innerHTML = `XXXX XXXX XXXX ${cardNoIdLastDigits}`;

    //place order enabled
    placeOrderButton.disabled = false;

    //clear input value, close popup/dialog, hide payment options div
    cardNoId.value = "";
    cardExpiry.value = "";
    cardCVV.value = "";
    closePopUp('div_Dialog_Card');
    displayPaymentOptions();
  }
  else if(saveButtonId == 'button_QRScanner'){
    paymentIcon = document.getElementById("i_PaymentTypeValue");
    paymentValue = document.getElementById("span_PaymentTypeValue");

    paymentIcon.className = "fa fa-credit-card";
    paymentValue.innerHTML = "QR Scanned";

    //place order enabled
    placeOrderButton.disabled = false;

    //clear input value, close popup/dialog, hide payment options div
    closePopUp('div_Dialog_QRScanner');
    displayPaymentOptions();

  }
}

function placeOrder(){
  debugger;
  //get Array Items in , bill
  // get_Array_ItemsInCart = JSON.parse(get_Array_ItemsInCart);

  //calculate random order Id ex:MP_10001
  randomOrderId ="#MP-"+(Math.round(Math.random()*10000000000));

  //finds all names in order
  for(var i=0; i<get_Array_ItemsInCart.length;i++){
    itemsNames += get_Array_ItemsInCart[i].itemName + '<br> ';
  }

  //finds all quantity of items in order
  for(var i=0; i<get_Array_ItemsInCart.length;i++){
    itemsQuantityTotal += get_Array_ItemsInCart[i].itemQuantity;
  }
  historyPayload = {
                      "orderId" : randomOrderId, 
                      "orderItemsNames" : itemsNames,
                      "orderItemsQuantityTotal" : itemsQuantityTotal,
                      "orderBillTotal" : totalBillValue
                  }

  //checks if table has any rows
  get_Array_ItemsInHistory = sessionStorage.getItem('ls_set_array_ItemsInHistory');

  if(get_Array_ItemsInHistory == null){
    get_Array_ItemsInHistory =[];
    get_Array_ItemsInHistory.push(historyPayload);
  }else{
    get_Array_ItemsInHistory = JSON.parse(get_Array_ItemsInHistory);
    get_Array_ItemsInHistory.push(historyPayload);
  }
  
  // array_ItemsInHistory.push(historyPayload);
  //set historyPayload and historyArray     
  
  sessionStorage.setItem('ls_set_historyPayload',JSON.stringify(historyPayload));
  sessionStorage.setItem('ls_set_array_ItemsInHistory',JSON.stringify(get_Array_ItemsInHistory));

  //empty cart
  for(i=0;i<get_Array_ItemsInCart.length;i++){
    get_Array_ItemsInCart.splice(i);

    table_In_Cart.remove();
    //set newdata in  array item in car
    sessionStorage.setItem('ls_Set_Array_ItemsInCart',JSON.stringify(get_Array_ItemsInCart)); 
  }

  deliveryTime = Math.round(Math.random(30,45)*100);
  Swal.fire({
    title: `Order placed successfully!`,
    text: `Order with ID ${randomOrderId} will be delivered in ${deliveryTime} minutes`,
    icon: "success",
    showConfirmButton: true,
    position: "center",
    background: "antiquewhite",
    confirmButtonColor: "#008080",
    confirmButtonText: "OK"

}).then((result) => {
  if (result.isConfirmed) {
    window.location.href = 'orderHistory.html'
  }
});
}