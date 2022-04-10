import { Socket as SocketIO } from 'socket.io';

declare module 'socket.io' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Socket extends SocketIO {
    userName?: string;
  }
}
