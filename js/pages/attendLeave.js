$(document).ready(function () {

    function update() {
      $('#clock').html(moment().format('HH:mm:ss'));
    }

    setInterval(update, 1000);
    
    var chart = c3.generate({
        bindto: '#gauge',
        data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 100, 140, 200, 150, 50]
        ]
    }
});

setTimeout(function () {
    chart.transform('donut');
}, 1000);

setTimeout(function () {
    chart.transform('line');
}, 2000);

setTimeout(function () {
    chart.transform('pie');
}, 3000);

setTimeout(function () {
    chart.transform('donut');
}, 4000);


    $('#table').DataTable({
        pageLength: 5,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {
                extend: 'copy',
                text: 'نسخ',
            },
            {
                extend: 'csv'
            },
            {
                extend: 'excel',
                title: 'وثيقة'
            },
//            {
//                extend: 'pdf',
//                title: 'وثيقة'
//            },
            {
                extend: 'print',
                text: 'طباعة',
                title: 'وثيقة',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ],
        "language": {
            "decimal": "",
            "emptyTable": "لا يوجد بيانات..",
            "info": "إظهار _START_ من _END_ إجمالي _TOTAL_ بيانات",
            "infoEmpty": "إظهار 0 إلى 0 من 0 جملة البيانات",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "إظهار _MENU_ بيانات",
            "loadingRecords": "تحميل...",
            "processing": "Processing...",
            "search": "بحث:",
            "zeroRecords": "لا يوجد نتيجة مطابقة",
            "paginate": {
                "first": "أول",
                "last": "أخير",
                "next": "تالي",
                "previous": "سابق"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        }
        
    });
    
    
//    table.select();

    //    var today = new Date();
    //
    //
    //    var myVar = setInterval(function () {
    //        myTimer()
    //    }, 1000);
    //
    //    function myTimer() {
    //        var d = new Date();
    //        //document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    //        document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    //
    //        var date2 = new Date(2017, 2, 19, 13, 10); // 5:00 PM
    //
    //
    //        if (date2 < d) {
    //            date2.setDate(date2.getDate() + 1);
    //        }
    //
    //        var diff = date2 - d;
    //
    //        diff = millisToMinutesAndSeconds(diff);
    //
    //        diff = diff / 28800 * 100;
    //
    //        diff = diff.toFixed(2);
    //
    //        document.getElementById("demonew").innerHTML = diff;
    //
    //        console.log(diff);
    //
    //    }
    //
    //    function millisToMinutesAndSeconds(millis) {
    //        var minutes = Math.floor(millis / 60000);
    //        //            var seconds = ((millis % 60000) / 1000).toFixed(0);
    //        return minutes;
    //    }
    //
    //    Highcharts.chart('container', {
    //
    //            chart: {
    //                type: 'solidgauge',
    //                marginTop: 50
    //            },
    //
    //            title: {
    //                text: 'حضور',
    //                style: {
    //                    fontSize: '24px'
    //                }
    //            },
    //
    //            tooltip: {
    //                borderWidth: 0,
    //                backgroundColor: 'none',
    //                shadow: false,
    //                style: {
    //                    fontSize: '16px'
    //                },
    //                pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
    //                positioner: function (labelWidth) {
    //                    return {
    //                        x: 200 - labelWidth / 2,
    //                        y: 180
    //                    };
    //                }
    //            },
    //
    //            pane: {
    //                startAngle: 0,
    //                endAngle: 360,
    //                background: [{ // Track for Move
    //                    outerRadius: '112%',
    //                    innerRadius: '88%',
    //                    backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
    //                    borderWidth: 0
    //                }, { // Track for Exercise
    //                    outerRadius: '87%',
    //                    innerRadius: '63%',
    //                    backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
    //                    borderWidth: 0
    //                }, { // Track for Stand
    //                    outerRadius: '62%',
    //                    innerRadius: '38%',
    //                    backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
    //                    borderWidth: 0
    //                }]
    //            },
    //
    //            yAxis: {
    //                min: 0,
    //                max: 100,
    //                lineWidth: 0,
    //                tickPositions: []
    //            },
    //
    //            plotOptions: {
    //                solidgauge: {
    //                    dataLabels: {
    //                        enabled: false
    //                    },
    //                    linecap: 'round',
    //                    stickyTracking: false,
    //                    rounded: true
    //                }
    //            },
    //
    //            series: [{
    //                name: 'Move',
    //                borderColor: Highcharts.getOptions().colors[0],
    //                data: [{
    //                    color: Highcharts.getOptions().colors[0],
    //                    radius: '112%',
    //                    innerRadius: '88%',
    //                    y: 10
    ////                    y: function() {
    ////                        var d = new Date();
    ////                        document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    ////
    ////                        var date2 = new Date(2017, 2, 19, 13, 10); // 5:00 PM
    ////
    ////
    ////                        if (date2 < d) {
    ////                            date2.setDate(date2.getDate() + 1);
    ////                        }
    ////
    ////                        var diff = date2 - d;
    ////
    ////                        function millisToMinutesAndSeconds(millis) {
    ////                            var minutes = Math.floor(millis / 60000);
    ////                            //            var seconds = ((millis % 60000) / 1000).toFixed(0);
    ////                            return minutes;
    ////                        }
    ////
    ////                        diff = millisToMinutesAndSeconds(diff);
    ////
    ////                        diff = diff / 28800 * 100;
    ////
    ////                        diff = diff.toFixed(2);
    //
    ////                        return diff + 10;
    ////                        return 10;
    //
    ////                    }
    //                }]
    //            }, {
    //                name: 'Exercise',
    //                borderColor: Highcharts.getOptions().colors[1],
    //                data: [{
    //                    color: Highcharts.getOptions().colors[1],
    //                    radius: '87%',
    //                    innerRadius: '63%',
    //                    y: 65
    //                }]
    //            }, {
    //                name: 'Stand',
    //                borderColor: Highcharts.getOptions().colors[2],
    //                data: [{
    //                    color: Highcharts.getOptions().colors[2],
    //                    radius: '62%',
    //                    innerRadius: '38%',
    //                    y: 12
    //                }]
    //            }]
    //        },
    //
    //        /**
    //         ** In the chart load callback, add icons on top of the circular shapes
    //         **/
    //        function callback() {
    //
    //            // Move icon
    //            this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
    //                .attr({
    //                    'stroke': '#303030',
    //                    'stroke-linecap': 'round',
    //                    'stroke-linejoin': 'round',
    //                    'stroke-width': 2,
    //                    'zIndex': 10
    //                })
    //                .translate(190, 26)
    //                .add(this.series[2].group);
    //
    //            // Exercise icon
    //            this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
    //                .attr({
    //                    'stroke': '#303030',
    //                    'stroke-linecap': 'round',
    //                    'stroke-linejoin': 'round',
    //                    'stroke-width': 2,
    //                    'zIndex': 10
    //                })
    //                .translate(190, 61)
    //                .add(this.series[2].group);
    //
    //            // Stand icon
    //            this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
    //                .attr({
    //                    'stroke': '#303030',
    //                    'stroke-linecap': 'round',
    //                    'stroke-linejoin': 'round',
    //                    'stroke-width': 2,
    //                    'zIndex': 10
    //                })
    //                .translate(190, 96)
    //                .add(this.series[2].group);
    //        });


});