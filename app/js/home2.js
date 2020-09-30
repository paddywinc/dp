var rawBytes =[];
        var iolines = [];
        var myfilesize;

        // Set the dimensions of the canvas / graph
        var margin = {top: 20, right: 0, bottom: 0, left: 0},
            width =  $('.graph').width() - margin.left - margin.right,
            height = 126 - margin.top - margin.bottom;

        
        var charts = {};
        
        function init() {
            getData(displayGraph);
        }
        init();

        /*
            This can be changed to a setInterval for the 10 minute update 
         */
        setTimeout(function() {
            getData(updateGraph);
        }, 1000);


        function getData(callback) {
            var oReq = new XMLHttpRequest();
            //oReq.open('GET', 'http://127.0.0.1:8000/Log1.bin', true);
            oReq.open('GET', 'app/bin/Log1.bin');
            oReq.responseType = "arraybuffer";

            oReq.onload = function (oEvent) {
              var arrayBuffer = oReq.response; // Note: not oReq.responseText
              if (arrayBuffer) {
                rawBytes = new Uint8Array(arrayBuffer);
                myfilesize = arrayBuffer.byteLength;
              }

              handleGraphs(callback);
            };
          
            oReq.send(null);
        }

        function handleGraphs(callback) {
            /*
                The if below demonstrates the chart updating by using a different
                selection of data for combustor

                To update with actual data, remove the if here and it will pull data
                from bin file and update properly
             */
            if (callback.name === 'updateGraph') {
                var combustorData = getChartData(26);
                combustorData = combustorData.slice(combustorData.length - 1440, combustorData.length - 720);
                callback('combustor-graph', combustorData);
                return;
            }

            var combustorData = getChartData(26);
            combustorData = combustorData.slice(combustorData.length - 720);
            callback('combustor-graph', combustorData);

            var plenumData = getChartData(24);
            plenumData = plenumData.slice(plenumData.length - 720);
            callback('plenum-graph', plenumData);

            var quenchData = getChartData(28);
            quenchData = quenchData.slice(quenchData.length - 720);
            callback('quench-graph', quenchData);
        }

        function displayGraph(element, data) {
            var chartVars = {};

            // Set the ranges
            chartVars.x = d3.scaleTime().range([0, width]);
            chartVars.y = d3.scaleLinear().range([height, 0]);


            containerWidth = +d3.select('#graph').style('width').slice(0, -2)
            // Adds the svg canvas
            chartVars.svg = d3.select('#' + element)
                .append("svg")
                    .attr('class', 'chart')
                    //.attr('width', containerWidth)
                    .attr("width", width)
                    .attr("height", height)
                .append("g")
                    .attr("transform", 
                          "translate(" + margin.left + "," + margin.top + ")");

            // Scale the range of the data
            chartVars.x.domain(d3.extent(data, function(d) { return d.date; }));
            chartVars.y.domain([0, d3.max(data, function(d) { return d.temperature; })]);

            // Add the line
            chartVars.svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("fill", "none")
              .attr("stroke", "white")
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
                .x(function(d) { return chartVars.x(d.date) })
                .y(function(d) { return chartVars.y(d.temperature) })
                )

            charts[element] = chartVars;
        }

        function updateGraph(element, data) {
            var chartVars = charts[element];

            // Scale the range of the data again 
            chartVars.x.domain(d3.extent(data, function(d) { return d.date; }));
            chartVars.y.domain([0, d3.max(data, function(d) { return d.temperature; })]);

            // Select the section we want to apply our changes to
            var svg = d3.select("#" + element).transition();

            chartVars.svg.select('path')
                .datum(data);

            // Make the changes
            svg.select(".line")   // change the line
                .duration(750)
                .attr("d", d3.line()
                .x(function(d) { return chartVars.x(d.date) })
                .y(function(d) { return chartVars.y(d.temperature) })
                )
        }

        function getChartData(parm){
          var chartData = [];
          var tcvalue; 
          var firstDate = new Date();
          var plcdate="";
          firstDate.setDate(firstDate.getDate() - 5);
          var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
          //var dateString = "2010-08-09 01:02:03";
          //var dateArray = reggie.exec(dateString);
          var start_location = myfilesize - (280 * 1441);
          var x = 0;
          for (var i = start_location; i < myfilesize; i+=280){
            x = x + 1000;
            tcvalue = ((rawBytes[ i + parm] * 256) + rawBytes[i+parm+1]) /1 ;
            var newDate = new Date(firstDate);
            newDate.setTime(newDate.getTime() + x);

            plcdate="20";
            plcdate += (String.fromCharCode(rawBytes[i+266]));
            plcdate += (String.fromCharCode(rawBytes[i+267]));
            plcdate += "-";
            plcdate += (String.fromCharCode(rawBytes[i+263]));
            plcdate += (String.fromCharCode(rawBytes[i+264]));
            plcdate += "-";
            plcdate += (String.fromCharCode(rawBytes[i+260]));
            plcdate += (String.fromCharCode(rawBytes[i+261]));
            plcdate += ", ";
            plcdate += (String.fromCharCode(rawBytes[i+269]));
            plcdate += (String.fromCharCode(rawBytes[i+270]));
            plcdate += ":";
            plcdate += (String.fromCharCode(rawBytes[i+272]));
            plcdate += (String.fromCharCode(rawBytes[i+273]));
            plcdate += ":";
            plcdate += (String.fromCharCode(rawBytes[i+275]));
            plcdate += (String.fromCharCode(rawBytes[i+276]));


            //for (var d = 260; d < 274; d++){
              //plcdate += (String.fromCharCode(rawBytes[i+d]));
            //}
            timestamp = Date.parse(plcdate.replace(', ', 'T'));
            finalDate = new Date();
            finalDate.setTime(timestamp);
            chartData.push({
              date: finalDate,
              temperature: tcvalue
            });
            if (chartData.length > 2881) {
            //if (chartData.length > 2880) {
              break;
            }
          }
          return chartData;
        }