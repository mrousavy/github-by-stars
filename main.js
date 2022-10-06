import getHtmls from './src/getHtmls'
import sort from './src/sort'
import {argv} from 'yargs'
import dotenv from 'dotenv'
import { isMainThread } from 'worker_threads';
const result = dotenv.config()

const packageAuthor = argv.author || `mrousavy`
const packageName = argv.name || `react-native-mmkv`
const begin = argv.begin || 0
const end = argv.end || 100

const main = async () => {
  await getHtmls(result)(packageAuthor)(packageName)(begin)(end)
  sort(packageName)(end)
}

main()
