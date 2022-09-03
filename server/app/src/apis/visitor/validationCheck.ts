import { Length } from 'class-validator';

class VisitorCmtDtoValidation {
  @Length(0, 20)
  public nickname!: string | undefined;

  @Length(4, 20)
  public password!: string;

  @Length(1, 250)
  public description!: string;
}

class UpdateValidation {
  @Length(4, 20)
  public password!: string;

  @Length(1, 250)
  public description!: string;
}

export { UpdateValidation, VisitorCmtDtoValidation };
