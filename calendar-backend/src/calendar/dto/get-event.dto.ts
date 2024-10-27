export class GetEventDto {
  constructor(
    public id: string,
    public title: string,
    public notes: string,
    public start: Date,
    public end: Date,
    public userId: string,
  ) {}
}
