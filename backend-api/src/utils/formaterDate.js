const moment = require('moment');
require('moment/locale/fr');

/**
 * formate une date au format 10/10/2026 a 21h03
 */

const formaterDate = (date)=>{
    if(!date) return null;
    return moment.utc(date).locale('fr').format('DD/MM/YYYY [à] HH[h]mm')
}

module.exports = formaterDate;