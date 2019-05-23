# swardley-script
Prototype of a way to script wardley maps as code

Converts a simple map recorded as a JSON object into a conventional visual form as and SVG in a simple html file

[Example html map](https://cioportfolio.github.io/swardley-script/map.html) generated from the included map.js

[jsfiddle version](https://jsfiddle.net/74jx2zog/) allows you to modify the example map online

Added in climate arrows 

elements: [
                {
                        id: "1",
                        name: "Element 1",
                        visibility: 0.25,
                        maturity: 0.75
                }
        ],
        links: [
                {
                        start: "1",
                        end: "2"
                }
        ],
        climate: [
        {start: "1", maturity: "0.8" }
        ]


Wardley Mapping courtesy of Simon Wardley, CC BY-SA 4.0. To learn more about mapping, see [Simon's book](https://medium.com/wardleymaps/on-being-lost-2ef5f05eb1ec).
