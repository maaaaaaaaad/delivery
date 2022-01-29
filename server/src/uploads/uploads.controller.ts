import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { Request } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import * as AWS from 'aws-sdk'
import * as multerS3 from 'multer-s3'
import 'dotenv/config'
import { UsersService } from '../users/users.service'

const s3 = new AWS.S3()
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
})

@Controller('upload')
export class UploadsController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      if (file && 'access_token' in req.headers) {
        console.log(req.headers['access_token'])
      }
      return file['location']
    } catch (e) {
      return null
    }
  }
}
