
function printMonth(currentMonth) {

  var daysInMonth = currentMonth.daysInMonth();
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $(".giorni-mese");
  target.html("");
  for (var i = 1; i <= daysInMonth; i++) {
    var datecomplete = moment({year : currentMonth.year(), month: currentMonth.month(), day: i});
    var dayshtml = compiled({
      "value": i,
      "datecomplete": datecomplete.format("YYYY-MM-DD")
    });
    target.append(dayshtml);
  }
}

function printHoliday(currentMonth) {
  var year = currentMonth.year();
  var month = currentMonth.month();

  $.ajax({
  url: "https://flynn.boolean.careers/exercises/api/holidays",
  method : "GET",
  data: {
    "year" : year,
    "month" : month
  },

  success: function(data,state) {

    var holidays = data["response"];
    for (var i = 0; i < holidays.length; i++) {
      var element = $(".giorni-mese li[data-datecomplete='"+holidays[i]["date"]+"']")
      element.addClass("holidays")
    }

  },

  error: function (error){

  }



  });

}

function init() {

  var currentMonth = moment("2018-01-01");
  printMonth(currentMonth);
  printHoliday(currentMonth);
}







$(document).ready(init);
