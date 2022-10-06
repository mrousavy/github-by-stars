import {fs,R,S,cheerio,util} from '../common'

const objs = []

const sort = R.curry((packageName, end) => {
  S.log(`Sorting results... please allow a few minutes`, {})
  R.times((i) => {
    try {
      const res = fs.readFileSync(`/tmp/github-by-stars/dataset/${packageName}/${i}.html`, { encoding: 'utf-8' })
      const $ = cheerio.load(res)
      const els = $(`div.Box > div.Box-row`).toArray()
      els.map(el => {

        const user = $('a[data-hovercard-type="user"]', el).text()
        const org = $('a[data-hovercard-type="organization"]', el).text()
        const author = user || org
        const repo = $('a[data-hovercard-type="repository"]', el).text()
        const repoUrl = `https://github.com` + $('a[data-hovercard-type="repository"]', el).attr('href')

        const inner = $('div[class="d-flex flex-auto flex-justify-end"]', el).text()
        console.log(inner)

        const stars = Number.parseInt(inner.trim())
        const forks = 0

        const a = { author, repo, repoUrl, stars, forks }
        objs.push(a)
        // const aLog = util.inspect(a)
        // S.log(`aLog`, aLog)
      })
    } catch (e) {
      console.error(e)
    }
  }, end)

  const sorted = R.pipe(
    R.uniq,
    R.sortBy(R.prop(`stars`)),
    R.reverse,
    R.slice(0, 10),
    util.inspect,
  )(objs)

  S.log(`sorted`, sorted)
})

export default sort

