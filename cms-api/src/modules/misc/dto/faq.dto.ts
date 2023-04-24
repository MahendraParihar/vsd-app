import {BasicSearchDto} from "../../../common-dto/basic-input.dto";

export class FaqSearchDto extends BasicSearchDto {
  name?: string;
  categoryIds?: string;
}

export class CreateFaqDto {

}
