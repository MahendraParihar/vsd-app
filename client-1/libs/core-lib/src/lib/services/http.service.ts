import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient,
              private errorService: ErrorHandlerService) {
  }

  async getRequest<T>(url: string, paramObj?: Map<string, string>, header?: { [key: string]: string }): Promise<T> {
    try {
      url = this.createUrlWithQueryString(url, paramObj);
      if (header) {
        return await lastValueFrom(
          this.httpClient.get<T>(url, {
            headers: new HttpHeaders(header),
          }),
        );
      }
      return await lastValueFrom(this.httpClient.get<T>(url));
    } catch (e: any) {
      this.errorService.handleError(e);
      return this.returnNull();
    }
  }

  async postRequest<T>(url: string, payload: unknown, header?: { [key: string]: string }): Promise<T> {
    try {
      if (header) {
        return await lastValueFrom(
          this.httpClient.post<T>(url, payload, {
            headers: new HttpHeaders(header),
          }),
        );
      }
      return await lastValueFrom(this.httpClient.post<T>(url, payload));
    } catch (e: any) {
      this.errorService.handleError(e);
      return this.returnNull();
    }
  }

  public returnNull(): any {
    return null;
  }

  async deleteRequest<T>(url: string): Promise<T> {
    try {
      return await lastValueFrom(this.httpClient.delete<T>(url));
    } catch (e: any) {
      this.errorService.handleError(e);
      return this.returnNull();
    }
  }

  async patchRequest(url: string, payload: unknown) {
    try {
      return await lastValueFrom(this.httpClient.patch(url, payload));
    } catch (e: any) {
      this.errorService.handleError(e);
      return this.returnNull();
    }
  }

  async putRequest(url: string, payload: unknown) {
    try {
      return await lastValueFrom(this.httpClient.put(url, payload));
    } catch (e: any) {
      this.errorService.handleError(e);
      return this.returnNull();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async formDataRequest(url: string, payload: unknown): Promise<any> {
    const req = new HttpRequest('POST', url, payload, {
      reportProgress: true,
      responseType: 'json',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await lastValueFrom(this.httpClient.request<any>(req));
  }

  /**
   * Convert JsonObject to url  query string
   * @param url
   * @param paramObj
   * @returns
   */
  createUrlWithQueryString(url: string, paramObj?: Map<string, string>): string {
    if (paramObj) {
      const params = new URLSearchParams();
      for (const [key, value] of paramObj) {
        params.set(key, value);
      }
      return `${url}?${params.toString()}`;
    }
    return url;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public uploadMedia(url: string, formData: FormData): Observable<any> {
    return this.httpClient.post(url, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getRequestObservable<T>(
    url: string,
    paramObj?: Map<string, string>,
    header?: { [key: string]: string },
  ): Observable<T> {
    url = this.createUrlWithQueryString(url, paramObj);
    return this.httpClient.get<T>(url, {
      headers: new HttpHeaders(header),
    });
  }
}
