import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PostService, TableListDto, StatusChangeDto } from '@server/common';
import { IPostList, ITableList } from '@vsd-common/lib';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {
  }

  @Post()
  loadPosts(@Body() payload: TableListDto): Promise<ITableList<IPostList>> {
    try {
      return this.postService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadPost(@Param('id') id: number) {
    try {
      return this.postService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadPostDetail(@Param('id') id: number) {
    try {
      return this.postService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  managePost(@Body() body: PostDto, userId: number) {
    try {
      return this.postService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updatePostStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.postService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
