export class Result{
  count:number=0;
  correct:number=0;
  incorrect:number=0;
  time_type_id:number=0;
  points:number=0;
  category_id:number=0;
  constructor(model: Partial<Result>) {
    Object.assign(this, model);
  }
}
