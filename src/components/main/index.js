import React from 'react'
import { styled } from 'linaria/react'

export const Main = () => {
  // const sites = JSON.parse(
  //   '[{"tabId":3906,"url":"chrome-extension://fifpkgdkjiobjdjhbofplaffockmgbba/dist/index.html","time":69},{"tabId":3894,"url":"chrome://extensions/?id=fifpkgdkjiobjdjhbofplaffockmgbba","time":12}]'
  // )

  let sites = JSON.parse(localStorage.getItem('sites')) || []
  // sites.push({ tabId: 2345, url: 'https://some-site.com', time: 900 })

  let list = sites.map(item => {
    let sec = item.time
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
    return (
      <Item key={item.url + item.time}>
        <Website>{item.url}</Website>
        <Time>
          {(hrs ? (hrs < 10 ? '0' + hrs : hrs) + ':' : '') +
            (min < 10 ? '0' + min : min) +
            ':' +
            (sec < 10 ? '0' + sec : sec)}
        </Time>
      </Item>
    )
  })

  return (
    <div>
      <SubTitle>Time spent on websites</SubTitle>
      <List>{list}</List>
    </div>
  )
}

const SubTitle = styled.h2`
  margin-left: 3%;
`

const List = styled.ul`
  list-style: none;
  padding: 0 5%;
`

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  border-top: solid 1px black;
  box-sizing: border-box;
  padding: 0 3%;
  align-items: center;

  &:first-child {
    border-top: none;
  }
`

const Website = styled.p``

const Time = styled.p`
  border-left: 1px solid black;
  padding: 1em 0 1em 1em;
  height: 100%;
  margin: 0;
  min-width: 60px;
  text-align: center;
`
