import { Cognito } from "../entities/cognito";

export class CognitoMapper {
  public static mapperCognito(data: any): Cognito | null {
    let option: Cognito | null = null;
    if (data) {
      option = {
        statusCode: data.statusCode,
        timestamp: data.timestamp,
        epochtime: data.epochtime,
        path: data.path,
        scope: data.scope,
        message: data.message
      };
    }
    return option;
  }

  public static mapperInfoCognito(data: any): Cognito | null {
    return this.mapperCognito(data);
  }

}
