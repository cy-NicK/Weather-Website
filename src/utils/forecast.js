const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'0&exclude={part}&appid=650f39cd6b897b75ffac1d28f3a32c72&units=metric'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to OPENWEATHER..',undefined)
        }
        else if(body.message){
            callback('UNABLE TO find the location..',undefined)
        }
        else{
            callback(undefined,'It is currently '+body.current.weather[0].main+' and the temperature is '+body.current.temp)   
        }
    })
}

module.exports=forecast