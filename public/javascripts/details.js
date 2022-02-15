
$(document).ready(function () {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let invoiceID = params.id;
      let status = params.status
      if (status == "In Process"){
          $("#invoice-approval").show();
      }
    jQuery.ajax({

        url: 'https://invoicingtesttask.azurewebsites.net/Invoices/' + invoiceID,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            (function removeNull(invoices) {
                for (var key in invoices) {
                    if (null === invoices[key]) invoices[key] = '-';
                    if (typeof invoices[key] === 'object') removeNull(invoices[key]);
                }
            })(data);

            Array.from(data.activities).forEach(function (object) {

                var tableRow = document.createElement('tr');
                tableRow.innerHTML =
                    '<td>' + object.date.slice(0, 10) + '</td>' +
                    '<td>' + object.activity + '</td>' +
                    '<td>' + object.actualBase + '</td>' +
                    '<td>' + object.daily + '</td>' +
                    '<td>' + object.blhDecimal + '</td>' +
                    '<td>' + object.blh + '</td>' +
                    '<td>' + object.stby + '</td>' +
                    '<td>' + object.or + '</td>' +
                    '<td>' + object.gc + '</td>' +
                    '<td>' + object.upl + '</td>' +
                    '<td>' + object.sick + '</td>' +
                    '<td>' + object.lt + '</td>' +
                    '<td>' + object.proj + '</td>' +
                    '<td>' + object.total + '</td>';
                document.getElementById("invoice-table-details-body").appendChild(tableRow);
            });

        },
        error: function (xhr, status, error) {
            console.log(status + '; ' + error);
        },
    });
    $("#button-approve").click(function () {
        var jsonData = JSON.stringify({
            status: "approve",
            comment: "comment"
        });
        $.ajax({
            url: 'https://invoicingtesttask.azurewebsites.net/Invoices/' + invoiceID,
            type: 'POST',
            data: jsonData,
            contentType: 'application/json; charset=UTF-8',
            success: function () {
                alert("Status changed successfully!");
            },
            error: function () {
                alert("An error occured!");
            }
        });
    });
    
    $("#button-reject").click(function () {
        var jsonData = JSON.stringify({
            status: "reject",
            comment: "comment"
        });
        $.ajax({
            url: 'https://invoicingtesttask.azurewebsites.net/Invoices/' + invoiceID,
            type: 'POST',
            data: jsonData,
            contentType: 'application/json; charset=UTF-8',
            success: function () {
                alert("Status changed successfully!");
            },
            error: function () {
                alert("An error occured!");
            }
        });
    });
    
});


