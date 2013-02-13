test( "expand", function() {

  var custom = 42;
  var major = -1;
  var minor = -2;
  var patch = -3;
  var container = "#container";
  var path = "p[3]/ul/li[2]";
  var activity = -9;
  var left = 1234;
  var top = 5678;
  var time1 = 1000;
  var time2 = 10000;
  var details = "#any";
  var specifics = 34;

  var ghost0 = [custom,major,minor,patch];
  var json0 = JSON.stringify( ghost0 );
  var result0 = expand( ghost0 );
  strictEqual( JSON.stringify( ghost0 ), json0,
                                        "no change expected in input ghost 0");
  strictEqual( JSON.stringify( result0 ), json0,
                                         "no change expected without records");

  var ghost1 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      time1
    ]
  ];
  var json1 = JSON.stringify( ghost1 );
  var result1 = expand( ghost1 );
  strictEqual( JSON.stringify( ghost1 ), json1,
                                        "no change expected in input ghost 1");
  strictEqual( JSON.stringify( result1 ), json1,
                                     "no change expected for a single record");

  var ghost2 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      [
        time1
      ],
      [
        time2
      ]
    ]
  ];
  var expected2 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      time1
    ],
    [
      container,
      path,
      activity,
      left,
      top,
      time2
    ]
  ];
  var json2 = JSON.stringify( ghost2 );
  var result2 = expand( ghost2 );
  strictEqual( JSON.stringify( ghost2 ), json2,
                                        "no change expected in input ghost 2");
  deepEqual( result2, expected2, "expanded records expected for nested times");

  var ghost3 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      [
        2000,
        time1
      ],
      [
        4000,
        time2
      ]
    ]
  ];
  var expected3 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      2000,
      time1
    ],
    [
      container,
      path,
      activity,
      left,
      4000,
      time2
    ]
  ];
  var json3 = JSON.stringify( ghost3 );
  var result3 = expand( ghost3 );
  strictEqual( JSON.stringify( ghost3 ), json3,
                                        "no change expected in input ghost 3");
  deepEqual( result3, expected3,
                "expanded records expected for nested values starting at top");

  var ghost4 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      [
        3000,
        top,
        time1
      ],
      [
        4000,
        top,
        time2
      ]
    ]
  ];
  var expected4 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      3000,
      top,
      time1
    ],
    [
      container,
      path,
      activity,
      4000,
      top,
      time2
    ]
  ];
  var json4 = JSON.stringify( ghost4 );
  var result4 = expand( ghost4 );
  strictEqual( JSON.stringify( ghost4 ), json4,
                                        "no change expected in input ghost 4");
  deepEqual( result4, expected4,
               "expanded records expected for nested values starting at left");

  var ghost5 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      [
        -1,
        left,
        top,
        time1
      ],
      [
        -2,
        left,
        top,
        time2
      ]
    ]
  ];
  var expected5 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      -1,
      left,
      top,
      time1
    ],
    [
      container,
      path,
      -2,
      left,
      top,
      time2
    ]
  ];
  var json5 = JSON.stringify( ghost5 );
  var result5 = expand( ghost5 );
  strictEqual( JSON.stringify( ghost5 ), json5,
                                        "no change expected in input ghost 5");
  deepEqual( result5, expected5,
      "expanded records expected for nested values starting at activity type");

  var ghost6 = [
    custom,
    major,minor,patch,
    [
      container,
      [
        "p[1]",
        activity,
        left,
        top,
        time1
      ],
      [
        "p[2]",
        activity,
        left,
        top,
        time2
      ]
    ]
  ];
  var expected6 = [
    custom,
    major,minor,patch,
    [
      container,
      "p[1]",
      activity,
      left,
      top,
      time1
    ],
    [
      container,
      "p[2]",
      activity,
      left,
      top,
      time2
    ]
  ];
  var json6 = JSON.stringify( ghost6 );
  var result6 = expand( ghost6 );
  strictEqual( JSON.stringify( ghost6 ), json6,
                                        "no change expected in input ghost 6");
  deepEqual( result6, expected6,
               "expanded records expected for nested values starting at path");

  var ghost7 = [
    custom,
    major,minor,patch,
    [
      "#container1",
      path,
      activity,
      left,
      top,
      time1
    ],
    [
      "#container2",
      path,
      activity,
      left,
      top,
      time2
    ]
  ];
  var json7 = JSON.stringify( ghost7 );
  var result7 = expand( ghost7 );
  strictEqual( JSON.stringify( ghost7 ), json7,
                                        "no change expected in input ghost 7");
  strictEqual( JSON.stringify( result7 ), json7,
                             "no change expected for records without nesting");

  var ghost8 = [
    custom,
    major,minor,patch,
    [
      "#container1",
      [
        "p[1]",
        activity,
        left,
        top,
        0
      ],
      [
        "p[2]",
        [
          -1,
          [
            6000,
            top,
            [
              1000
            ],
            [
              2000
            ]
          ],
          [
            7000,
            [
              4000,
              3000
            ],
            [
              3000,
              4000
            ]
          ]
        ],
        [
          -2,
          left,
          top,
          5000
        ]
      ]
    ],
    [
      "#container2",
      path,
      activity,
      left,
      top,
      6000
    ]
  ];
  var expected8 = [
    custom,
    major,minor,patch,
    [
      "#container1",
      "p[1]",
      activity,
      left,
      top,
      0
    ],
    [
      "#container1",
      "p[2]",
      -1,
      6000,
      top,
      1000
    ],
    [
      "#container1",
      "p[2]",
      -1,
      6000,
      top,
      2000
    ],
    [
      "#container1",
      "p[2]",
      -1,
      7000,
      4000,
      3000
    ],
    [
      "#container1",
      "p[2]",
      -1,
      7000,
      3000,
      4000
    ],
    [
      "#container1",
      "p[2]",
      -2,
      left,
      top,
      5000
    ],
    [
      "#container2",
      path,
      activity,
      left,
      top,
      6000
    ]
  ];
  var json8 = JSON.stringify( ghost8 );
  var result8 = expand( ghost8 );
  strictEqual( JSON.stringify( ghost8 ), json8,
                                        "no change expected in input ghost 8");
  deepEqual( result8, expected8,
        "expanded records expected with one level of nesting instead of five");

  var ghost9 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      [
        1000
      ],
      [
        2000
      ],
      [
        3000
      ],
      [
        4000
      ],
      [
        5000
      ]
    ]
  ];
  var expected9 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      1000
    ],
    [
      container,
      path,
      activity,
      left,
      top,
      2000
    ],
    [
      container,
      path,
      activity,
      left,
      top,
      3000
    ],
    [
      container,
      path,
      activity,
      left,
      top,
      4000
    ],
    [
      container,
      path,
      activity,
      left,
      top,
      5000
    ]
  ];
  var json9 = JSON.stringify( ghost9 );
  var result9 = expand( ghost9 );
  strictEqual( JSON.stringify( ghost9 ), json9,
                                        "no change expected in input ghost 9");
  deepEqual( result9, expected9,
                      "expanded records expected for five nested time values");

  var ghost10 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      [
        -5,
        left,
        top,
        time1
      ],
      [
        -4,
        left,
        top,
        time1
      ],
      [
        -3,
        left,
        top,
        time1
      ],
      [
        -2,
        left,
        top,
        time1
      ],
      [
        -1,
        left,
        top,
        time2
      ]
    ]
  ];
  var expected10 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      -5,
      left,
      top,
      time1
    ],
    [
      container,
      path,
      -4,
      left,
      top,
      time1
    ],
    [
      container,
      path,
      -3,
      left,
      top,
      time1
    ],
    [
      container,
      path,
      -2,
      left,
      top,
      time1
    ],
    [
      container,
      path,
      -1,
      left,
      top,
      time2
    ]
  ];
  var json10 = JSON.stringify( ghost10 );
  var result10 = expand( ghost10 );
  strictEqual( JSON.stringify( ghost10 ), json10,
                                       "no change expected in input ghost 10");
  deepEqual( result10, expected10,
                                             "expanded records expected for " +
                              "five nested records starting at activity type");

  var ghost11 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      time1,
      [],
      []
    ]
  ];
  var expected11 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      time1
    ],
    [
      container,
      path,
      activity,
      left,
      top,
      time1
    ]
  ];
  var json11 = JSON.stringify( ghost11 );
  var result11 = expand( ghost11 );
  strictEqual( JSON.stringify( ghost11 ), json11,
                                       "no change expected in input ghost 11");
  deepEqual( result11, expected11,
        "expanded records expected for nested arrays at position for details");

  var ghost12 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      time1,
      [
        details,
        specifics
      ],
      [
        details,
        specifics
      ]
    ]
  ];
  var expected12 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      time1,
      details,
      specifics
    ],
    [
      container,
      path,
      activity,
      left,
      top,
      time1,
      details,
      specifics
    ],
  ];
  var json12 = JSON.stringify( ghost12 );
  var result12 = expand( ghost12 );
  strictEqual( JSON.stringify( ghost12 ), json12,
                                       "no change expected in input ghost 12");
  deepEqual( result12, expected12,
           "expanded records expected for nested records starting at details");

  var ghost13 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      time1,
      [
        [1,2,3],
        specifics
      ],
      [
        [1,5,9]
      ]
    ]
  ];
  var expected13 = [
    custom,
    major,minor,patch,
    [
      container,
      path,
      activity,
      left,
      top,
      time1,
      [1,2,3],
      specifics
    ],
    [
      container,
      path,
      activity,
      left,
      top,
      time1,
      [1,5,9]
    ],
  ];
  var json13 = JSON.stringify( ghost13 );
  var result13 = expand( ghost13 );
  strictEqual( JSON.stringify( ghost13 ), json13,
                                       "no change expected in input ghost 13");
  deepEqual( result13, expected13,
                               "expanded records expected for nested records "+
                              "starting at details with or without specifics");
});
