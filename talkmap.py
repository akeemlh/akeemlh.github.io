

# # Leaflet cluster map of talk locations
#
# (c) 2016-2017 R. Stuart Geiger, released under the MIT license
#
# Run this from the _talks/ directory, which contains .md files of all your talks. 
# This scrapes the location YAML field from each .md file, geolocates it with
# geopy/Nominatim, and uses the getorg library to output data, HTML,
# and Javascript for a standalone cluster map.
#
# Requires: glob, getorg, geopy

import glob
import getorg
from geopy import Nominatim

g = glob.glob("assets/talks/*.html")


geocoder = Nominatim(user_agent="6pw6K0DALY")
location_dict = {}
location = ""
permalink = ""
title = ""


for file in g:
    with open(file, 'r') as f:
        lines = f.read()
        if lines.find('talk-location">') > 1:
            loc_start = lines.find('talk-location">') + 15
            lines_trim = lines[loc_start:]
            loc_end = lines_trim.find('</h5>')
            location = lines_trim[:loc_end]
                            
           
        location_dict[location] = geocoder.geocode(location)
        print(location, "\n", location_dict[location])


m = getorg.orgmap.create_map_obj()

#Running this line regenerated everything relating to the map, style sheets, html etc. I have made changes to the stylesheets to make it fit better on the sit so running this will overwrite that. Only run if for whatever reason you actually want to regenerate all of this from the ground up. If you just want to update the locations/pins on the map run the line below and leave this commented out
#getorg.orgmap.output_html_cluster_map(location_dict, folder_name="assets/talkmap", hashed_usernames=False)

getorg.orgmap.location_dict_to_jsvar(location_dict, folder_name="assets/talkmap/org-locations.js", hashed_usernames=False)




