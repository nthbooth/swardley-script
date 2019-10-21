[![codebeat badge](https://codebeat.co/badges/b3d8cd3b-5f1d-4d19-a16a-61da4a745dc8)](https://codebeat.co/projects/github-com-nthbooth-swardley-script-master)
# swardley-script
A fork of a prototype of a way to script wardley maps as code. 

Converts a simple map recorded as a JSON object into a conventional visual form as and SVG in a simple html file

This fork adds in arrows and coloured circles and a few other bits and bobs.. 

Mapping subfolder contains a small app that pulls the json from another location using the ?url= this allows you to pull the json from a google sheet or other location..  

[Example html map](https://nthbooth.github.io/) using the index.html and map.js in this project (23/4/2019)

TODO: 
* align to: https://medium.com/wardleymaps/getting-started-yourself-e1a359b785a2 / https://cdn-images-1.medium.com/max/2400/1*4exsrh6Ju8wFr6DEHkUTQw.jpeg from a map point of view.
* Example Google sheet that can be used to generate the map.js


Wardley Mapping courtesy of Simon Wardley, CC BY-SA 4.0. To learn more about mapping, see [Simon's book](https://medium.com/wardleymaps/on-being-lost-2ef5f05eb1ec).

Wardley Map as a Google sheet.

Google sheet that extracts as a json wardley map can be found at the following location: https://docs.google.com/spreadsheets/d/1CgF4vzR58GG8WJJpAXHzuGeePW53qyNfApvGJ72n_QA/edit?usp=sharing

To publish make a copy of the sheet and then go to Tools -> Script Editor 
When in the script editor go: 
Publish -> Deploy as a webapp 
Copy the URL from the current webapp URL. (example: https://script.google.com/macros/s/AKfycbz42KAy6M65nvRitvK1HbOG0Z77PnHCgC0JiUsM/exec)

![publish](images/deployaswebapp.JPG)

Use the mapping.js or edit the index.html file to point to the JSON above. An example of this can be found in: index_googlesheet.html

Edit the Map in the google sheet: 
![config](images/config.JPG)
![elements](images/elements.JPG)
![links](images/Links_edit_this.JPG)
