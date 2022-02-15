$(document).ready(function () {
        jQuery.ajax({

            url: 'https://invoicingtesttask.azurewebsites.net/Invoices',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                data.forEach(function (object) {
                    var tableRow = document.createElement('tr');
                    tableRow.innerHTML =
                        '<td>' + '<a href="details.html?id='+object.id+'&status='+object.status+'" id="' + object.id + '">' + object.periodYear + '.' + object.periodMonth + '</a>' + '</td>' +
                        '<td>' + object.days + '</td>' +
                        '<td>' + object.blh + '</td>' +
                        '<td>' + object.orDays + '</td>' +
                        '<td>' + object.extraFee + '</td>' +
                        '<td>' + object.status + '</td>';
                    document.getElementById("invoice-table-body").appendChild(tableRow);
                });
            },
            error: function (xhr, status, error) {
                console.log(status + '; ' + error);
            }
        });
});

