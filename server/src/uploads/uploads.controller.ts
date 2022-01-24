import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as AWS from 'aws-sdk'

const BUCKET_NAME = 'deliveryofmad1779'

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    })

    try {
      const objectKey = `${Date.now() + file.originalname}`

      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectKey,
        })
        .promise()

      const image = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectKey}`

      return { image }
    } catch (e) {
      return null
    }
  }
}
