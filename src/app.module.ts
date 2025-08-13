import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [PrismaModule, FolderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
