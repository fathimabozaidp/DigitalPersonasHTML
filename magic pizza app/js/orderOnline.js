var buttonRemove_Item, buttonAdd_Item;
var inputItem, inputItemValue;
var itemName, itemNameValue;
var itemPrice, itemPriceValue;
var new_ItemRow_Payload = {};
var get_Array_ItemsInCart=[];
// var tableBody_Items, get_TableBody;

function readItemValue(inputItem){
    debugger;
    inputItemValue = parseInt(inputItem.value);
}
function readItemNameValue(itemName){
    debugger;
    itemNameValue = itemName.innerHTML;
}
function readItemPriceValue(itemPrice){
    debugger;
    itemPriceValue = parseInt(itemPrice.innerText);
}
//Button -
function decreaseItemValue(buttonId, inputItemId){
    debugger;
    //identifies Input Box
    inputItem = document.getElementById(inputItemId);
    //calling function to read input value 
    readItemValue(inputItem);

    if(parseInt(inputItem.value) == 0){
        buttonId.disabled = true;       
    }
    if(inputItemValue >= 1){
        buttonId.disabled = false;
        inputItem.value = inputItemValue - 1;
    } 
}
//Button +
function increaseItemValue(buttonId, inputItemId){
    debugger;    
    //identifies "-" button 
    buttonRemove_Item = document.getElementById(buttonId);
    //identifies Input Box
    inputItem = document.getElementById(inputItemId);
    //calling function to read input value
    readItemValue(inputItem);
    //increases input by 1 in input box
    inputItem.value = inputItemValue + 1;

    //disables "-" button if input is greater than 1
    if(parseInt(inputItem.value) >1){
        //enable - button
        buttonRemove_Item.disabled = false;
    }    
}
//Menu Items Click displays respective dishes
function displayItems(divId){
    debugger;
    const visibleDivId = document.getElementById(divId);
    switch(visibleDivId){
        case div_Grid_AllContainer :    document.getElementById("div_BreadsContainer").hidden = false;
                                        document.getElementById("div_CakesContainer").hidden = false;
                                        document.getElementById("div_CurriesContainer").hidden = false;
                                        document.getElementById("div_FriesContainer").hidden = false;
                                        document.getElementById("div_MacaronsContainer").hidden = false;
                                        document.getElementById("div_MojitoContainer").hidden = false;
                                        document.getElementById("div_PastriesContainer").hidden = false;
                                        document.getElementById("div_PizzaContainer").hidden = false;
                                        document.getElementById("div_shawarmaContainer").hidden = false;
                                        document.getElementById("div_BiryaniContainer").hidden = false;
                                        break;
                                    
        case div_BiryaniContainer :      document.getElementById("div_BreadsContainer").hidden = true;
                                        document.getElementById("div_CakesContainer").hidden = true;
                                        document.getElementById("div_CurriesContainer").hidden = true;
                                        document.getElementById("div_FriesContainer").hidden = true;
                                        document.getElementById("div_MacaronsContainer").hidden = true;
                                        document.getElementById("div_MojitoContainer").hidden = true;
                                        document.getElementById("div_PastriesContainer").hidden = true;
                                        document.getElementById("div_PizzaContainer").hidden = true;
                                        document.getElementById("div_shawarmaContainer").hidden = true;
                                        document.getElementById("div_BiryaniContainer").hidden = false;
                                        document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)
                                        
                                        break;

        case div_BreadsContainer :  document.getElementById("div_BiryaniContainer").hidden = true;
                                    document.getElementById("div_CakesContainer").hidden = true;
                                    document.getElementById("div_CurriesContainer").hidden = true;
                                    document.getElementById("div_FriesContainer").hidden = true;
                                    document.getElementById("div_MacaronsContainer").hidden = true;
                                    document.getElementById("div_MojitoContainer").hidden = true;
                                    document.getElementById("div_PastriesContainer").hidden = true;
                                    document.getElementById("div_PizzaContainer").hidden = true;
                                    document.getElementById("div_shawarmaContainer").hidden = true;
                                    document.getElementById("div_BreadsContainer").hidden = false;
                                    document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                    break;

        case div_CakesContainer :   document.getElementById("div_BiryaniContainer").hidden = true;
                                    document.getElementById("div_BreadsContainer").hidden = true;
                                    document.getElementById("div_CurriesContainer").hidden = true;
                                    document.getElementById("div_FriesContainer").hidden = true;
                                    document.getElementById("div_MacaronsContainer").hidden = true;
                                    document.getElementById("div_MojitoContainer").hidden = true;
                                    document.getElementById("div_PastriesContainer").hidden = true;
                                    document.getElementById("div_PizzaContainer").hidden = true;
                                    document.getElementById("div_shawarmaContainer").hidden = true;
                                    document.getElementById("div_CakesContainer").hidden = false;
                                    document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                    break;

        case div_CurriesContainer :     document.getElementById("div_BiryaniContainer").hidden = true;
                                        document.getElementById("div_BreadsContainer").hidden = true;
                                        document.getElementById("div_CakesContainer").hidden = true;
                                        document.getElementById("div_FriesContainer").hidden = true;
                                        document.getElementById("div_MacaronsContainer").hidden = true;
                                        document.getElementById("div_MojitoContainer").hidden = true;
                                        document.getElementById("div_PastriesContainer").hidden = true;
                                        document.getElementById("div_PizzaContainer").hidden = true;
                                        document.getElementById("div_shawarmaContainer").hidden = true;
                                        document.getElementById("div_CurriesContainer").hidden = false;
                                        document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                        break;

        case div_FriesContainer :   document.getElementById("div_BiryaniContainer").hidden = true;
                                    document.getElementById("div_BreadsContainer").hidden = true;
                                    document.getElementById("div_CakesContainer").hidden = true;
                                    document.getElementById("div_CurriesContainer").hidden = true;
                                    document.getElementById("div_MacaronsContainer").hidden = true;
                                    document.getElementById("div_MojitoContainer").hidden = true;
                                    document.getElementById("div_PastriesContainer").hidden = true;
                                    document.getElementById("div_PizzaContainer").hidden = true;
                                    document.getElementById("div_shawarmaContainer").hidden = true;
                                    document.getElementById("div_FriesContainer").hidden = false;
                                    document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                    break;

        case div_MacaronsContainer :    document.getElementById("div_BiryaniContainer").hidden = true;
                                        document.getElementById("div_BreadsContainer").hidden = true;
                                        document.getElementById("div_CakesContainer").hidden = true;
                                        document.getElementById("div_CurriesContainer").hidden = true;
                                        document.getElementById("div_FriesContainer").hidden = true;
                                        document.getElementById("div_MojitoContainer").hidden = true;
                                        document.getElementById("div_PastriesContainer").hidden = true;
                                        document.getElementById("div_PizzaContainer").hidden = true;
                                        document.getElementById("div_shawarmaContainer").hidden = true;
                                        document.getElementById("div_MacaronsContainer").hidden = false;
                                        document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                        break;  

        case div_MojitoContainer :  document.getElementById("div_BiryaniContainer").hidden = true;
                                    document.getElementById("div_BreadsContainer").hidden = true;
                                    document.getElementById("div_CakesContainer").hidden = true;
                                    document.getElementById("div_CurriesContainer").hidden = true;
                                    document.getElementById("div_FriesContainer").hidden = true;
                                    document.getElementById("div_MacaronsContainer").hidden = true;
                                    document.getElementById("div_PastriesContainer").hidden = true;
                                    document.getElementById("div_PizzaContainer").hidden = true;
                                    document.getElementById("div_shawarmaContainer").hidden = true;
                                    document.getElementById("div_MojitoContainer").hidden = false;
                                    document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                    break; 

        case div_PastriesContainer :    document.getElementById("div_BiryaniContainer").hidden = true;
                                        document.getElementById("div_BreadsContainer").hidden = true;
                                        document.getElementById("div_CakesContainer").hidden = true;
                                        document.getElementById("div_CurriesContainer").hidden = true;
                                        document.getElementById("div_FriesContainer").hidden = true;
                                        document.getElementById("div_MacaronsContainer").hidden = true;
                                        document.getElementById("div_MojitoContainer").hidden = true;
                                        document.getElementById("div_PizzaContainer").hidden = true;
                                        document.getElementById("div_shawarmaContainer").hidden = true;
                                        document.getElementById("div_PastriesContainer").hidden = false;
                                        document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                        break;

        case div_PizzaContainer :   document.getElementById("div_BiryaniContainer").hidden = true;
                                    document.getElementById("div_BreadsContainer").hidden = true;
                                    document.getElementById("div_CakesContainer").hidden = true;
                                    document.getElementById("div_CurriesContainer").hidden = true;
                                    document.getElementById("div_FriesContainer").hidden = true;
                                    document.getElementById("div_MacaronsContainer").hidden = true;
                                    document.getElementById("div_MojitoContainer").hidden = true;
                                    document.getElementById("div_PastriesContainer").hidden = true;
                                    document.getElementById("div_shawarmaContainer").hidden = true;
                                    document.getElementById("div_PizzaContainer").hidden = false;
                                    document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                    break;

        case div_shawarmaContainer :    document.getElementById("div_BiryaniContainer").hidden = true;
                                        document.getElementById("div_BreadsContainer").hidden = true;
                                        document.getElementById("div_CakesContainer").hidden = true;
                                        document.getElementById("div_CurriesContainer").hidden = true;
                                        document.getElementById("div_FriesContainer").hidden = true;
                                        document.getElementById("div_MacaronsContainer").hidden = true;
                                        document.getElementById("div_MojitoContainer").hidden = true;
                                        document.getElementById("div_PastriesContainer").hidden = true;
                                        document.getElementById("div_PizzaContainer").hidden = true;
                                        document.getElementById("div_shawarmaContainer").hidden = false;
                                        document.getElementById("div_Grid_AllContainer").scrollBy(0,-200)

                                        break;
    }
}

function showMessage(inputItemId, itemNameId, itemPriceId) {
    debugger;
    inputItem = document.getElementById(inputItemId);
    readItemValue(inputItem);

    itemName = document.getElementById(itemNameId);
    readItemNameValue(itemName);

    itemPrice = document.getElementById(itemPriceId);
    readItemPriceValue(itemPrice);

    if(parseInt(inputItem.value) == 0){
        Swal.fire({
                    title: "Please select atleast 1 Item",
                    // text: "You clicked the button!",
                    icon: "error",
                    showConfirmButton: true,
                    // timer: 3000,
                    position: "top",
                    background: "antiquewhite",
                    confirmButtonColor :"#008080"
                    // width:"400px",
                    // height:"70px",
              });
    }else if(parseInt(inputItem.value) >= 1){
        Swal.fire({
            title: "Added to Cart",
            text: `${inputItem.value} ${itemNameValue}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            position: "top",
            background: "antiquewhite",
            // width:"400px",
            // height:"70px",
        });
        var itemTotalValue = itemPriceValue * inputItemValue
        //payload is created irrespective of addtocart clicked 1st or nth time
        new_ItemRow_Payload = {
                    "itemName": itemNameValue,
                    "itemPrice": itemPriceValue,
                    "itemQuantity": inputItemValue,
                    "itemTotal": itemTotalValue
        };
        
        //checks if table has any rows
        get_Array_ItemsInCart = sessionStorage.getItem('ls_Set_Array_ItemsInCart'); 
        get_TableBody = sessionStorage.getItem('ls_Set_TableBody');

        //empty cart - Table has no data/rows (ADDTOCART is clicked first time)
        if(get_Array_ItemsInCart == null){
            //push payload into array
            get_Array_ItemsInCart =[];
            get_Array_ItemsInCart.push(new_ItemRow_Payload);
            //attach array to table body
            // tableBody_Items = get_Array_ItemsInCart;
        }
        else{
            //check if same item exists in cart
            get_Array_ItemsInCart = JSON.parse(get_Array_ItemsInCart);
            var existingItem_InCart = get_Array_ItemsInCart.find(item =>item.itemName === itemNameValue);
            if(existingItem_InCart){
                existingItem_InCart.itemQuantity = inputItemValue;
            }
            else{
                //push payload into cartitems array
                get_Array_ItemsInCart.push(new_ItemRow_Payload);
            }
        }
    }       
    sessionStorage.setItem('ls_Set_New_ItemRow_Payload', JSON.stringify(new_ItemRow_Payload));
    sessionStorage.setItem('ls_Set_Array_ItemsInCart',JSON.stringify(get_Array_ItemsInCart));   
    // sessionStorage.setItem('ls_Set_TableBody', Json.stringify(tableBody_Items));
        
    inputItem.value = 1;
    console.log("Product added to cart successfully");
}      

function searchDishes(){
    debugger;
    var input = document.getElementById("input_Search");
    var filter = input.value.toUpperCase();

    var allRowsOfItemsDiv = document.getElementsByClassName("div_FoodItems");

    for(i=0; i<allRowsOfItemsDiv.length; i++){
        var itemNames = document.getElementsByClassName("itemName");
        if(itemNames){
            dishName = itemNames[i].innerHTML || itemNames[i].innerText;
            if(dishName.toUpperCase().indexOf(filter) > -1){
                allRowsOfItemsDiv[i].style.display = ""
            }else{
                allRowsOfItemsDiv[i].style.display = "none"
            }
        }
    }
}

