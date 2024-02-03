# Allow linking between pages. 

Currently can link to a project page inline easily using <a class = "inline-block" onclick="displayContent('./assets/talkmap/map.html')">example text</a>

Want to implement a way to do that for different main pages like CV, e.g CV

# Remove useless hrefs

Remove all istances of <a href="#">. clicking one of these is registered by the browser as clicking on a link and so breaks the history tree. Ideal behaviour is that we can fully click through my website without it being registered as more than one page so you can navigate forward and back as though you never left the one page