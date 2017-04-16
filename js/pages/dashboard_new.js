$(document).ready(function () {
    var chart, nineBtn, sixBtn, nineData, sixData;

    chart = $('#chart');

    nineBtn = $('#nine-btn');
    sixBtn = $('#six-btn');

    sixData = [
        {
            month: '1438/07',
            geekbench: 136
        },
        {
            month: '1438/06',
            geekbench: 137
        },
        {
            month: '1438/05',
            geekbench: 275
        },
        {
            month: '1438/04',
            geekbench: 380
        },
        {
            month: '1438/03',
            geekbench: 655
        },
        {
            month: '1438/02',
            geekbench: 52
        }
    ];

    nineData = [
        {
            month: '1438/07',
            geekbench: 136
            },
        {
            month: '1438/06',
            geekbench: 137
            },
        {
            month: '1438/05',
            geekbench: 275
            },
        {
            month: '1438/04',
            geekbench: 136
            },
        {
            month: '1438/03',
            geekbench: 655
            },
        {
            month: '1438/02',
            geekbench: 275
            },
        {
            month: '1438/01',
            geekbench: 136
            },
        {
            month: '1437/12',
            geekbench: 137
            },
        {
            month: '1437/11',
            geekbench: 275
            }
    ];

    sixBtn.click(function (e) {
        e.preventDefault();
        nineBtn.toggleClass('btn-success');
        sixBtn.toggleClass('btn-success');
        bar.setData(sixData);
    });

    nineBtn.click(function (e) {
        e.preventDefault();
        nineBtn.toggleClass('btn-success');
        sixBtn.toggleClass('btn-success');
        bar.setData(nineData);
    });

    bar = Morris.Bar({
        element: 'chart',
        data: nineData,
        xkey: 'month',
        ykeys: ['geekbench'],
        labels: ['دقائق التأخير'],
        barColors: ['#1ab394'],
        barRatio: 1,
        xLabelAngle: 35,
        hideHover: 'auto'
    });
    
    var configProfile = {
      "profile": {"screenName": 'jazangov'},
      "domId": 'lastTweet',
      "maxTweets": 1,
      "enableLinks": true, 
      "showUser": true,
      "showTime": true,
      "showImages": false,
      "lang": 'ar'
    };
    twitterFetcher.fetch(configProfile);


});