/* tslint:disable */
import { Injectable } from '@angular/core';
import { Auth } from '../../models/Auth';
import { Request } from '../../models/Request';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Auth: Auth,
    Request: Request,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
