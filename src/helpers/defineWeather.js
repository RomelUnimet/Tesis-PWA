const defineWeather = (weather, wind) =>{

    const {id} = weather;
    const {speed} = wind;

    switch (true) {

        case id===800:
            return 'sunny';

        case id===801:
            return 'cloudy';

        case (id>801 && id<=804 && speed<6.7):
            return 'cloud';

        case (id>=500 && id<=531):
            return 'rain';

        case id>=300 && id<=321:
            return 'haze';

        case id>=200 && id<=232:
            return 'thunder';

        case (id>801 && id<=804 && speed>=6.7 && speed<=11):
            return 'cloudy-windy';

        case (id>801 && id<=804 && speed>11):
            return 'cloudy-gust';

        case (id>=701 && id<=771):
            return 'dusty';

        case (id===781):
            return 'tornado';

        case (id>=600 && id<=622):
            return 'snow';
    
        default:
            return 'cloudy';
    }

}



export {defineWeather};