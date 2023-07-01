export function getHourlyData(state) {
  if (Object.keys(state.dataFiveDays).length == 0) return []
  return state.dataFiveDays.list.slice(0, 15)
}

export function getDaysForecast(state) {
  if (Object.keys(state.dataFiveDays).length == 0) return {}
  let obj = {}
  for (const day of state.dataFiveDays.list) {
    let date = new Date(day.dt_txt).toLocaleDateString("en-US", {weekday: 'short', month: 'short', day: 'numeric'})
    if (!(date in obj)) {
      obj[date] = {
        temp_min: parseInt(day.main.temp_max),
        temp_max: parseInt(day.main.temp_min),
        icon: day.weather[0].icon,
        description: day.weather[0].description
      }
    } else {
      if (obj[date].temp_max < parseInt(day.main.temp_max)) obj[date].temp_max = parseInt(day.main.temp_max)
      if (obj[date].temp_min > parseInt(day.main.temp_min)) obj[date].temp_min = parseInt(day.main.temp_min)
    }
  }
  return obj
}

export function getDetailDaysForecast(state) {
  if (Object.keys(state.dataFiveDays).length == 0) return []
  let res = []
  let count = {}
  console.log({data: state.dataFiveDays.list[0]})
  for (const day of state.dataFiveDays.list) {
    let date = new Date(day.dt_txt).toLocaleDateString("en-US", {weekday: 'short', month: 'short', day: 'numeric'})
    let time = new Date(day.dt_txt).toLocaleString("en-CA", {dayPeriod: 'narrow'})
    let idx = res.findIndex(x => x.date === date)
    if (idx === -1) {
      count[date] = 1
      let data = {
        main: day.weather[0].main,
        temp_max: day.main.temp_max,
        temp_min: day.main.temp_min,
        icon: day.weather[0].icon,
        description: day.weather[0].description,
        rain: !day.rain ? 0 : day.rain['3h'],
        wind: !day.wind ? 0 : day.wind.speed,
        snow: !day.snow ? 0 : day.snow['3h'],
        humidity: day.main.humidity,
        pop: day.pop,
        visibility: day.visibility,
        clouds: day.clouds.all,
        dayPeriod: {},
      }
      data.dayPeriod[state.dayPeriod[time]] = {
        temp: day.main.temp,
        feel_like: day.main.feels_like
      }
      res.push({date, data})
    } else {
      count[date] += 1
      if (res[idx].data.temp_max < day.main.temp_max) res[idx].data.temp_max = day.main.temp_max
      if (res[idx].data.temp_min > day.main.temp_min) res[idx].data.temp_min = day.main.temp_min
      res[idx].data.rain += !day.rain ? 0 : day.rain['3h']
      res[idx].data.wind += !day.wind ? 0 : day.wind.speed
      res[idx].data.snow += !day.snow ? 0 : day.snow['3h']
      res[idx].data.pop += day.pop
      res[idx].data.visibility += day.visibility
      res[idx].data.clouds += day.clouds.all
      res[idx].data.humidity += day.main.humidity
      res[idx].data.dayPeriod[state.dayPeriod[time]] = {
        temp: day.main.temp,
        feel_like: day.main.feels_like
      }
    }
  }

  for (const r of res) {
    r.data.rain = (r.data.rain / count[r.date]).toFixed()
    r.data.wind = (r.data.wind / count[r.date]).toFixed()
    r.data.snow = (r.data.snow / count[r.date]).toFixed()
    r.data.pop = (r.data.pop / count[r.date]).toFixed()
    r.data.visibility = (r.data.visibility / count[r.date]).toFixed()
    r.data.clouds = (r.data.clouds / count[r.date]).toFixed()
    r.data.humidity = (r.data.humidity / count[r.date]).toFixed()
  }
  return res
}