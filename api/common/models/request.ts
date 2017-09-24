import {Model} from '@mean-expert/model';
import _ = require('lodash');

/**
 * @module Request
 * @description
 * Write a useful Request Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {},
  remotes: {
    analyzeUrl: {
      accepts: {
        arg: 'args',
        type: 'object',
        required: true,
        http: {source: 'body'}
      },
      returns: {arg: 'report', type: 'object'},
      http: {
        verb: 'post'
      }
    }
  }
})
class Request {
  constructor(public model: any) {
  }

  async analyzeUrl(args: any, next: Function): Promise<any> {
    try {
      let reports = await this.multiUrlAnalysis(args.url);
      let fullReport = _.maxBy(reports, (report: any) => {
        return report.applications.length;
      });
      let requestCreated = await this.model.create({
        report: fullReport,
        url: args.url,
        matchedUrl: fullReport.url,
        client: {}
      });
      next(null, requestCreated);
      return requestCreated;
    } catch (e) {
      return e;
    }
  }

  async checkUrl(url: string): Promise<any> {
    try {
      let report = await this.waWrapper(url);
      console.log(JSON.stringify(report, null, 2));
      return report;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  waWrapper(url: string): Promise<any> {
    return new Promise(function (resolve, reject) {
      const wappalyzer = require('wappalyzer');
      wappalyzer.run([url, '--quiet'], function (report: any, error: any) {
        if (report) {
          let result = JSON.parse(report);
          resolve(result);
        }
        if (error) {
          reject(error);
        }
      });
    });
  }

  async multiUrlAnalysis(url: string): Promise<any> {
    try {
      let trimmedUrl = url.trim().toLowerCase();
      let isHttps = this.isUrlHttps(trimmedUrl);
      let isWww = this.isUrlWww(trimmedUrl);

      let httpsWww = 'https://';
      let httpsWOWww = 'https://';
      let httpWww = 'http://';
      let httpWOWww = 'http://';

      if (isHttps && isWww) {
        // 'https://www.'
        httpsWww = trimmedUrl;
        httpsWOWww = _.clone(trimmedUrl).replace('www.', '');
        httpWww = _.clone(trimmedUrl).replace('https://', 'http://');
        httpWOWww = _.clone(trimmedUrl).replace('https://www.', 'http://www.');
      } else if (isHttps && !isWww) {
        // 'https://'
        httpsWww = _.clone(trimmedUrl).replace('https://', 'https://www.');
        httpsWOWww = trimmedUrl;
        httpWww = _.clone(trimmedUrl).replace('https://', 'http://www.');
        httpWOWww = _.clone(trimmedUrl).replace('https://', 'http://');
      } else if (!isHttps && isWww) {
        // 'http://www.'
        httpsWww = _.clone(trimmedUrl).replace('http://', 'https://');
        httpsWOWww = _.clone(trimmedUrl).replace('http://www.', 'https://');
        httpWww = trimmedUrl;
        httpWOWww = _.clone(trimmedUrl).replace('http://www.', 'http://');
      } else if (!isHttps && !isWww) {
        // 'http://'
        httpsWww = _.clone(trimmedUrl).replace('http://', 'https://www.');
        httpsWOWww = _.clone(trimmedUrl).replace('http://', 'https://');
        httpWww = _.clone(trimmedUrl).replace('http://', 'http://www.');
        httpWOWww = trimmedUrl;
      }
      let fullReport = await Promise.all([
        this.checkUrl(httpsWww),
        this.checkUrl(httpsWOWww),
        this.checkUrl(httpWww),
        this.checkUrl(httpWOWww)
      ]);
      return fullReport;
    } catch (e) {
      return e;
    }
  }

  isUrlHttps(url: string): boolean {
    return url.indexOf('https') === 0;
  }

  isUrlWww(url: string): boolean {
    return url.indexOf('www') === 0;
  }
}

module.exports = Request;
