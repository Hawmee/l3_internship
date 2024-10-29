import { google } from 'googleapis'
import { fileURLToPath } from 'url'
import path from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FOLDER_ID = "10hS0NMimvNhzWNeYf7OJ_AXq5bOPrnAq"

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname,'../../credentials.json'),
    scopes:SCOPES,
})

const drive = google.drive({version:"v3" , auth})

export {drive , FOLDER_ID}