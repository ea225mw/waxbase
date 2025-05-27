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
      the: null
    })
    const artist2 = await models.artist.create({
      firstName: null,
      lastName: 'Eagles',
      the: 'The'
    })
    const artist3 = await models.artist.create({
      firstName: 'Billy',
      lastName: 'Joel',
      the: null
    })
    const artist4 = await models.artist.create({
      firstName: 'Michael',
      lastName: 'Jackson',
      the: null
    })
    const artist5 = await models.artist.create({
      firstName: 'Emmylou',
      lastName: 'Harris',
      the: null
    })
    const artist6 = await models.artist.create({
      firstName: null,
      lastName: 'Sha-Boom',
      the: null
    })

    const artist7 = await models.artist.create({
      firstName: 'Bob',
      lastName: 'Marley',
      the: null
    })

    const artist8 = await models.artist.create({
      firstName: 'Mark',
      lastName: 'Knopfler',
      the: null
    })

    const artist9 = await models.artist.create({
      firstName: null,
      lastName: 'Manhattan Transfer',
      the: 'The'
    })

    const artist10 = await models.artist.create({
      firstName: 'Al',
      lastName: 'Jarreau',
      the: null
    })

    const artist11 = await models.artist.create({
      firstName: null,
      lastName: 'Aerosmith',
      the: null
    })
    const artist12 = await models.artist.create({
      firstName: 'Tomas',
      lastName: 'Andersson Wij',
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
      storeId: null,
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
      { trackIndex: 12, trackTitle: 'En värld som förtjänar dig', minutes: 6, seconds: 28, albumId: album12.id }
    ])

    console.log('Testdata har lagts in!')
  } catch (err) {
    console.error('Fel vid seed:', err)
  } finally {
    await sequelize.close()
  }
}
seed()
