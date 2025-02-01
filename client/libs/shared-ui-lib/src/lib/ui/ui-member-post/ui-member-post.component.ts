import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IMemberPost, IPostList, LabelKey } from '@vsd-common/lib';
import { LabelService, PostService } from '@vsd-frontend/core-lib';

@Component({
  selector: 'vsd-ui-member-post-form',
  templateUrl: './ui-member-post.component.html',
  styleUrl: './ui-member-post.component.scss',
})
export class UiMemberPostComponent implements OnInit {

  protected readonly LabelKey = LabelKey;
  _membersPost!: IMemberPost[];

  @Input()
  formGroup!: FormGroup;

  posts!: IPostList[];

  @Input() set membersPost(linkList: IMemberPost[]) {
    this._membersPost = linkList;
    this.bindMembersPost();
  }

  membersPostFormArray = new FormArray([]);
  membersPostFormGroup = new FormGroup({
    membersPost: this.membersPostFormArray,
  });


  constructor(public labelService: LabelService,
              private postService: PostService) {
  }

  async ngOnInit() {
    this.posts = await this.postService.loadPosts();
    this.formGroup.addControl('membersPost', this.membersPostFormGroup);
  }

  bindMembersPost() {
    if (!this._membersPost || this._membersPost.length === 0) {
      return;
    }
    for (const s of this._membersPost) {
      this.addMemberPost(s);
    }
  }

  memberPostFormGroup(obj: IMemberPost | null): FormGroup {
    return new FormGroup({
      postId: new FormControl(obj ? obj.postId : null, [Validators.required]),
      familyIds: new FormControl(obj ? obj.familyIds : null, [Validators.required]),
    });
  }

  get memberPostFormArray() {
    return this.membersPostFormGroup.get('membersPost') as FormArray;
  }

  addMemberPost(obj: IMemberPost | null) {
    this.memberPostFormArray.push(this.memberPostFormGroup(obj));
  }

  removeMemberPost(index: number) {
    this.memberPostFormArray.removeAt(index);
  }

  onFamilyChange(event: { id: number; title: string, subTitle: string }[], index: number): void {
    if (event && event.length > 0) {
      const s = this.memberPostFormArray.value;
      // s[index].recipeIds = map(event, 'id');
      // this.memberPostFormArray().patchValue(s);
    }
  }
}
