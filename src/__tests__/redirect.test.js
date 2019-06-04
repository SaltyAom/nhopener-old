import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import axiosMock from 'axios'
import Redirect from '../react/pages/redirect'
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(cleanup)

test('fetch hentai data', async () => {
  const url = '/redirect/229345'
  const { getByText, getByTestId } = render(<Router><Redirect url={url} /></Router>)

  axiosMock.get.mockResolvedValueOnce({
    data: {"id":"229345","media_id":"1207205","title":{"english":"[R*kaffy (Aichi Shiho)] Kimi wa Kawaii Boku dake no Idol | 你就是只属于我的可愛偶像 [Chinese] [瑞树汉化组] [Digital]","japanese":"[アールカフィ (あいち志保)] 君はかわいい僕だけのアイドル [中国翻訳] [DL版]","pretty":"Kimi wa Kawaii Boku dake no Idol | 你就是只属于我的可愛偶像"},"images":{"pages":[{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/1.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/2.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/3.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/4.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/5.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/6.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/7.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/8.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/9.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/10.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/11.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/12.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/13.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/14.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/15.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/16.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/17.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/18.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/19.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/20.jpg"},{"t":"j","w":1280,"h":1851,"src":"https://i.nhentai.net/galleries/1207205/21.jpg"},{"t":"j","w":700,"h":932,"src":"https://i.nhentai.net/galleries/1207205/22.jpg"}],"cover":{"t":"j","w":350,"h":506,"src":"https://t.nhentai.net/galleries/1207205/cover.jpg"},"thumbnail":{"t":"j","w":250,"h":362}},"scanlator":"","upload_date":1522921264,"tags":[{"id":6532,"type":"group","name":"rkaffy","url":"/group/rkaffy/","count":90},{"id":14283,"type":"tag","name":"anal","url":"/tag/anal/","count":48508},{"id":15782,"type":"tag","name":"crossdressing","url":"/tag/crossdressing/","count":9808},{"id":17249,"type":"language","name":"translated","url":"/language/translated/","count":76728},{"id":21712,"type":"tag","name":"males only","url":"/tag/males-only/","count":15503},{"id":23895,"type":"tag","name":"yaoi","url":"/tag/yaoi/","count":21211},{"id":29023,"type":"tag","name":"tomgirl","url":"/tag/tomgirl/","count":6042},{"id":29963,"type":"language","name":"chinese","url":"/language/chinese/","count":26010},{"id":30119,"type":"artist","name":"aichi shiho","url":"/artist/aichi-shiho/","count":136},{"id":32341,"type":"tag","name":"shotacon","url":"/tag/shotacon/","count":30243},{"id":33172,"type":"category","name":"doujinshi","url":"/category/doujinshi/","count":171289},{"id":50390,"type":"tag","name":"josou seme","url":"/tag/josou-seme/","count":439}],"num_pages":22,"num_favorites":460,"success":true}
  })

  fireEvent.click(getByText('Load Greeting'))

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
})