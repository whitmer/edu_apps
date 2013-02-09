var chartData = {
  data: [
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ],
  options: {
      title: 'Company Performance',
      hAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
    },
  type: 'AreaChart'
};
$(document).ready(function() {
  var charts = [];
  charts.push({
    type: "Area Chart",
    typeClass: "AreaChart",
    description: "",
    fields: ["X", "Y[]"],
    textualFields: [0],
    example: {
      data: [
        ["Year", "Friends", "Enemies"],
        ["2004", 10, 50],
        ["2005", 30, 30],
        ["2006", 40, 30],
        ["2007", 60, 25],
        ["2008", 50, 15]
      ],
      options: {
        title: "Friends and Enemies",
        'hAxis.title': "Year",
        'vAxis.title': "People",
        'vAxis.minValue': 0, 
        'vAxis.maxValue': 70
      }
    },
    title: true,
    hAxis: true,
    vAxis: true
  });
  charts.push({
    type: "Bar Chart",
    typeClass: "BarChart",
    description: "",
    fields: ["Y", "X[]"],
    textualFields: [0],
    example: {
      data: [
        ["Day", "Candy", "Food", "Beverages"],
        ["Sunday", 50, 25, 25],
        ["Monday", 20, 25, 30],
        ["Tuesday", 20, 25, 30],
        ["Wednesday", 25, 25, 35],
        ["Thursday", 20, 25, 30],
        ["Friday", 50, 30, 60],
        ["Saturday", 75, 20, 65]
      ],
      options: {
        title: "Money Spent on Stuff",
        'hAxis.title': "Dollars",
        'hAxis.minValue': 0, 
        'hAxis.maxValue': 80,
        'vAxis.title': "Day of the Week"
      }
    },
    title: true,
    hAxis: true,
    vAxis: true
  });
  charts.push({
    type: "Bubble Chart",
    typeClass: "BubbleChart",
    description: "",
    fields: ["ID", "X", "Y", "Color Class", "Magnitude"],
    textualFields: [0, 3],
    example: {
      data: [
        ["Hero", "Strength", "Intelligence", "Publisher", "Coolness"],
        ["Spiderman", 60, 90, "Marvel", 100],
        ["Hulk", 100, 20, "Marvel", 90],
        ["Batman", 80, 80, "DC", 100],
        ["Superman", 100, 80, "DC", 60]
      ],
      options: {
        title: "Superhero Coolness",
        'hAxis.title': "Strength", 
        'hAxis.minValue': 0, 
        'hAxis.maxValue': 120,
        'vAxis.title': "Intelligence", 
        'vAxis.minValue': 0, 
        'vAxis.maxValue': 120
      }
    },
    bubbleFontSize: true
  });    
  charts.push({
    type: "Candlestick Chart",
    typeClass: "CandlestickChart",
    description: "",
    fields: ["X", "Min", "Lower Quartile", "Upper Quartile", "Max"],
    textualFields: [0],
    example: {
      data: [
        ["Name", "Score", "Score", "Score", "Score"],
        ["Quiz 1", 10, 15, 20, 25],
        ["Quiz 2", 10, 20, 25, 50],
        ["Quiz 3", 15, 16, 18, 20],
        ["Quiz 4", 10, 30, 31, 32]
      ],
      options: {
        title: "Grades",
        'hAxis.title': "Assignment",
        'vAxis.title': "Score", 
        'vAxis.minValue': 0, 
        'vAxis.maxValue': 50,
        legend: "none"
      }
    },
    labels: false
  });
  charts.push({
    type: "Column Chart",
    typeClass: "ColumnChart",
    description: "",
    fields: ["X", "Y[]"],
    textualFields: [0],
    example: {
      data: [
        ["Day", "Candy", "Food", "Beverages"],
        ["Sunday", 50, 25, 25],
        ["Monday", 20, 25, 30],
        ["Tuesday", 20, 25, 30],
        ["Wednesday", 25, 25, 35],
        ["Thursday", 20, 25, 30],
        ["Friday", 50, 30, 60],
        ["Saturday", 75, 20, 65]
      ],
      options: {
        title: "Money Spent on Stuff",
        'vAxis.title': "Dollars",
        'vAxis.minValue': 0, 
        'vAxis.maxValue': 80,
        'hAxis.title': "Day of the Week"
      }
    },
    title: true,
    hAxis: true,
    vAxis: true
  });
  charts.push({
    type: "Gauge Chart",
    typeClass: "Gauge",
    description: "",
    fields: ["Label", "Value"],
    textualFields: [0],
    example: {
      data: [
        ['Label', 'Value'],
        ["Speed", 100],
        ["Temperature", 30],
        ["Coolness", 90]
      ],
      options: {
        redFrom: 90, redTo: 100,
        yellowFrom: 70, yellowTo: 90
      }
    },
    colorGaugeRanges: true
  })
  charts.push({
    type: "Geo Chart",
    typeClass: "GeoChart",
    description: "",
    fields: ["Location", "Value"],
    textualFields: [0],
    example: {
      data: [
        ["Country", "Vowels "],
        ["Germany", 2],
        ["United States", 5],
        ["France", 2],
        ["China", 2],
        ["Chile", 2],
        ["Canada", 3]
      ],
      options: {
        title: "Countries with Vowels"
      }
    }
  });
  charts.push({
    type: "Line Chart",
    typeClass: "LineChart",
    description: "",
    fields: ["X", "Y[]"],
    textualFields: [0],
    example: {
      data: [
        ["Year", "Friends", "Enemies"],
        ["2004", 10, 50],
        ["2005", 30, 30],
        ["2006", 40, 30],
        ["2007", 60, 25],
        ["2008", 50, 15]
      ],
      options: {
        title: "Friends and Enemies",
        'hAxis.title': "Year",
        'vAxis.title': "People",
        'vAxis.minValue': 0, 
        'vAxis.maxValue': 70
      }
    },
    title: true
  });
  charts.push({
    type: "Pie Chart",
    typeClass: "PieChart",
    description: "",
    fields: ["Label", "Value"],
    textualFields: [0],
    example: {
      data: [
          ['Finger', 'Freckles'],
          ['Thumb', 1],
          ['Pointer', 2],
          ['Birdie', 1],
          ['Ring', 2],
          ['Pinkie', 7]
      ],
      options: {
        title: "Freckles on Fingers"
      }
    },
    title: true
  });
  charts.push({
    type: "Scatter Chart",
    typeClass: "ScatterChart",
    description: "",
    fields: ["X", "Y"],
    textualFields: [],
    example: {
      data: [
        ["Friends", "Enemies"],
        [1, 1],
        [2, 1],
        [1, 2],
        [3, 3],
        [4, 5],
        [6, 6],
        [6, 4],
        [7, 6],
        [8, 5]
      ],
      options: {
        title: "Friends and Enemies",
        legend: "none",
        'hAxis.title': "Friends",
        'hAxis.minValue': 0, 
        'hAxis.maxValue': 10,
        'vAxis.title': "Enemies",
        'vAxis.minValue': 0, 
        'vAxis.maxValue': 10
      }
    },
    title: true,
    hAxis: true,
    vAxis: true
  });
  // charts.push({
  //   type: "Table Chart",
  //   description: "",
  //   fields: ["this one is tricky..."]
  // });
  charts.push({
    type: "Tree Map Chart",
    typeClass: "TreeMap",
    description: "",
    fields: ["Label", "Parent Label", "Magnitude", "Color Value"],
    textualFields: [0, 1],
    emptyFields: [1],
    example: {
      data: [
          ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
          ['Global',    null,                 0,                               0],
          ['America',   'Global',             0,                               0],
          ['Europe',    'Global',             0,                               0],
          ['Asia',      'Global',             0,                               0],
          ['Australia', 'Global',             0,                               0],
          ['Africa',    'Global',             0,                               0],
          ['Brazil',    'America',            11,                              10],
          ['USA',       'America',            52,                              31],
          ['Mexico',    'America',            24,                              12],
          ['Canada',    'America',            16,                              -23],
          ['France',    'Europe',             42,                              -11],
          ['Germany',   'Europe',             31,                              -2],
          ['Sweden',    'Europe',             22,                              -13],
          ['Italy',     'Europe',             17,                              4],
          ['UK',        'Europe',             21,                              -5],
          ['China',     'Asia',               36,                              4],
          ['Japan',     'Asia',               20,                              -12],
          ['India',     'Asia',               40,                              63],
          ['Laos',      'Asia',               4,                               34],
          ['Mongolia',  'Asia',               1,                               -5],
          ['Israel',    'Asia',               12,                              24],
          ['Iran',      'Asia',               18,                              13],
          ['Pakistan',  'Asia',               11,                              -52],
          ['Egypt',     'Africa',             21,                              0],
          ['S. Africa', 'Africa',             30,                              43],
          ['Sudan',     'Africa',             12,                              2],
          ['Congo',     'Africa',             10,                              12],
          ['Zair',      'Africa',             8,                               10]
      ],
      options: {
        showScale: true,
        maxPostDepth: 2
      }
    },
    colorRanges: true
  });
  
  for(var idx in charts) {
    var chart = charts[idx];
    var $option = $("<option/>", {value: chart.type}).text(chart.type);
    $("#chart_type").append($option);
  }
  var chart = null;
  $("#add_row").click(function(event) {
    event.preventDefault();
    var $tr = $("<tr/>");
    for(var idx in chart.fields) {
      var $td = $("<td/>");
      $td.append($("<input/>", {'class': 'span1'}));
      $tr.append($td);
    }
    for(var idx = 1; idx < chart.variableColumns; idx++) {
      var $td = $("<td/>");
      $td.append($("<input/>", {'class': 'span1'}));
      $tr.append($td);
    }
      var $td = $("<td/>").append($("<img/>", {'class': 'delete', src: '/delete.png'}));
      $tr.append($td);
    $("#data tbody").append($tr);
    countRowsAndColumns();
  });
  $("#clear").click(function() {
    chart.variableColumns = 1;
    $("#data tbody tr").remove();
    $("#data thead tr th.extra").remove();
    $("#data input").each(function() { $(this).val(""); });
    $("#add_row").click();
    countRowsAndColumns();
  });
  $(document).on('click', '#data thead .delete', function() {
    if($("#data thead .delete").length == 1) { return; }
    var idx = $(this).closest("th").index();
    $("#data thead th:eq(" + idx + ")").remove();
    $("#data thead th.variable:first").removeClass('extra');
    $("#data tbody tr").each(function() {
      $(this).find("td:eq(" + idx + ")").remove();
    });
    chart.variableColumns--;
    var name = chart.fields[chart.fields.length - 1].replace(/\[\]/, '');
    $("#data thead th.variable").each(function(idx) {
      $(this).find(".field").text(name + (idx + 1));
    });
    countRowsAndColumns();
    preview();
  }).on('click', '#data tbody .delete', function() {
    if($("#data tbody tr").length == 1) { return; }
    $(this).closest("tr").remove();
    countRowsAndColumns();
    preview();
  }).on('click', '#data thead tr .add', function() {
    var idx = ++chart.variableColumns;
    var name = chart.fields[chart.fields.length - 1].replace(/\[\]/, '');
    var $th = $("<th/>").html("<br/><span class='field'>" + name + idx + "</span>").prepend("<input class='span1'/>").data('idx', idx).addClass('extra variable');
    var $delete = $("<img/>", {'class': 'delete', src: '/delete.png'});
    $th.append($delete);
    $("#data thead tr th:last").before($th);
    
    $("#data tbody tr").each(function() {
      var $td = $("<td/>");
      $td.append($("<input/>", {'class': 'span1'}));
      $(this).find("td:last").before($td);
    });
    countRowsAndColumns();
  });
  $("#chart_type").change(function() {
    for(var idx in charts) {
      if(charts[idx].type == $(this).val()) {
        chart = charts[idx];
      }
    }
    if(!chart) { return; }
    $("#data thead tr").empty();
    $("#data tbody").empty();
    chart.variableColumns = 1;
    for(var idx in chart.fields) {
      if(chart.fields[idx].match(/\[\]/)) {
        var $th = $("<th/>").html("<br/><span class='field'>" + chart.fields[idx].replace(/\[\]/, '1') + "</span>").prepend("<input class='span1'/>").data('idx', chart.variableColumns).addClass('variable');
        $th.append($("<img/>", {'class': 'delete', src: '/delete.png'}))
        $("#data thead tr").append($th);
        var $th = $("<th/>", {'class': 'button', 'style': 'vertical-align: top;'}).append("<button class='btn add'>Add Col</button>");
        $("#data thead tr").append($th);
      } else {
        var $th = $("<th/>").html("<br/>&nbsp;&nbsp;" + chart.fields[idx]).prepend("<input class='span1'/>");
        $("#data thead tr").append($th);
      }
    }
    $("#data tfoot tr").show();
    $("#data input.option").each(function() {
      $(this).val("");
      var name = $(this).attr('data-name');
      if(chart.example.options[name] === undefined) {
        $(this).closest("tr").hide();
      }
    });
    $("#add_row").click();
  }).change();
  function countRowsAndColumns() {
    $("#data").toggleClass('multiple_variable_columns', $("#data thead th.variable").length > 1)
              .toggleClass('multiple_rows', $("#data tbody tr").length > 1);
  }
  $("#example").click(function() {
    $("#clear").click();
    if(chart.example.data[0].length > chart.fields.length) {
      for(var idx = chart.fields.length; idx < chart.example.data[0].length; idx++) {
        $("#data thead .add").click();
      }
    }
    $("#data thead tr input").each(function(idx) {
      $(this).val(chart.example.data[0][idx]);
    });
    for(var idx = 1; idx < chart.example.data.length; idx++) {
      var row = chart.example.data[idx];
      if(idx > 1) {
        $("#add_row").click();
      }
      var $row = $("#data tbody tr:last");
      $row.find("input").each(function(jdx) {
        $(this).val(row[jdx]);
      });
    }
    $("#data input.option").each(function() {
      var name = $(this).attr('data-name');
      if(chart.example.options[name] !== undefined) {
        if($(this).attr('data-type') == 'boolean') {
          $(this).attr('checked', chart.example.options[name]);
        } else {
          $(this).val(chart.example.options[name]);
        }
      }
    });
    preview();
  });
  $(document).on('change keyup', '#data input', function() {
    preview();
  });
  function preview(forceUpdate) {
    chartData.type = chart.typeClass;
    var data = [[]];
    $("#data thead tr th:not(.button)").each(function() {
      data[0].push($(this).find("input").val());
    });
    $("#data tbody tr").each(function() {
      var row = [];
      var bad = false;
      $(this).find("input").each(function(idx) {
        var val = $(this).val();
        if(chart.textualFields && chart.textualFields.indexOf(idx) == -1) {
          val = parseFloat(val);
        }
        if(!val && val !== 0) {
          if(!chart.emptyFields || chart.emptyFields.indexOf(idx) == -1) { 
            bad = true; 
          } else {
            val = null;
          }
        }
        row.push(val);
      });
      if(!bad) {
        data.push(row);
      }
    });
    var options = $.extend({}, chart.example.options);
    $("#data input.option:visible").each(function() {
      var val = $(this).val();
      if($(this).attr('data-type') == 'number') {
        val = parseFloat(val);
      } else if($(this).attr('data-type') == 'boolean') {
        val = $(this).attr('checked');
      }
      options[$(this).attr('data-name')] = val;
    });
    for(var idx in options) {
      if(idx.match(/\./)) {
        var keys = idx.split(/\./);
        options[keys[0]] = options[keys[0]] || {};
        options[keys[0]][keys[1]] = options[idx];
      }
    }
    var dataChanged = JSON.stringify(data) == JSON.stringify(chartData.data);
    var optionsChanged = JSON.stringify(options) == JSON.stringify(chartData.options)
    if(data.length < 2 || (!forceUpdate && dataChanged && optionsChanged)) { return; }
    chartData.data = data;
    chartData.options = options;
    $("#chart").attr('src', 'chart.html');
    $("#embedder").show();
  }
  $("#width,#height").bind('change', function() {
    var width = parseInt($("#width").val(), 10);
    var height = parseInt($("#height").val(), 10);
    $("#iframe_holder").width(width);
    $("#chart").width(width).height(height);
    preview(true);
  });
  $("#embed").click(function() {
    if(!lti.params.key) {
      alert("This chart wasn't launched from a valid source and can't be embedded");
      return;
    }
    $.ajax({
      url: "/google_chart",
      data: {
        'key': lti.params.key,
        'data': JSON.stringify(chartData)
      },
      type: 'POST',
      dataType: 'json',
      success: function(data) {
        if(!data) {
          alert("This chart failed to embed correctly.");
          return;
        }
        var url = location.protocol + "//" + location.host + "/tools/google_chart/chart.html?key=" + lti.params.key;
        lti.resourceSelected({
          embed_type: 'iframe',
          url: url,
          width: parseInt($("#width").val(), 10),
          height: parseInt($("#height").val(), 10),
          title: (chartData.options.title || "Google Chart")
        });
      }      
    });
  });
});