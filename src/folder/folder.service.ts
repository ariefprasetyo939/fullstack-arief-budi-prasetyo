import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FolderService {
  constructor(private prismaService: PrismaService) {}

  async create(createFolderDto: CreateFolderDto) {
    await this.prismaService.folder.create({ 
      data: {
        name: createFolderDto.name,
        parentId: createFolderDto.parentId ?? null
      } 
    });

    return {
      message: 'Folder or subfolder created successfully'
    }
  }

  async findAll() {
    const folders = await this.prismaService.folder.findMany({
      where: {
        parentId: null
      },
      include: {
        parent: true,
        children: true
      }
    });

    return folders.map(f => ({
      ...f,
      id: Number(f.id),
      parentId: f.parentId ? Number(f.parentId) : null
    }));
  }

  async findOne(id: number) {
    const folder =  await this.prismaService.folder.findFirst({
      where: {
        id: id
      },
      include: {
        parent: true,
        children: true
      }
    });

    if(!folder) throw new NotFoundException('Folder not found');

    return folder;
  }

  async update(id: number, updateFolderDto: UpdateFolderDto) {
    await this.prismaService.folder.update({
      where: {
        id: id
      },
      data: {
        name: updateFolderDto.name,
        parentId: updateFolderDto.parentId ?? null
      }
    });

    return {
      message: 'Folder or subfolder updated successfully'
    }
  }

  async remove(id: number) {
    return await this.prismaService.folder.delete({
      where: {
        id: id
      }
    })
  }
}
