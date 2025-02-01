import { Injectable } from '@angular/core';
import { ApiUrls } from '../api-urls';
import { HttpService } from './http.service';
import { IPostList, IResponse, ITableList, ITableListFilter } from '@vsd-common/lib';

@Injectable()
export class PostService {
  constructor(private httpService: HttpService) {
  }

  async loadPosts(): Promise<IPostList[]> {
    const payload: ITableListFilter = {
      page: 0,
      limit: 100,
    };
    const res = (await this.httpService.postRequest<IResponse<ITableList<IPostList>>>(ApiUrls.POST, payload)) as unknown as ITableList<IPostList>;
    return res.data as IPostList[];
  }
}
