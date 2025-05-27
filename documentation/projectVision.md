# Title

|  |  |
|--|--|
| Namn | Emanuel Andersen |
| Användarnamn | ea225mw |
| Studieform | Distans |
| Projektnamn | Applikation för skivsamlande |
| Tekniker | Nginx, Node.js, Express, HTML/CSS, ev någon form av SQL |

## Bakgrund och problembeskrivning

Applikationen är tänkt att lösa det problem som uppstår när man som skivsamlare står vid en skivback och ställer sig frågan; äger jag redan den här skivan? Applikationen ska vara ett databasverktyg för att hålla koll på sin skivsamling. Vilka skivor har jag, vad kostade den, var köpte jag den och i vilket skick är den? Applikationen är tänkt att vara en SPA och i framtiden en PWA och ska gå att använda både på dator och i mobila enheter.

## Användar/mål-grupper

Tilltänkta användare är skivsamlare. Applikationen kommer vara högt specialicerad på just skivor och därför blir tilltänkta användare en ganska smal grupp. Andra användare skulle kunna vara mindre radiostationer och andra med skivarkiv.

## Marknad

Liknande system finns redan på marknaden:

**Music Collector** från Collectorz som även gör applikationer för samlande av film, serietidningar och böcker. Jag har egen erfarenhet av produkten. Music Collector finns både som desktop- webb- och mobilversion.

Styrkor med systemet är att användarens databas synkas till ett moln för att samlingen alltid ska vara uppdaterad även om man använder olika enheter. Det finns gott om detaljer och parametrar att sätta på varje enskild skiva i samlingen. Programmet erbjuder många olika sätt att lägga till en skiva i samlingen. Antingen via att läsa av en fysisk CD-skiva, via streckkod, artist- eller skivnamn samt katalognummer. Sökning görs sedan mot deras egen databas över skivor eller mot Discogs API (Discogs beskrivs nedan) och om skivan hittades kan den läggas till med all tillgänglig information. Priset för tjänsten är skäligt, runt 500 kr per år.

Svagheter med systemet är att mobilversionen är begränsad i funktioner jämfört med desktopversionen.

**Discogs** är ett användarcentrerat system på webben kring skivsamlande. Användare kan själva bidra med information till utgivna skivor och eftersom siten har väldigt många användare (och förmodligen är världens största site för skivsamlande) så är deras skivkatalog mycket omfattande. Siten erbjuder många funktioner, så som att koppla ihop köpare och säljare av skivor, lägga till sina skivor i en egen samling eller skivor till en "want-list". Det finns också ett stort forum med olika avdelningar.

Styrkor med Discogs är den mycket omfattande databasen med utgivna skivor. Det mesta går att hitta där och finns inte releasen kan man som användare lägga till den och då görs den tillgänglig för alla andra användare. Till varje release finns ofta detaljerad kringinformation så som medverkande musiker. Det finns en mobil-app kopplat till tjänsten.

Svagheter är att listvyn i ens samling kräver en del manuell hantering och tilläggande av "custom fields" och presentationen är ganska mycket satt av systemet och svårt att påverka för användaren.

## Baskrav/Egenskaper/Features/Unique Selling Points

**Baskrav och egenskaper:**

- visa hela skivsamlingen eller enskild skiva
- att kunna lägga till och editera skivor i samlingen på smidigt sätt, exempelvis via mobilkamera och streckkodsavläsning.
- visa vald skivas skivomslag
- implementation av Discogs API för inhämtning av information kring skivor
- att desktop- och mobilversion ska kunna samma saker i så stor utsträckning som möjligt.
- stora möjligheter för användaren att utforma utseende och informationsvisning
- om betalning ska införas i framtiden så kommer det att vara enligt devisen: betala en gång, kör på versionen så länge ni vill och uppgradera vid behov och betala för uppgraderingen.

## Teknik

Applikationen ska vara en SPA/PWA och teknikerna innefattar HTML, CSS, JavaScript och koppling till databas. Jag har redan min egen personliga skivsamling sparad i en SQLite-databas från ovan nämnda Music Collector. Tanken är därför att använda SQL för att kunna använda mig av redan inlagd data. Om detta visar sig vara för krångligt eller tidskrävande har jag som backup-plan att använda mig av MongoDB och lägga in en begränsad samling skivor för utvecklandet av applikationen och implementera SQLite i en framtida version.