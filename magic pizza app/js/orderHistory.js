var table_In_History, tableRow_In_History, tableData_In_History;
var get_HistoryPayload, get_Array_ItemsInHistory, get_BillTotal;
var historyEmptyText;
debugger
get_Array_ItemsInCart = sessionStorage.getItem('ls_Set_Array_ItemsInCart'); 

get_HistoryPayload = sessionStorage.getItem('ls_set_historyPayload');
get_Array_ItemsInHistory = sessionStorage.getItem('ls_set_array_ItemsInHistory');
get_BillTotal = sessionStorage.getItem('ls_set_TotalBill');

historyEmptyText = document.getElementById("span_History_EmptyText");
table_In_History = document.getElementById("table_InHistoryItems");

;

if((get_Array_ItemsInHistory == undefined || get_Array_ItemsInHistory == null || get_Array_ItemsInHistory == "[]"))
{
  //no orders placed
  swal.fire(
    {
      icon: "error",
      title: "Oops...",
      text : `No orders Placed Yet`,
      position: "center",
      background: "antiquewhite",
      width:"400px",
      confirmButtonColor :"#008080",
    });
    table_In_History.hidden = true;
    historyEmptyText.hidden = false;
}
else if(get_Array_ItemsInHistory)
{
  //show table
  table_In_History.hidden = false;

  //hide text that says history is empty
  historyEmptyText.hidden = true;

  //get Array Items in , bill
  get_Array_ItemsInHistory = JSON.parse(get_Array_ItemsInHistory);

  // get_Array_ItemsInCart.forEach(function(item){
  for (var i in get_Array_ItemsInHistory){
    var tableRow_In_History = `<tr id=${i} style="margin-top:10px">
                                <td id="order${i}_Id">${get_Array_ItemsInHistory[i].orderId}</td>
                                <td id="order${i}_ItemNames">${get_Array_ItemsInHistory[i].orderItemsNames}</td>
                                <td id="order${i}_ItemQuantityTotal">${get_Array_ItemsInHistory[i].orderItemsQuantityTotal}</td>
                                <td id="order${i}_TotalBill">${get_Array_ItemsInHistory[i].orderBillTotal}</td>
                              <tr>`;
                          table_In_History.innerHTML += tableRow_In_History;                            
  }
}
