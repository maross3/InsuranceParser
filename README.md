# InsuranceParser

checkout the parsed material in PARSED_SITE.md

![image](https://user-images.githubusercontent.com/20687907/170400479-3d855384-e40c-4887-8c70-b44a2a577f69.png)

To make this, I parsed a 60k+ directory, processed it, and made google api requests to search each location. Then I created a GeoJSON of all the results. The GeoJson is a javascript object in GeoJSON format because the way Places API communicates with the map. The map draws a marker on each location, and has all relevant data I could reliably parse. 

It's really hard to find mental health help while on Medicaid. I decided to make it easier to find a good health care provider by parsing the insurance company's directory and serving it via google maps. Happy mental health awareness month. I will be continuing development.

Under very early development. Rough future plans:
* autocomplete
* zoom to input area code
* descriptive popups that provide ratings, speacialty, phone number, website, address, ect.
* convert to RoR application (?)
