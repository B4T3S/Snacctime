import { RecordModel } from 'pocketbase'

export class ItemDto {
  public name: string = ''
  public price: number = 0
  public imageUrl: string = ''
  public category: string = ''

  private record: RecordModel | undefined = undefined

  public constructor(record: RecordModel) {
    if (record['collectionName'] !== 'articles') {
      throw new Error('Wrong model passed to ItemDto constructor!')
    }

    this.record = record
    this.name = record['name']
    this.price = record['price']
    this.category = record['category']
  }
}
