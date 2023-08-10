/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "channel";

export interface GetChannel {
  id: number;
}

export interface Channel {
  id: number;
  title: string;
  avatarPath: string;
  channelInvitationCode: string;
}

export const CHANNEL_PACKAGE_NAME = "channel";

export interface ChannelServiceClient {
  get(request: GetChannel): Observable<Channel>;
}

export interface ChannelServiceController {
  get(request: GetChannel): Promise<Channel> | Observable<Channel> | Channel;
}

export function ChannelServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ChannelService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ChannelService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CHANNEL_SERVICE_NAME = "ChannelService";
