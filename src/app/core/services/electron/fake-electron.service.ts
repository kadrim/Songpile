import { Subject } from 'rxjs';

class Channel {
  constructor(public name: string, public listener: (arg0: object, ...args) => void) { }
}

export class Message {
  channel: string;
  params?: any[];
}

export class FakeElectronService {
  channelSource = new Subject<Message>();

  ipcRenderer = {
    on: (name: string, listener: () => void) => {
      this.channels.push(new Channel(name, listener));
    },
    once: (name: string, listener: () => void) => {
      this.channels.push(new Channel(name, listener));
    },
    send: (channel: string, args: string) => { }
  };

  private channels: Channel[] = [];

  constructor() {
    this.channelSource.subscribe(msg => {
      this.channels.find(channel => channel.name === msg.channel).listener({}, ...msg.params);
    });
  }
}
