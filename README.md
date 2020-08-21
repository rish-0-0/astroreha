# Reha Astrology

1. Default House System: `Whole Sign`
2. Default Ayanamsha Used: `Lahiri`

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
astroreha.getBirthChart("1999-05-22", "08:00:00", 28.6139, 77.209, 5.5);
```



### Verified with [Prokerela.com](https://www.prokerala.com)
