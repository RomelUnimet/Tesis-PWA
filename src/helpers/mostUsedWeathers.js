export const initWeathers =  (allWeathers) => {
    
    const filteredWeathers = allWeathers.filter((w)=>w!=='none');

    let weathers = [
        {name: 'sunny', count: 0},
        {name: 'cloudy', count: 0},
        {name: 'cloud', count: 0},
        {name: 'rain', count: 0},
        {name: 'haze', count: 0},
        {name: 'thunder', count: 0},
        {name: 'cloudy-gust', count: 0},
        {name: 'cloudy-windy', count: 0},
        {name: 'dusty', count: 0},
        {name: 'tornado', count: 0},
        {name: 'snow', count: 0},
    ]

    filteredWeathers.forEach(weather => {
        switch (weather) {
            case 'sunny':
                weathers[0]= { ...weathers[0], count: (weathers[0].count+1) }
                break;
            case 'cloudy':
                weathers[1]= { ...weathers[1], count: (weathers[1].count+1) }
                break;
            case 'cloud':
                weathers[2]= { ...weathers[2], count: (weathers[2].count+1) }
                break;
            case 'rain':
                weathers[3]= { ...weathers[3], count: (weathers[3].count+1) }
                break;
            case 'haze':
                weathers[4]= { ...weathers[4], count: (weathers[4].count+1) }
                break;
            case 'thunder':
                weathers[5]= { ...weathers[5], count: (weathers[5].count+1) }
                break;
            case 'cloudy-gust':
                weathers[6]= { ...weathers[6], count: (weathers[6].count+1) }
                break;
            case 'cloudy-windy':
                weathers[7]= { ...weathers[7], count: (weathers[7].count+1) }
                break;
            case 'dusty':
                weathers[8]= { ...weathers[8], count: (weathers[8].count+1) }
                break;
            case 'tornado':
                weathers[9]= { ...weathers[9], count: (weathers[9].count+1) }
                break;
            default:
                weathers[10]= { ...weathers[10], count: (weathers[10].count+1) }
                break;
        }
    });

    weathers = weathers.filter(w => w.count!==0);

    weathers.sort(
        (a, b) => {          
            return a.count < b.count ? 1 : -1;
        });   


    return weathers.length>6? weathers.slice(0,6): weathers;
}