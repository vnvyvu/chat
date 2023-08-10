/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "message";

export interface GetMessage {
  id: number;
}

export interface Message {
  id: number;
  content: string;
  embedPath: string;
  userId: number;
  channelId: number;
}

export const MESSAGE_PACKAGE_NAME = "message";

export interface MessageServiceClient {
  get(request: GetMessage): Observable<Message>;
}

export interface MessageServiceController {
  get(request: GetMessage): Promise<Message> | Observable<Message> | Message;
}

export function MessageServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MESSAGE_SERVICE_NAME = "MessageService";
