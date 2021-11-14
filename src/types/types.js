
export const types = {

    //Auth 
    authChekingFinish: '[auth] Finish checking for login state',
    authChekingToken: '[auth] Finish checking for existing token',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartCreate: '[auth] Start create',

    //Settings
    settStore: '[settings] Store settings in state',
    settUpdate: '[settings] Update settings on state',

    //Cards/Diaries
    cardStore: '[cards] Store cards in state',
    cardUpdate: '[cards] Update cards on statestate',

    //Weather
    startWeatherStore: '[weather] Start weather cards in state',
    weatherStore: '[weather] Store weather in state',

    //GEOLOCATION
    geolocationStore: '[geolocation] Store geolocation in state',

    //Scroll memo
    storeMemoScrollCardTab: '[scroll memo] Store scroll memorization card tab',
    storeMemoScrollProfile: '[scroll memo] Store scroll memorization profile',
    storeCardMemo: '[scroll memo] Store card memorization',


    //Navigation
    lastCardPathStore: '[navigation] Store last Card Section Path',    
    lastProfilePathStore: '[navigation] Store last Profile Section Path',    
    navigatingToStore: '[navigation] Store Path to be navigated',    

    //Tags
    tagsStore: '[tag] Store tags in state',
    tagUpdate: '[tag] Update a tag in the state',
    tagCreate: '[tag] Create a new tag in state',
    tagDelete: '[tag] Delete a tag from the state',

    //Locations
    locationsStore: '[location] Store locations in state',

    //Entries
    entriesStore: '[entry] Store entries in state',

}