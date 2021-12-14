import { request } from './request.js'

async function getLive() {
  const url = '/api/v3/live'
  return await request({
    url,
    params: {
      live_type: 'tv',
      page: '1',
      page_size: '15',
    },
  })
}

async function getPlayUrl(liveId) {
  const url = '/api/v3/hub/live/auth-url'
  return await request({
    url,
    params: {
      live_id: liveId,
      live_qa: 'HD',
    },
  })
}

export async function main(name) {
  const nameMap = {
    zw: '中文',
    xg: '香港',
    zx: '資訊',
  }
  const nameZh = nameMap[name]
  if (!nameZh) {
    const msg = Object.keys(nameMap).join('/')
    throw new Error(`未匹配到预设值 ${msg}`)
  }

  const { data: channels = [] } = await getLive()
  const targetLive = channels.find((i) => i.title.includes(nameZh))
  if (!targetLive) {
    const msg = channels.map((i) => i.title).join('/')
    throw new Error(`未匹配到线上频道 ${msg}`)
  }

  const { data: playInfo } = await getPlayUrl(targetLive._id)
  if (playInfo.status !== '0') {
    throw new Error(`获取播放地址出错 ${playInfo.message}`)
  }

  return playInfo.data.live_url
}
