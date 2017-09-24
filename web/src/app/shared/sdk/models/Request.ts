/* tslint:disable */

declare var Object: any;
export interface RequestInterface {
  "client"?: any;
  "email"?: string;
  "url": string;
  "matchedUrl": string;
  "report"?: any;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Request implements RequestInterface {
  "client": any = <any>null;
  "email": string = '';
  "url": string = '';
  "matchedUrl": string = '';
  "report": any = <any>null;
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  constructor(data?: RequestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Request`.
   */
  public static getModelName() {
    return "Request";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Request for dynamic purposes.
  **/
  public static factory(data: RequestInterface): Request{
    return new Request(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Request',
      plural: 'Requests',
      path: 'Requests',
      properties: {
        "client": {
          name: 'client',
          type: 'any'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "matchedUrl": {
          name: 'matchedUrl',
          type: 'string'
        },
        "report": {
          name: 'report',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
