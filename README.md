# Reha Astrology

`Doesn't work in browser environments. Please run on server`

```shell
npm i -S astroreha
```

1. Default House System: `Whole Sign`
2. Default Ayanamsha Used: `Lahiri`
3. Compatibility can have maximum 30 points. Default threshold for matching is 12. (>=12)

### Get Birth Chart

```javascript
const astroreha = require("astroreha");

// Get Birth Chart Details
/**
 * @param {String} dateString format YYYY-MM-DD
 * @param {String} timeString format HH:MM:SS
 * @param {Number} lat latitude
 * @param {Number} lng longitude
 * @param {Number} timezone timezone in hours
 */
const birthChart = astroreha.positioner.getBirthChart("1999-05-22", "08:00:00", 28.6139, 77.209, 5.5);
// Get Rashi
birthChart.meta.Mo.rashi // Rashi is Moon Sign in Indian Astrology
// Get Sun Sign
birthChart.meta.Su.rashi
// Get Grahas in a certain Rashi
birthChart.aries.signs // returns an array of grahas

// Get compatibility (returns Boolean)
astroreha.compatibility.areCompatible({dateString, timeString, lat, lng, timezone}, {dateString, timeString, lat, lng, timezone});
```
## Updates for 1.1.5
1. Changed Getting Navamsa Chart Logic to be more accurate considering floating point inaccuracies
2. More constants available


## Breaking Changes
1. Not a default Export anymore
2. Gives Positioner and Compatibility Feature



### Verified with [Prokerela.com](https://www.prokerala.com)
