import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PostService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IPostList, ITableList } from '@vsd-common/lib';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {
  }

  @Post()
  async loadPosts(@Body() payload: TableListDto): Promise<ITableList<IPostList>> {
    try {
      return await this.postService.load(payload);
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

  @Post('manage')
  async managePost(@Body() body: PostDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.postService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updatePostStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.postService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
