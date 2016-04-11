

export function regionToPlatformId(region){
    switch(region.toLowerCase()){
        case "euw":
            return "EUW1";
        case "na":
            return "NA1";
        case "eune":
            return "EUN1";
        default:
            console.warn("Unknown region supplied to util.regionToPlatformId", region);
            return "EUW1";
    }
}


export const RIOT_API_URLS = {
    LIVE_GAME : "https://REGION.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/PLATFORMID/SUMMONERID?api_key=",
    SUMMONER_DATA : "https://REGION.api.pvp.net/api/lol/REGION/v1.4/summoner/by-name/SUMMONERNAME?api_key=",

    SUMMONER: {
        CHAMPION_STATS : "https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/SUMMONERID/ranked?season=SEASON2016&api_key=",
        LEAGUE : "https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/SUMMONERID/entry?api_key="
    },

    STATIC_DATA : {
        CHAMPIONS : "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?dataById=true&champData=image&api_key=",
        RUNES : "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/rune?runeListData=sanitizedDescription&api_key=",
        MASTERIES : "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/mastery?masteryListData=image,sanitizedDescription&api_key=",
        SUMMONER_SPELLS : "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/summoner-spell?spellData=cooldown,image,sanitizedDescription&api_key="
    }
}

export function getRiotApiUrl(URL_TYPE, options){
    var requiredOptions;
    switch(URL_TYPE){
        case RIOT_API_URLS.LIVE_GAME:
            requiredOptions = ["summonerId", "region"];
            if (!objectHasProperties(options, requiredOptions)){
                console.warn("Required option missing for live game url. Options object must contain keys", JSON.stringify(requiredOptions));
                console.warn("Received", JSON.stringify(options));
                return null
            }
            return replacifyUrl(RIOT_API_URLS.LIVE_GAME, options);
        case RIOT_API_URLS.SUMMONER_DATA:
            requiredOptions = ["summonerName", "region"];
            if(!objectHasProperties(options, requiredOptions)){
                console.warn("Required option missing for summoner data url. Options object must contain keys", JSON.stringify(requiredOptions));
                console.warn("Received", JSON.stringify(options));
                return null;
            }
            return replacifyUrl(RIOT_API_URLS.SUMMONER_DATA, options);
        case RIOT_API_URLS.SUMMONER.CHAMPION_STATS:
            requiredOptions = ["region", "summonerId"];
            if(!objectHasProperties(options, requiredOptions)){
                console.warn("Required option missing for summoner data url. Options object must contain keys", JSON.stringify(requiredOptions));
                console.warn("Received", JSON.stringify(options));
                return null;
            }
            return replacifyUrl(RIOT_API_URLS.SUMMONER.CHAMPION_STATS, options);
        case RIOT_API_URLS.SUMMONER.LEAGUE:
            requiredOptions = ["region", "summonerId"];
            if(!objectHasProperties(options, requiredOptions)){
                console.warn("Required option missing for summoner data url. Options object must contain keys", JSON.stringify(requiredOptions));
                console.warn("Received", JSON.stringify(options));
                return null;
            }
            return replacifyUrl(RIOT_API_URLS.SUMMONER.LEAGUE, options);
        default:
            console.warn("Requested unknown url type " + URL_TYPE);
            return null;
    }
}

// Used by getRiotApiUrl
function replacifyUrl(url, options){
    if(options.summonerName){
        url = summonerNameifyUrl(url, options.summonerName);
    }
    if(options.region){
        url = regionifyUrl(url, options.region);
        url = platformIdifyUrl(url, regionToPlatformId(options.region));
    }
    if(options.summonerId){
        url = summonerIdifyUrl(url, options.summonerId);
    }
    return url;
}

function objectHasProperties(object, properties){
    for(var i = 0; i < properties.length; i++){
        if(!object.hasOwnProperty(properties[i])){
            return false;
        }
    }
    return true;
}

function summonerNameifyUrl(url, summonerName){
    return url.replace(/SUMMONERNAME/g, summonerName);
}

function regionifyUrl(url, region){
    return url.replace(/REGION/g, region);
}

function summonerIdifyUrl(url, summonerId){
    return url.replace(/SUMMONERID/g, summonerId);
}

function platformIdifyUrl(url, platformId){
    return url.replace(/PLATFORMID/g, platformId);
}

export function hasKey(object, key){
    return Object.keys(object).indexOf(key) >= 0;
}

export function getDeepOrDefault(object, keys, defaultval=null){
    if(!object || typeof object === "undefined" || object === null){
        return defaultval;
    }
    var returnval = object;
    for(var i = 0; i< keys.length; i++){
        if(returnval.hasOwnProperty(keys[i])){
            returnval = returnval[keys[i]];
        } else {
            return defaultval;
        }
    }
    return returnval;
}