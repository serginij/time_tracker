export const formatTime = time => {
  let sec = time
  let min, hrs

  if (sec > 60) {
    min = (sec - (sec % 60)) / 60
    sec = sec % 60
  } else {
    min = (sec - (sec % 60)) / 60
  }

  if (min > 60) {
    hrs = (min - (min % 60)) / 60
    min = min % 60
  } else {
    hrs = (min - (min % 60)) / 60
  }

  return {
    time:
      (hrs ? (hrs < 10 ? '0' + hrs : hrs) + ':' : '') +
      (min < 10 ? '0' + min : min) +
      ':' +
      (sec < 10 ? '0' + sec : sec),
    hrs: hrs,
    min: min,
    sec: sec
  }
}
