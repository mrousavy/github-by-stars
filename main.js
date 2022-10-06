import getHtmls from './src/getHtmls'
import sort from './src/sort'
import {argv} from 'yargs'
import dotenv from 'dotenv'
import { isMainThread } from 'worker_threads';
const result = dotenv.config()

const packageAuthor = argv.author || `mrousavy`
const packageName = argv.name || `react-native-multithreading`

const main = async () => {
  const end = await getHtmls(result, packageAuthor, packageName, 0)
  console.log(`End: ` + end)
  sort(packageName)(end)
}

main()
