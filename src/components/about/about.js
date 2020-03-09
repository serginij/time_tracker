import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Button } from '@ui'
import { history } from '../../routes'

import icon from '@assets/icon_128.png'

export const About = () => {
  const goToSettings = () => {
    history.push('/settings')
  }
  return (
    <Wrapper>
      <Header>
        <Logo>
          <img src={icon} alt="" />
          LIMER
        </Logo>
        <InfoBlock className={head_info}>
          <Title>Сделайте свою работу эффективной.</Title>
          <Text>
            Отслеживайте сайты, которые вы посещаете. Просматривайте статистику
            использования избранных ресурсов. Разбивайте сайты по категориям и
            повышайте собственную эффективность. Попробуйте!
          </Text>
          <Button onClick={goToSettings}>Попробовать</Button>
        </InfoBlock>
        <Title></Title>
      </Header>
      <Body>
        <InfoBlock className={about}>
          <SubTitle>О ресурсе</SubTitle>
          <Text>
            Какой-то текст о том, что мы группа разработчивок, которые трудятся
            на благо этого мира. Наша цель - сделать твою работу, друг,
            эффективнее. Ты часто тратишь много времени на соцсети, видеоролики.
            Хотя мог бы трудиться на благо Родины. Мы поможем тебе распределять
            время так, чтобы ты стал крутым специалистом в своем деле.
          </Text>
        </InfoBlock>
        <InfoBlock className={info}>
          <SubTitle>Установка</SubTitle>
          <Text>
            1{')'} Перейти на страницу расширений
            <br />2{')'} Включить режим разработчика, переключив слайдер в
            верхнем правом углу
            <br />3{')'} Нажать кнопку{' '}
            {`"Загрузить
          распакованное расширение"`}
          </Text>
        </InfoBlock>
      </Body>
      <Footer>
        <Logo position x={20} y={0}>
          <img src={icon} alt="" />
          LIMER
        </Logo>
        <Nav>
          <p>
            <Link>Цены</Link>
          </p>
          <p>
            <Link>Обратная связь</Link>
          </p>
          <p>
            <Link>Руководство администратора</Link>
          </p>
        </Nav>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--secondary__light);
`

const Header = styled.header`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.4);

  background: linear-gradient(
      180deg,
      rgba(21, 89, 142, 0.8) 0%,
      rgba(21, 89, 142, 0) 20.31%,
      rgba(21, 89, 142, 0.8) 100%
    ),
    center / cover no-repeat utl('src/assets/about_back.png');

  height: 400px;
  display: flex;

  justify-content: flex-end;
  align-items: center;
`

const Footer = styled.footer`
  height: 122px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
  background-color: var(--primary__dark);
`

const Body = styled.div`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  padding: 20px 0%;
  height: fit-content;
`

const Logo = styled.p`
  position: ${props => (props.position ? 'relative' : 'absolute')};
  top: ${props => (props.y !== undefined ? props.y + 'px' : '10px')};
  left: ${props => (props.x ? props.x + 'px' : '150px')};
  color: white;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  /* font-family: Revalia; */
  font-size: 18px;
  color: #d8dcdd;
  img {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
`

const SubTitle = styled.h2`
  text-align: center;
`

const Title = styled.h1``

const Text = styled.p`
  line-height: 160%;
  color: #727272;
`

const InfoBlock = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => (props.height ? props.height + 'px' : 'auto')};
  width: 50%;
  color: white;
  margin-right: 5%;

  button {
    width: 140px;
    margin: auto;
    background-color: var(--primary);
  }
`

const Nav = styled.nav`
  color: white;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: var(--primary__dark);
`

const Link = styled.a`
  text-decoration: none;
`

const info = css`
  color: black;
  margin: 20px auto;
`

const about = css`
  color: black;
  margin: 20px auto;
  margin-right: 20%;
  text-align: right;
`

const head_info = css`
  p {
    color: white;
  }
`
