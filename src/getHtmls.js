import {fs,cheerio,R,S,rp,delay} from '../common'

const getHtmls = async (headers, packageAuthor, packageName, begin) => {
  let uri = `https://github.com/${packageAuthor}/${packageName}/network/dependents`

  let i = begin;

  for (i; true; i++) {
    try {
      if (i > 0) {
        try {
          const prev = fs.readFileSync(`/tmp/github-by-stars/dataset/${packageName}/${i - 1}.html`, { encoding: 'utf-8' })
          const $ = cheerio.load(prev)
          uri = $('div.BtnGroup[data-test-selector="pagination"]').children().last().attr('href')
        } catch (e) {
          // file does not exist. we reached the end.
          console.log('reached end with stars.')

          break;
        }
      }
      if (uri == null) {
        console.log('reached end with uri')
        break
      }

      S.log(`Waiting 5 s`, {})
      await delay(5000)
      const options = {uri, headers, gzip: true}
      S.log(`Fetching`, uri)
      const res = await rp(options)
      S.log(`Writing /tmp/github-by-stars/dataset/${packageName}/${i}.html`, {})
      S.write(`/tmp/github-by-stars/dataset/${packageName}/${i}.html`, res)
    } catch (e) {
      console.log('error fetching. aborting')
    }
  }

  return i
}

export default getHtmls
