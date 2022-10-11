import { IsOptional, Length } from 'class-validator';

class VisitorCommentValidator {
  @IsOptional()
  @Length(0, 20)
  public nickname?: string | undefined;

  @Length(4, 20)
  public password!: string;

  @Length(1, 250)
  public description!: string;
}

export default VisitorCommentValidator;
