export interface IMessage {
  text: string,
  user: string | undefined
}

export interface IRoom{
  users: Array<string>,
  messages: Array<IMessage>
}

