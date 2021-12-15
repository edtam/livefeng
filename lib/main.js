import { request } from './request.js'

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

export async function main(key) {
  const map = {
    zw: 'f7f48462-9b13-485b-8101-7b54716411ec',
    xg: '15e02d92-1698-416c-af2f-3e9a872b4d78',
    zx: '7c96b084-60e1-40a9-89c5-682b994fb680',
  }
  const id = map[key]
  if (!id) {
    const msg = Object.keys(map)
    throw new Error(`未匹配到预设值 ${msg}`)
  }

  const { data: playInfo } = await getPlayUrl(id)
  if (playInfo.status !== '0') {
    throw new Error(`获取播放地址出错 ${playInfo.message}`)
  }

  return playInfo.data.live_url
}
