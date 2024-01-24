import { SetMetadata } from '@nestjs/common'

export const Public = (isPublic = true) => SetMetadata('isPublic', isPublic)
