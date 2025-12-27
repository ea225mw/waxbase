import './wb-artist-suggestions.js'

const wbArtistSugg = document.createElement('wb-artist-suggestions')
document.body.append(wbArtistSugg)

const clone = wbArtistSugg.artistInput.cloneNode(true)

const div = document.querySelector('div')
div.append(clone)
