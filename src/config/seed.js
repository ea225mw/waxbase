import { sequelize } from './sequelize.js'
const { models } = sequelize

/**
 * Test file for filling the database with test data.
 */

/**
 * Fills the database with test data.
 */
async function seed () {
  try {
    await sequelize.sync({ force: true }) // Se till att tabeller finns

    // STORES
    const store1 = await models.store.create({
      storeName: 'Ginza Musik'
    })
    const store2 = await models.store.create({
      storeName: 'Myrorna Hornsgatan'
    })
    const store3 = await models.store.create({
      storeName: 'Bananamoon Mariestad'
    })
    const store4 = await models.store.create({
      storeName: 'Mickes Skivor Hornstull'
    })
    const store5 = await models.store.create({
      storeName: 'Stockholms Stadsmission Hornsgatan'
    })
    const store6 = await models.store.create({
      storeName: '2:a Långgatans Skivhandel'
    })
    const store7 = await models.store.create({
      storeName: 'Bengans, Göteborg'
    })
    const store8 = await models.store.create({
      storeName: 'Skivstället'
    })

    // FORMATS
    const format1 = await models.format.create({
      format: 'CD'
    })
    const format2 = await models.format.create({
      format: 'LP'
    })
    const format3 = await models.format.create({
      format: '12" Maxi'
    })
    const format4 = await models.format.create({
      format: 'EP'
    })

    const artist1 = await models.artist.create({
      firstName: 'David',
      lastName: 'Bowie',
      displayName: 'David Bowie',
      sortName: 'Bowie, David',
      the: null
    })
    const artist2 = await models.artist.create({
      firstName: null,
      lastName: null,
      displayName: 'The Eagles',
      sortName: 'Eagles, The',
      the: 'The'
    })
    const artist3 = await models.artist.create({
      firstName: 'Billy',
      lastName: 'Joel',
      displayName: 'Billy Joel',
      sortName: 'Joel, Billy',
      the: null
    })
    const artist4 = await models.artist.create({
      firstName: 'Michael',
      lastName: 'Jackson',
      displayName: 'Michael Jackson',
      sortName: 'Jackson, Michael',
      the: null
    })
    const artist5 = await models.artist.create({
      firstName: 'Emmylou',
      lastName: 'Harris',
      displayName: 'Emmylou Harris',
      sortName: 'Harris, Emmylou',
      the: null
    })
    const artist6 = await models.artist.create({
      firstName: null,
      lastName: null,
      displayName: 'Sha-Boom',
      sortName: 'Sha-Boom',
      the: null
    })

    const artist7 = await models.artist.create({
      firstName: 'Bob',
      lastName: 'Marley',
      displayName: 'Bob Marley',
      sortName: 'Marley, Bob',
      the: null
    })

    const artist8 = await models.artist.create({
      firstName: 'Mark',
      lastName: 'Knopfler',
      displayName: 'Mark Knopfler',
      sortName: 'Knopfler, Mark',
      the: null
    })

    const artist9 = await models.artist.create({
      firstName: null,
      lastName: null,
      displayName: 'The Manhattan Transfer',
      sortName: 'Manhattan Transfer, The',
      the: 'The'
    })

    const artist10 = await models.artist.create({
      firstName: 'Al',
      lastName: 'Jarreau',
      displayName: 'Al Jarreau',
      sortName: 'Jarreau, Al',
      the: null
    })

    const artist11 = await models.artist.create({
      firstName: null,
      lastName: null,
      displayName: 'Aerosmith',
      sortName: 'Aerosmith',
      the: null
    })
    const artist12 = await models.artist.create({
      firstName: 'Tomas',
      lastName: 'Andersson Wij',
      displayName: 'Tomas Andersson Wij',
      sortName: 'Andersson Wij, Tomas',
      the: null
    })
    const artist13 = await models.artist.create({
      firstName: 'Donald',
      lastName: 'Fagen',
      displayName: 'Donald Fagen',
      sortName: 'Fagen, Donald',
      the: null
    })
    const artist14 = await models.artist.create({
      firstName: 'Marc',
      lastName: 'Cohn',
      displayName: 'Marc Cohn',
      sortName: 'Cohn, Marc',
      the: null
    })
    const artist15 = await models.artist.create({
      firstName: null,
      lastName: null,
      displayName: 'Clawfinger',
      sortName: 'Clawfinger',
      the: null
    })
    const artist16 = await models.artist.create({
      firstName: 'Miles',
      lastName: 'Davis',
      displayName: 'Miles Davis',
      sortName: 'Davis, Miles',
      the: null
    })
    const artist17 = await models.artist.create({
      firstName: null,
      lastName: null,
      displayName: 'Def Leppard',
      sortName: 'Def Leppard',
      the: null
    })
    const artist18 = await models.artist.create({
      firstName: null,
      lastName: null,
      displayName: 'Dream Theater',
      sortName: 'Dream Theater',
      the: null
    })
    const artist19 = await models.artist.create({
      firstName: null,
      lastName: null,
      displayName: 'Earth Wind & Fire',
      sortName: 'Earth Wind & Fire',
      the: null
    })
    const artist20 = await models.artist.create({
      firstName: 'John',
      lastName: 'Fogerty',
      displayName: 'John Fogerty',
      sortName: 'Fogerty, John',
      the: null
    })
    const artist21 = await models.artist.create({
      firstName: 'Kirk',
      lastName: 'Franklin',
      displayName: 'Kirk Franklin',
      sortName: 'Franklin, Kirk',
      the: null
    })
    const artist22 = await models.artist.create({
      firstName: 'Jim',
      lastName: 'Lauderdale',
      displayName: 'Jim Lauderdale',
      sortName: 'Lauderdale, Jim',
      the: null
    })

    // CONDITIONS
    const conditionNA = await models.condition.create({
      conditionName: '-'
    })
    const conditionM = await models.condition.create({
      conditionName: 'M'
    })

    const conditionNM = await models.condition.create({
      conditionName: 'NM'
    })
    const conditionEX = await models.condition.create({
      conditionName: 'EX'
    })

    const conditionVG = await models.condition.create({
      conditionName: 'VG'
    })
    const conditionG = await models.condition.create({
      conditionName: 'G'
    })
    const conditionPoor = await models.condition.create({
      conditionName: 'Poor'
    })

    // ALBUMS
    const album1 = await models.album.create({
      albumTitle: 'Heroes',
      releaseYear: 1977,
      origReleaseYear: 1977,
      artistId: artist1.id,
      price: 50,
      imgURL: './images/David_Bowie_-_Heroes.png',
      storeId: store1.id,
      formatId: format1.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: conditionNM.id,
      rpm: null
    })
    const album2 = await models.album.create({
      albumTitle: 'Desperado',
      releaseYear: 1973,
      origReleaseYear: 1973,
      artistId: artist2.id,
      price: 75,
      imgURL: './images/The_Eagles_-_Desperado.jpg',
      storeId: store2.id,
      formatId: format2.id,
      sleeveConditionId: conditionEX.id,
      mediaConditionId: conditionG.id,
      rpm: 33
    })
    const album3 = await models.album.create({
      albumTitle: 'The Stranger',
      releaseYear: 1998,
      origReleaseYear: 1977,
      artistId: artist3.id,
      price: 100,
      imgURL: './images/Thestranger1977.jpg',
      storeId: store3.id,
      formatId: format1.id,
      sleeveConditionId: conditionNM.id,
      mediaConditionId: conditionEX.id,
      rpm: null
    })
    const album4 = await models.album.create({
      albumTitle: 'Thriller',
      releaseYear: 1982,
      origReleaseYear: 1982,
      artistId: artist4.id,
      price: 45,
      imgURL: './images/Michael_Jackson_-_Thriller.png',
      storeId: store4.id,
      formatId: format3.id,
      sleeveConditionId: conditionG.id,
      mediaConditionId: conditionG.id,
      rpm: 45
    })
    const album5 = await models.album.create({
      albumTitle: 'Luxury Liner',
      releaseYear: 2004,
      origReleaseYear: 1976,
      artistId: artist5.id,
      price: 95,
      imgURL: './images/Emmylou_Harris_-_Luxury_Liner.png',
      storeId: store5.id,
      formatId: format1.id,
      sleeveConditionId: conditionNM.id,
      mediaConditionId: conditionNM.id,
      rpm: null
    })
    const album6 = await models.album.create({
      albumTitle: 'R.O.C.K.',
      releaseYear: 1988,
      origReleaseYear: null,
      artistId: artist6.id,
      price: 20,
      storeId: store5.id,
      formatId: format4.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: conditionM.id,
      rpm: 45
    })
    const album7 = await models.album.create({
      albumTitle: 'Exodus',
      releaseYear: null,
      origReleaseYear: 1997,
      artistId: artist7.id,
      price: 65,
      imgURL: './images/Bob_Marley_and_the_Wailers_-_Exodus.png',
      storeId: store1.id,
      formatId: format1.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: conditionNA.id,
      rpm: null
    })
    const album8 = await models.album.create({
      albumTitle: 'Sailing To Philadelfia',
      releaseYear: 2000,
      origReleaseYear: null,
      artistId: artist8.id,
      price: 65,
      imgURL: './images/MK_Sailing_to_Philadelphia.jpg',
      storeId: store1.id,
      formatId: format1.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: conditionPoor.id,
      rpm: null
    })
    const album9 = await models.album.create({
      albumTitle: 'Extensions',
      releaseYear: null,
      origReleaseYear: 1979,
      artistId: artist9.id,
      price: 100,
      imgURL: './images/Extensions_(Manhattan_Transfer_album).jpg',
      storeId: store4.id,
      formatId: format2.id,
      sleeveConditionId: conditionNM.id,
      mediaConditionId: conditionVG.id,
      rpm: 33
    })
    const album10 = await models.album.create({
      albumTitle: 'Jarreau',
      releaseYear: 1983,
      origReleaseYear: 1983,
      artistId: artist10.id,
      price: 75,
      imgURL: './images/Al_Jarreau_Jarreau_cover.jpg',
      storeId: store6.id,
      formatId: format1.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: null,
      rpm: null
    })
    const album11 = await models.album.create({
      albumTitle: 'Permanent Vacation',
      releaseYear: 1987,
      origReleaseYear: 1987,
      artistId: artist11.id,
      price: 40,
      imgURL: './images/Aerosmith_-_Permanent_Vacation.JPG',
      storeId: store3.id,
      formatId: format1.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: conditionM.id,
      rpm: null
    })
    const album12 = await models.album.create({
      albumTitle: 'Ett Slag För Dig',
      releaseYear: 2000,
      origReleaseYear: 2000,
      artistId: artist12.id,
      price: 40,
      imgURL: './images/ettslagfordig.png',
      storeId: store5.id,
      formatId: format1.id,
      sleeveConditionId: conditionM.id,
      mediaConditionId: conditionNM.id,
      rpm: null
    })
    const album13 = await models.album.create({
      albumTitle: 'The Nightfly',
      releaseYear: 1982,
      origReleaseYear: 1982,
      artistId: artist13.id,
      price: 60,
      imgURL: './images/the_nightfly.jpg',
      storeId: store7.id,
      formatId: format1.id,
      sleeveConditionId: conditionEX.id,
      mediaConditionId: conditionM.id,
      rpm: null
    })
    const album14 = await models.album.create({
      albumTitle: 's/t',
      releaseYear: 1991,
      origReleaseYear: 1991,
      artistId: artist14.id,
      price: 50,
      imgURL: './images/marc_cohn_s_t.jpg',
      storeId: store8.id,
      formatId: format1.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: conditionVG.id,
      rpm: null
    })
    const album15 = await models.album.create({
      albumTitle: 'Deaf Dumb Blind',
      releaseYear: 1993,
      origReleaseYear: 1993,
      artistId: artist15.id,
      price: 35,
      imgURL: null,
      storeId: store8.id,
      formatId: format1.id,
      sleeveConditionId: conditionG.id,
      mediaConditionId: conditionG.id,
      rpm: null
    })
    const album16 = await models.album.create({
      albumTitle: 'Kind Of Blue',
      releaseYear: 1997,
      origReleaseYear: 1959,
      artistId: artist16.id,
      price: 99,
      imgURL: null,
      storeId: store4.id,
      formatId: format1.id,
      sleeveConditionId: conditionM.id,
      mediaConditionId: conditionM.id,
      rpm: null
    })
    const album17 = await models.album.create({
      albumTitle: 'Adreanlize',
      releaseYear: 1992,
      origReleaseYear: 1992,
      artistId: artist17.id,
      price: 149,
      imgURL: null,
      storeId: store2.id,
      formatId: format1.id,
      sleeveConditionId: conditionNM.id,
      mediaConditionId: conditionVG.id,
      rpm: null
    })
    const album18 = await models.album.create({
      albumTitle: 'Images And Words',
      releaseYear: 1992,
      origReleaseYear: 1992,
      artistId: artist18.id,
      price: 79,
      imgURL: null,
      storeId: store5.id,
      formatId: format1.id,
      sleeveConditionId: conditionEX.id,
      mediaConditionId: conditionNM.id,
      rpm: null
    })
    const album19 = await models.album.create({
      albumTitle: 'Awake',
      releaseYear: 1994,
      origReleaseYear: 1994,
      artistId: artist18.id,
      price: 89,
      imgURL: null,
      storeId: store2.id,
      formatId: format1.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: conditionVG.id,
      rpm: null
    })
    const album20 = await models.album.create({
      albumTitle: 'Falling Into Infinity',
      releaseYear: 1997,
      origReleaseYear: 1997,
      artistId: artist18.id,
      price: 119,
      imgURL: './images/dream_theater_falling_into_infinity.jpg',
      storeId: store3.id,
      formatId: format1.id,
      sleeveConditionId: conditionM.id,
      mediaConditionId: conditionEX.id,
      rpm: null
    })
    const album21 = await models.album.create({
      albumTitle: 'All \'N All',
      releaseYear: 1977,
      origReleaseYear: 1977,
      artistId: artist19.id,
      price: 50,
      imgURL: './images/ewf_all_n_all.jpg',
      storeId: store6.id,
      formatId: format2.id,
      sleeveConditionId: conditionNM.id,
      mediaConditionId: conditionEX.id,
      rpm: null
    })
    const album22 = await models.album.create({
      albumTitle: 'Blue Moon Swamp',
      releaseYear: 2004,
      origReleaseYear: 1998,
      artistId: artist20.id,
      price: 99,
      imgURL: './images/blue_moon_swamp.jpg',
      storeId: store8.id,
      formatId: format1.id,
      sleeveConditionId: conditionEX.id,
      mediaConditionId: conditionG.id,
      rpm: null
    })
    const album23 = await models.album.create({
      albumTitle: 'Kirk Franklin And The Family',
      releaseYear: 1993,
      origReleaseYear: 1993,
      artistId: artist21.id,
      price: 20,
      imgURL: './images/414DWT801PL.jpg',
      storeId: store7.id,
      formatId: format1.id,
      sleeveConditionId: conditionNM.id,
      mediaConditionId: conditionM.id,
      rpm: null
    })
    const album24 = await models.album.create({
      albumTitle: 'The Rebirth Of Kirk Franklin',
      releaseYear: 2002,
      origReleaseYear: 2002,
      artistId: artist21.id,
      price: 40,
      imgURL: './images/71ougyp4CNL.jpg',
      storeId: store6.id,
      formatId: format1.id,
      sleeveConditionId: conditionG.id,
      mediaConditionId: conditionG.id,
      rpm: null
    })
    const album25 = await models.album.create({
      albumTitle: 'The Other Sessions',
      releaseYear: 2001,
      origReleaseYear: 2001,
      artistId: artist22.id,
      price: 10,
      imgURL: null,
      storeId: store3.id,
      formatId: format1.id,
      sleeveConditionId: conditionVG.id,
      mediaConditionId: conditionVG.id,
      rpm: null
    })

    await models.track.bulkCreate([
      { trackIndex: 1, trackTitle: 'Beauty and the Beast', minutes: 3, seconds: 36, albumId: album1.id },
      { trackIndex: 2, trackTitle: 'Joe The Lion', minutes: 3, seconds: 8, albumId: album1.id },
      { trackIndex: 3, trackTitle: 'Heroes', minutes: 6, seconds: 11, albumId: album1.id },
      { trackIndex: 4, trackTitle: 'Sons Of The Silent Age', minutes: 3, seconds: 20, albumId: album1.id },
      { trackIndex: 5, trackTitle: 'Blackout', minutes: 3, seconds: 49, albumId: album1.id },
      { trackIndex: 6, trackTitle: 'V-2 Schneider', minutes: 3, seconds: 11, albumId: album1.id },
      { trackIndex: 7, trackTitle: 'Sense Of Doubt', minutes: 3, seconds: 59, albumId: album1.id },
      { trackIndex: 8, trackTitle: 'Moss Garden', minutes: 5, seconds: 5, albumId: album1.id },
      { trackIndex: 9, trackTitle: 'Neuköln', minutes: 4, seconds: 34, albumId: album1.id },
      { trackIndex: 10, trackTitle: 'The Secret Life Of Arabia', minutes: 3, seconds: 46, albumId: album1.id },
      { trackIndex: 1, trackTitle: 'Doolin-Dalton', minutes: 3, seconds: 27, albumId: album2.id },
      { trackIndex: 2, trackTitle: 'Twenty-One', minutes: 2, seconds: 9, albumId: album2.id },
      { trackIndex: 3, trackTitle: 'Out Of Control', minutes: 3, seconds: 4, albumId: album2.id },
      { trackIndex: 4, trackTitle: 'Tequila Sunrise', minutes: 2, seconds: 53, albumId: album2.id },
      { trackIndex: 5, trackTitle: 'Desperado', minutes: 3, seconds: 33, albumId: album2.id },
      { trackIndex: 6, trackTitle: 'Certain Kind Of Fool', minutes: 3, seconds: 1, albumId: album2.id },
      { trackIndex: 7, trackTitle: 'Doolin-Dalton (instrumental)', minutes: 0, seconds: 47, albumId: album2.id },
      { trackIndex: 8, trackTitle: 'Outlaw Man', minutes: 3, seconds: 33, albumId: album2.id },
      { trackIndex: 9, trackTitle: 'Saturday Night', minutes: 3, seconds: 20, albumId: album2.id },
      { trackIndex: 10, trackTitle: 'Bitter Creek', minutes: 5, seconds: 1, albumId: album2.id },
      { trackIndex: 11, trackTitle: 'Doolin-Dalton/Desperado (reprise)', minutes: 4, seconds: 51, albumId: album2.id },
      { trackIndex: 1, trackTitle: 'Movin\' Out', minutes: 3, seconds: 30, albumId: album3.id },
      { trackIndex: 2, trackTitle: 'The Stranger', minutes: 5, seconds: 10, albumId: album3.id },
      { trackIndex: 3, trackTitle: 'Just The Way You Are', minutes: 4, seconds: 50, albumId: album3.id },
      { trackIndex: 4, trackTitle: 'Scenes from an Italian Restaurant', minutes: 7, seconds: 36, albumId: album3.id },
      { trackIndex: 5, trackTitle: 'Vienna', minutes: 3, seconds: 34, albumId: album3.id },
      { trackIndex: 6, trackTitle: 'Only The Good Die Young', minutes: 3, seconds: 55, albumId: album3.id },
      { trackIndex: 7, trackTitle: 'She\'s Always A Woman', minutes: 3, seconds: 21, albumId: album3.id },
      { trackIndex: 8, trackTitle: 'Get It Right The First Time', minutes: 3, seconds: 56, albumId: album3.id },
      { trackIndex: 9, trackTitle: 'Everybody Has A Dream', minutes: 6, seconds: 36, albumId: album3.id },
      { trackIndex: 1, trackTitle: 'Thriller (extended)', minutes: 6, seconds: 45, albumId: album4.id },
      { trackIndex: 2, trackTitle: 'Thriller (instrumental)', minutes: 5, seconds: 57, albumId: album4.id },
      { trackIndex: 1, trackTitle: 'Luxury Liner', minutes: 3, seconds: 40, albumId: album5.id },
      { trackIndex: 2, trackTitle: 'Pancho & Lefty', minutes: 4, seconds: 50, albumId: album5.id },
      { trackIndex: 3, trackTitle: 'Making Believe', minutes: 3, seconds: 34, albumId: album5.id },
      { trackIndex: 4, trackTitle: 'You\'re Supposed To Feeling Good', minutes: 4, seconds: 0, albumId: album5.id },
      { trackIndex: 5, trackTitle: 'I\'ll Be Your San Antone Rose', minutes: 3, seconds: 26, albumId: album5.id },
      { trackIndex: 6, trackTitle: 'When I Stop Dreaming', minutes: 3, seconds: 15, albumId: album5.id },
      { trackIndex: 7, trackTitle: 'Hello Stranger', minutes: 3, seconds: 59, albumId: album5.id },
      { trackIndex: 8, trackTitle: 'She', minutes: 3, seconds: 15, albumId: album5.id },
      { trackIndex: 9, trackTitle: 'Tulsa Queen', minutes: 4, seconds: 47, albumId: album5.id },
      { trackIndex: 10, trackTitle: 'Me And Willie', minutes: 5, seconds: 16, albumId: album5.id },
      { trackIndex: 11, trackTitle: 'Night Flyer', minutes: 3, seconds: 35, albumId: album5.id },
      { trackIndex: 1, trackTitle: 'R.O.C.K', minutes: 3, seconds: 37, albumId: album6.id },
      { trackIndex: 2, trackTitle: 'Poster', minutes: 3, seconds: 38, albumId: album6.id },
      { trackIndex: 1, trackTitle: 'Natural Mystic', minutes: 3, seconds: 31, albumId: album7.id },
      { trackIndex: 2, trackTitle: 'So Much Things to Say', minutes: 3, seconds: 8, albumId: album7.id },
      { trackIndex: 3, trackTitle: 'Guiltiness', minutes: 3, seconds: 19, albumId: album7.id },
      { trackIndex: 4, trackTitle: 'The Heathen', minutes: 2, seconds: 32, albumId: album7.id },
      { trackIndex: 5, trackTitle: 'Exodus', minutes: 7, seconds: 40, albumId: album7.id },
      { trackIndex: 6, trackTitle: 'Jamming', minutes: 3, seconds: 31, albumId: album7.id },
      { trackIndex: 7, trackTitle: 'Waiting in Vain', minutes: 4, seconds: 16, albumId: album7.id },
      { trackIndex: 8, trackTitle: 'Turn Your Lights Down Low', minutes: 3, seconds: 39, albumId: album7.id },
      { trackIndex: 9, trackTitle: 'Three Little Birds', minutes: 3, seconds: 0, albumId: album7.id },
      { trackIndex: 10, trackTitle: 'One Love / People Get Ready', minutes: 2, seconds: 52, albumId: album7.id },
      { trackIndex: 1, trackTitle: 'What It Is', minutes: 4, seconds: 57, albumId: album8.id },
      { trackIndex: 2, trackTitle: 'Sailing to Philadelphia', minutes: 5, seconds: 29, albumId: album8.id },
      { trackIndex: 3, trackTitle: 'Who’s Your Baby Now', minutes: 3, seconds: 5, albumId: album8.id },
      { trackIndex: 4, trackTitle: 'Baloney Again', minutes: 5, seconds: 9, albumId: album8.id },
      { trackIndex: 5, trackTitle: 'The Last Laugh', minutes: 3, seconds: 22, albumId: album8.id },
      { trackIndex: 6, trackTitle: 'Do America', minutes: 4, seconds: 35, albumId: album8.id },
      { trackIndex: 7, trackTitle: 'Silvertown Blues', minutes: 5, seconds: 32, albumId: album8.id },
      { trackIndex: 8, trackTitle: 'El Macho', minutes: 5, seconds: 29, albumId: album8.id },
      { trackIndex: 9, trackTitle: 'Prairie Wedding', minutes: 4, seconds: 26, albumId: album8.id },
      { trackIndex: 10, trackTitle: 'Wanderlust', minutes: 3, seconds: 52, albumId: album8.id },
      { trackIndex: 11, trackTitle: 'Speedway at Nazareth', minutes: 6, seconds: 23, albumId: album8.id },
      { trackIndex: 12, trackTitle: 'Junkie Doll', minutes: 4, seconds: 34, albumId: album8.id },
      { trackIndex: 13, trackTitle: 'Sands of Nevada', minutes: 5, seconds: 29, albumId: album8.id },
      { trackIndex: 14, trackTitle: 'One More Matinee', minutes: 3, seconds: 39, albumId: album8.id },
      { trackIndex: 1, trackTitle: 'Birdland', minutes: 6, seconds: 0, albumId: album9.id },
      { trackIndex: 2, trackTitle: 'Wacky Dust', minutes: 3, seconds: 9, albumId: album9.id },
      { trackIndex: 3, trackTitle: 'Nothin\' You Can Do About It', minutes: 4, seconds: 25, albumId: album9.id },
      { trackIndex: 4, trackTitle: 'Coo Coo U', minutes: 2, seconds: 12, albumId: album9.id },
      { trackIndex: 5, trackTitle: 'Body and Soul', minutes: 4, seconds: 25, albumId: album9.id },
      { trackIndex: 6, trackTitle: 'Twilight Zone/Twilight Tone', minutes: 6, seconds: 11, albumId: album9.id },
      { trackIndex: 7, trackTitle: 'Trickle Trickle', minutes: 2, seconds: 18, albumId: album9.id },
      { trackIndex: 8, trackTitle: 'The Shaker Song', minutes: 4, seconds: 33, albumId: album9.id },
      { trackIndex: 9, trackTitle: 'Foreign Affair', minutes: 3, seconds: 51, albumId: album9.id },
      { trackIndex: 1, trackTitle: 'Mornin\'', minutes: 4, seconds: 13, albumId: album10.id },
      { trackIndex: 2, trackTitle: 'Boogie Down', minutes: 4, seconds: 12, albumId: album10.id },
      { trackIndex: 3, trackTitle: 'I Will Be Here For You (Nitakungodea Milele', minutes: 4, seconds: 16, albumId: album10.id },
      { trackIndex: 4, trackTitle: 'Save Me', minutes: 6, seconds: 30, albumId: album10.id },
      { trackIndex: 5, trackTitle: 'Step By Step', minutes: 4, seconds: 25, albumId: album10.id },
      { trackIndex: 6, trackTitle: 'Black And Blues', minutes: 4, seconds: 48, albumId: album10.id },
      { trackIndex: 7, trackTitle: 'Trouble In Paradise', minutes: 3, seconds: 46, albumId: album10.id },
      { trackIndex: 8, trackTitle: 'Not Like This', minutes: 2, seconds: 36, albumId: album10.id },
      { trackIndex: 9, trackTitle: 'Love Is Waiting', minutes: 3, seconds: 45, albumId: album10.id },
      { trackIndex: 1, trackTitle: 'Heart\'s Done Time', minutes: 4, seconds: 42, albumId: album11.id },
      { trackIndex: 2, trackTitle: 'Magic Touch', minutes: 4, seconds: 40, albumId: album11.id },
      { trackIndex: 3, trackTitle: 'Rag Doll', minutes: 4, seconds: 21, albumId: album11.id },
      { trackIndex: 4, trackTitle: 'Simoriah', minutes: 3, seconds: 21, albumId: album11.id },
      { trackIndex: 5, trackTitle: 'Dude (Looks Like A Lady)', minutes: 4, seconds: 23, albumId: album11.id },
      { trackIndex: 6, trackTitle: 'St. John', minutes: 4, seconds: 12, albumId: album11.id },
      { trackIndex: 7, trackTitle: 'Hangman Jury', minutes: 5, seconds: 33, albumId: album11.id },
      { trackIndex: 8, trackTitle: 'Girl Keeps Coming Apart', minutes: 4, seconds: 12, albumId: album11.id },
      { trackIndex: 9, trackTitle: 'Angel', minutes: 5, seconds: 10, albumId: album11.id },
      { trackIndex: 10, trackTitle: 'Permanent Vacation', minutes: 4, seconds: 52, albumId: album11.id },
      { trackIndex: 11, trackTitle: 'I\'m Down', minutes: 2, seconds: 20, albumId: album11.id },
      { trackIndex: 12, trackTitle: 'The Movie', minutes: 4, seconds: 0, albumId: album11.id },
      { trackIndex: 1, trackTitle: 'Sanningen om dig', minutes: 3, seconds: 10, albumId: album12.id },
      { trackIndex: 2, trackTitle: 'Landet vi föddes i', minutes: 3, seconds: 0, albumId: album12.id },
      { trackIndex: 3, trackTitle: 'Du skulle tagit det helt fel', minutes: 3, seconds: 55, albumId: album12.id },
      { trackIndex: 4, trackTitle: 'Höga berget', minutes: 3, seconds: 2, albumId: album12.id },
      { trackIndex: 5, trackTitle: 'Ett slag för dig', minutes: 6, seconds: 27, albumId: album12.id },
      { trackIndex: 6, trackTitle: 'Hej då', minutes: 3, seconds: 52, albumId: album12.id },
      { trackIndex: 7, trackTitle: 'Gör nånting vackert', minutes: 4, seconds: 7, albumId: album12.id },
      { trackIndex: 8, trackTitle: 'Älskling', minutes: 3, seconds: 38, albumId: album12.id },
      { trackIndex: 9, trackTitle: 'Där får jag andas ut (avsked till en svensk predikant)', minutes: 2, seconds: 38, albumId: album12.id },
      { trackIndex: 10, trackTitle: 'Guds röst', minutes: 4, seconds: 2, albumId: album12.id },
      { trackIndex: 11, trackTitle: 'Segla med', minutes: 5, seconds: 8, albumId: album12.id },
      { trackIndex: 12, trackTitle: 'En värld som förtjänar dig', minutes: 6, seconds: 28, albumId: album12.id },
      { trackIndex: 1, trackTitle: 'I.G.Y', minutes: 6, seconds: 5, albumId: album13.id },
      { trackIndex: 2, trackTitle: 'Green Flower Street', minutes: 3, seconds: 40, albumId: album13.id },
      { trackIndex: 3, trackTitle: 'Ruby Baby', minutes: 5, seconds: 38, albumId: album13.id },
      { trackIndex: 4, trackTitle: 'Maxine', minutes: 3, seconds: 50, albumId: album13.id },
      { trackIndex: 5, trackTitle: 'New Frontier', minutes: 6, seconds: 23, albumId: album13.id },
      { trackIndex: 6, trackTitle: 'The Nightfly', minutes: 5, seconds: 45, albumId: album13.id },
      { trackIndex: 7, trackTitle: 'The Goodbye Look', minutes: 4, seconds: 47, albumId: album13.id },
      { trackIndex: 8, trackTitle: 'Walk Between The Raindrops', minutes: 2, seconds: 38, albumId: album13.id },
      { trackIndex: 1, trackTitle: 'Walking In Memphis', minutes: 4, seconds: 18, albumId: album14.id },
      { trackIndex: 2, trackTitle: 'Ghost Train', minutes: 4, seconds: 10, albumId: album14.id },
      { trackIndex: 3, trackTitle: 'Silver Thunderbird', minutes: 4, seconds: 38, albumId: album14.id },
      { trackIndex: 4, trackTitle: 'Dig Down Deep', minutes: 5, seconds: 8, albumId: album14.id },
      { trackIndex: 5, trackTitle: 'Walk On Water', minutes: 4, seconds: 0, albumId: album14.id },
      { trackIndex: 6, trackTitle: 'Miles Away', minutes: 3, seconds: 22, albumId: album14.id },
      { trackIndex: 7, trackTitle: 'Saving The Best For Last', minutes: 5, seconds: 31, albumId: album14.id },
      { trackIndex: 8, trackTitle: 'Strangers In A Car', minutes: 2, seconds: 46, albumId: album14.id },
      { trackIndex: 9, trackTitle: '29 Ways', minutes: 3, seconds: 5, albumId: album14.id },
      { trackIndex: 10, trackTitle: 'Perfect Love', minutes: 4, seconds: 18, albumId: album14.id },
      { trackIndex: 11, trackTitle: 'True Companion', minutes: 4, seconds: 9, albumId: album14.id },
      { trackIndex: 1, trackTitle: 'Nigger', minutes: 3, seconds: 47, albumId: album15.id },
      { trackIndex: 2, trackTitle: 'Truth', minutes: 4, seconds: 12, albumId: album15.id },
      { trackIndex: 3, trackTitle: 'Rosegrove', minutes: 4, seconds: 2, albumId: album15.id },
      { trackIndex: 4, trackTitle: 'Don\'t Get Me Wrong', minutes: 3, seconds: 12, albumId: album15.id },
      { trackIndex: 5, trackTitle: 'I Need You', minutes: 4, seconds: 58, albumId: album15.id },
      { trackIndex: 6, trackTitle: 'Catch Me', minutes: 4, seconds: 39, albumId: album15.id },
      { trackIndex: 7, trackTitle: 'Warfair', minutes: 3, seconds: 48, albumId: album15.id },
      { trackIndex: 8, trackTitle: 'Wonderful World', minutes: 2, seconds: 40, albumId: album15.id },
      { trackIndex: 9, trackTitle: 'Sad To See Your Sorrow', minutes: 5, seconds: 18, albumId: album15.id },
      { trackIndex: 10, trackTitle: 'I Don\'t Care', minutes: 3, seconds: 11, albumId: album15.id },
      { trackIndex: 1, trackTitle: 'So What', minutes: 9, seconds: 22, albumId: album16.id },
      { trackIndex: 2, trackTitle: 'Freddie Freeloader', minutes: 9, seconds: 46, albumId: album16.id },
      { trackIndex: 3, trackTitle: 'Blue In Green', minutes: 5, seconds: 37, albumId: album16.id },
      { trackIndex: 4, trackTitle: 'All Blues', minutes: 11, seconds: 33, albumId: album16.id },
      { trackIndex: 5, trackTitle: 'Flamenco Sketches', minutes: 9, seconds: 26, albumId: album16.id },
      { trackIndex: 6, trackTitle: 'Flamenco Sketches (alternate take)', minutes: 9, seconds: 32, albumId: album16.id },
      { trackIndex: 1, trackTitle: 'Let\'s Get Rocked', minutes: 4, seconds: 56, albumId: album17.id },
      { trackIndex: 2, trackTitle: 'Heaven Is', minutes: 3, seconds: 37, albumId: album17.id },
      { trackIndex: 3, trackTitle: 'Make Love Like A Man', minutes: 4, seconds: 13, albumId: album17.id },
      { trackIndex: 4, trackTitle: 'Tonight', minutes: 4, seconds: 3, albumId: album17.id },
      { trackIndex: 5, trackTitle: 'White Lightning', minutes: 7, seconds: 37, albumId: album17.id },
      { trackIndex: 6, trackTitle: 'Stand Up (Kick Love Into Motion', minutes: 4, seconds: 31, albumId: album17.id },
      { trackIndex: 7, trackTitle: 'Personal Property', minutes: 4, seconds: 20, albumId: album17.id },
      { trackIndex: 8, trackTitle: 'Have You Ever Needed Someone So Bad', minutes: 5, seconds: 25, albumId: album17.id },
      { trackIndex: 9, trackTitle: 'I Wanna Touch U', minutes: 3, seconds: 13, albumId: album17.id },
      { trackIndex: 10, trackTitle: 'Tear It Down', minutes: 3, seconds: 38, albumId: album17.id },
      { trackIndex: 1, trackTitle: 'Pull Me Under', minutes: 8, seconds: 11, albumId: album18.id },
      { trackIndex: 2, trackTitle: 'Another Day', minutes: 4, seconds: 22, albumId: album18.id },
      { trackIndex: 3, trackTitle: 'Take The Time', minutes: 8, seconds: 21, albumId: album18.id },
      { trackIndex: 4, trackTitle: 'Surrounded', minutes: 5, seconds: 28, albumId: album18.id },
      { trackIndex: 5, trackTitle: 'Metropolis - part 1 "The Miracle And The Sleeper"', minutes: 9, seconds: 30, albumId: album18.id },
      { trackIndex: 6, trackTitle: 'Under A Glass Moon', minutes: 7, seconds: 2, albumId: album18.id },
      { trackIndex: 7, trackTitle: 'Wait For Sleep', minutes: 2, seconds: 31, albumId: album18.id },
      { trackIndex: 8, trackTitle: 'Learning To Live', minutes: 11, seconds: 30, albumId: album18.id },
      { trackIndex: 1, trackTitle: '6:00', minutes: 5, seconds: 31, albumId: album19.id },
      { trackIndex: 2, trackTitle: 'Caught In A Web', minutes: 5, seconds: 28, albumId: album19.id },
      { trackIndex: 3, trackTitle: 'Innocence Faded', minutes: 5, seconds: 43, albumId: album19.id },
      { trackIndex: 4, trackTitle: 'Erotomania', minutes: 6, seconds: 45, albumId: album19.id },
      { trackIndex: 5, trackTitle: 'Voices', minutes: 9, seconds: 53, albumId: album19.id },
      { trackIndex: 6, trackTitle: 'The Silent Man', minutes: 3, seconds: 48, albumId: album19.id },
      { trackIndex: 7, trackTitle: 'The Mirror', minutes: 6, seconds: 45, albumId: album19.id },
      { trackIndex: 8, trackTitle: 'Lie', minutes: 6, seconds: 34, albumId: album19.id },
      { trackIndex: 9, trackTitle: 'Lifting Shadows Off A Dream', minutes: 6, seconds: 5, albumId: album19.id },
      { trackIndex: 10, trackTitle: 'Scarred', minutes: 11, seconds: 0, albumId: album19.id },
      { trackIndex: 11, trackTitle: 'Space-Dye Vest', minutes: 7, seconds: 29, albumId: album19.id },
      { trackIndex: 1, trackTitle: 'New Millennium', minutes: 8, seconds: 20, albumId: album20.id },
      { trackIndex: 2, trackTitle: 'You Not Me', minutes: 4, seconds: 58, albumId: album20.id },
      { trackIndex: 3, trackTitle: 'Peruvian Skies', minutes: 6, seconds: 43, albumId: album20.id },
      { trackIndex: 4, trackTitle: 'Hollow Years', minutes: 5, seconds: 53, albumId: album20.id },
      { trackIndex: 5, trackTitle: 'Burning My Soul', minutes: 5, seconds: 29, albumId: album20.id },
      { trackIndex: 6, trackTitle: 'Hell\'s Kitchen', minutes: 4, seconds: 16, albumId: album20.id },
      { trackIndex: 7, trackTitle: 'Lines In The Sand', minutes: 12, seconds: 5, albumId: album20.id },
      { trackIndex: 8, trackTitle: 'Take Away My Pain', minutes: 6, seconds: 3, albumId: album20.id },
      { trackIndex: 9, trackTitle: 'Just Let Me Breath', minutes: 5, seconds: 28, albumId: album20.id },
      { trackIndex: 10, trackTitle: 'Anna Lee', minutes: 5, seconds: 51, albumId: album20.id },
      { trackIndex: 11, trackTitle: 'Trial Of Tears', minutes: 13, seconds: 7, albumId: album20.id },
      { trackIndex: 1, trackTitle: 'Serpentine Fire', minutes: 3, seconds: 50, albumId: album21.id },
      { trackIndex: 2, trackTitle: 'Fantasy', minutes: 4, seconds: 37, albumId: album21.id },
      { trackIndex: 3, trackTitle: 'In The Marketplace (Interlude)', minutes: 0, seconds: 43, albumId: album21.id },
      { trackIndex: 4, trackTitle: 'Jupiter', minutes: 3, seconds: 11, albumId: album21.id },
      { trackIndex: 5, trackTitle: 'Love\'s Holiday ', minutes: 4, seconds: 22, albumId: album21.id },
      { trackIndex: 6, trackTitle: 'Brazilian Rhyme (Interlude)', minutes: 1, seconds: 20, albumId: album21.id },
      { trackIndex: 7, trackTitle: 'I\'ll Write A Song For You', minutes: 5, seconds: 24, albumId: album21.id },
      { trackIndex: 8, trackTitle: 'Magic Mind', minutes: 3, seconds: 39, albumId: album21.id },
      { trackIndex: 9, trackTitle: 'Runnin\'', minutes: 5, seconds: 51, albumId: album21.id },
      { trackIndex: 10, trackTitle: 'Brazilian Rhyme (Interlude)', minutes: 0, seconds: 53, albumId: album21.id },
      { trackIndex: 11, trackTitle: 'Be Ever Wonderful', minutes: 5, seconds: 8, albumId: album21.id },
      { trackIndex: 1, trackTitle: 'Southern Streamline', minutes: 3, seconds: 56, albumId: album22.id },
      { trackIndex: 2, trackTitle: 'Hot Rod Heart', minutes: 3, seconds: 26, albumId: album22.id },
      { trackIndex: 3, trackTitle: 'Blueboy', minutes: 4, seconds: 4, albumId: album22.id },
      { trackIndex: 4, trackTitle: 'A Hundered And Ten In The Shade', minutes: 4, seconds: 19, albumId: album22.id },
      { trackIndex: 5, trackTitle: 'Rattlesnake Highway', minutes: 4, seconds: 17, albumId: album22.id },
      { trackIndex: 6, trackTitle: 'Bring It Down To Jelly Road', minutes: 2, seconds: 37, albumId: album22.id },
      { trackIndex: 7, trackTitle: 'Walking In A Hurricane', minutes: 3, seconds: 41, albumId: album22.id },
      { trackIndex: 8, trackTitle: 'Swamp River Days', minutes: 3, seconds: 37, albumId: album22.id },
      { trackIndex: 9, trackTitle: 'Rambunctions Boy', minutes: 3, seconds: 52, albumId: album22.id },
      { trackIndex: 10, trackTitle: 'Joy Of My Life', minutes: 3, seconds: 52, albumId: album22.id },
      { trackIndex: 11, trackTitle: 'Blue Moon Nights', minutes: 2, seconds: 33, albumId: album22.id },
      { trackIndex: 12, trackTitle: 'Bad Bad Boy', minutes: 4, seconds: 27, albumId: album22.id },
      { trackIndex: 1, trackTitle: 'Why We Sing', minutes: 5, seconds: 54, albumId: album23.id },
      { trackIndex: 2, trackTitle: 'He\'s Able', minutes: 4, seconds: 5, albumId: album23.id },
      { trackIndex: 3, trackTitle: 'Silver & Gold', minutes: 4, seconds: 51, albumId: album23.id },
      { trackIndex: 4, trackTitle: 'Call On The Lord', minutes: 3, seconds: 31, albumId: album23.id },
      { trackIndex: 5, trackTitle: 'Real Love', minutes: 5, seconds: 22, albumId: album23.id },
      { trackIndex: 6, trackTitle: 'He Can Handle It', minutes: 5, seconds: 6, albumId: album23.id },
      { trackIndex: 7, trackTitle: 'A Letter From My Friend', minutes: 5, seconds: 41, albumId: album23.id },
      { trackIndex: 8, trackTitle: 'The Family Worship Medley', minutes: 7, seconds: 55, albumId: album23.id },
      { trackIndex: 9, trackTitle: 'Speak To Me', minutes: 4, seconds: 19, albumId: album23.id },
      { trackIndex: 10, trackTitle: 'Till We Meet Again', minutes: 7, seconds: 10, albumId: album23.id },
      { trackIndex: 1, trackTitle: 'Intro', minutes: 2, seconds: 19, albumId: album24.id },
      { trackIndex: 2, trackTitle: 'Hosanna', minutes: 5, seconds: 7, albumId: album24.id },
      { trackIndex: 3, trackTitle: 'Caught Up', minutes: 5, seconds: 57, albumId: album24.id },
      { trackIndex: 4, trackTitle: '911', minutes: 4, seconds: 41, albumId: album24.id },
      { trackIndex: 5, trackTitle: 'The Blood Song', minutes: 5, seconds: 36, albumId: album24.id },
      { trackIndex: 6, trackTitle: 'Brighter Day', minutes: 5, seconds: 40, albumId: album24.id },
      { trackIndex: 7, trackTitle: 'My Life, My Love, My All', minutes: 6, seconds: 22, albumId: album24.id },
      { trackIndex: 8, trackTitle: 'Lookin\' Out For Me', minutes: 5, seconds: 53, albumId: album24.id },
      { trackIndex: 9, trackTitle: 'He Reigns/Awesome God', minutes: 4, seconds: 25, albumId: album24.id },
      { trackIndex: 10, trackTitle: 'Interlude', minutes: 2, seconds: 37, albumId: album24.id },
      { trackIndex: 11, trackTitle: 'Don\'t Cry', minutes: 6, seconds: 8, albumId: album24.id },
      { trackIndex: 12, trackTitle: 'The Transition', minutes: 0, seconds: 46, albumId: album24.id },
      { trackIndex: 13, trackTitle: 'Always', minutes: 6, seconds: 44, albumId: album24.id },
      { trackIndex: 14, trackTitle: 'When I Get There', minutes: 5, seconds: 41, albumId: album24.id },
      { trackIndex: 15, trackTitle: 'Interlude - Pt. Two', minutes: 0, seconds: 43, albumId: album24.id },
      { trackIndex: 16, trackTitle: 'Outro (The Blood)', minutes: 5, seconds: 9, albumId: album24.id },
      { trackIndex: 1, trackTitle: 'If I Were You', minutes: 2, seconds: 51, albumId: album25.id },
      { trackIndex: 2, trackTitle: 'Just To Get To You', minutes: 2, seconds: 37, albumId: album25.id },
      { trackIndex: 3, trackTitle: 'I\'d Follow You Anywhere', minutes: 2, seconds: 46, albumId: album25.id },
      { trackIndex: 4, trackTitle: 'What\'s On My Mind ', minutes: 3, seconds: 4, albumId: album25.id },
      { trackIndex: 5, trackTitle: 'Merle World', minutes: 2, seconds: 28, albumId: album25.id },
      { trackIndex: 6, trackTitle: 'You\'ll Know When It\'s Right', minutes: 3, seconds: 41, albumId: album25.id },
      { trackIndex: 7, trackTitle: 'Honky Tonk Haze', minutes: 3, seconds: 42, albumId: album25.id },
      { trackIndex: 8, trackTitle: 'First Things First', minutes: 2, seconds: 43, albumId: album25.id },
      { trackIndex: 9, trackTitle: 'Oh My Goodness', minutes: 2, seconds: 5, albumId: album25.id },
      { trackIndex: 10, trackTitle: 'Diesel, Diesel, Diesel', minutes: 2, seconds: 38, albumId: album25.id },
      { trackIndex: 11, trackTitle: 'Born Believers', minutes: 2, seconds: 37, albumId: album25.id },
      { trackIndex: 12, trackTitle: 'It\'s Not Too Late', minutes: 2, seconds: 48, albumId: album25.id }
    ])

    console.log('Testdata har lagts in!')
  } catch (err) {
    console.error('Fel vid seed:', err)
  } finally {
    await sequelize.close()
  }
}
seed()
