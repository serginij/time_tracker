import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Button } from '@ui'
import { history } from '../../routes'

import icon from '@assets/icon_128.png'
import background from '../../assets/about_back.png'

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
            В настоящее время человек все чаще находится в интернете. Он смотрит
            фильмы, общается, читает новости, учится и работает. В виртуальной
            реальности сложно отслеживать потраченное время, поэтому возникает
            необходимость создания расширения для веб-браузера, контролирующего
            временные затраты. <br />
            <br />
            Мы, как разработчики веб-расширения Limer, хотим помочь нашим
            пользователям в решении проблемы подсчета времени. <br />
            <br />
            Используя наше расширение, пользователь станет не только более
            продуктивным и дисциплинированным, но и будет замотивирован на
            создание и выполнение новых целей для работы, саморазвития и хобби.
          </Text>
          <p className="author">
            <i>
              «Продуктивность – не случайность. Это всегда результат стремления
              к совершенству, разумного планирования и целенаправленных усилий».
              <br />
              <b>Пол Дж. Мейер</b>
            </i>
          </p>
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
    center / cover no-repeat url(${background});

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
  max-width: 650px;

  .author {
    text-align: right;
    color: #727272;
  }

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
  text-align: justify;
`

const head_info = css`
  p {
    color: white;
  }
`
