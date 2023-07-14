import { Component, Input } from '@angular/core';
import { getObjectName, getPreview, getType, getValuePreview } from './utils';

const JSONFormatterConfig = {
  hoverPreviewEnabled: false,
  hoverPreviewArrayCount: 100,
  hoverPreviewFieldCount: 5
};

//https://embed.plnkr.co/lKOhfqp0PKHATlQYRpf8/
@Component({
  selector: 'app-json-formatter',
  template: `
  <div class="json-formatter-row">
    <div (click)="toggleOpen()" style="width: 100%;overflow-wrap: initial;">
      <span class="toggler" [class.open]="isOpen" *ngIf="isObject"></span>
      <span class="key" *ngIf="hasKey"><span class="key-text">{{key}}</span><span class="colon">:</span></span>
      <span class="value">
      <span *ngIf="isObject">
        <span class="constructor-name">{{ constructorName }}</span>
        <span *ngIf="isArray"><span class="bracket">[</span><span class="number">{{json.length}}</span><span
          class="bracket">]</span></span>
      </span>
      <span *ngIf="!isObject" (click)="openLink(isUrl)" class="{{type}}"
            [ngClass]="{date: isDate, url: isUrl}">{{parseValue(json)}}</span>
      </span>
      <span *ngIf="showThumbnail()" class="thumbnail-text">
      {{getThumbnail()}}
    </span>
    </div>
    <div class="children" *ngIf="keys?.length && isOpen">
      <app-json-formatter *ngFor="let key of keys; trackBy: trackByFn" [json]="json[key]" [key]="key"
      [open]="childrenOpen()"></app-json-formatter>
    </div>
    <div class="children empty object" *ngIf="isEmptyObject()"></div>
    <div class="children empty array" *ngIf="!keys?.length && isOpen && isArray"></div>
  </div>
`,
  styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent {
  @Input() json: any;
  @Input() key: any;
  @Input() open: number;

  isArray: any;
  isObject: any;
  isUrl: any;
  isDate: any;
  type: any;

  hasKey: any;
  keys: any; 
  isOpen: any;
  constructorName: string;

  ngOnInit() {
    this.isArray = Array.isArray(this.json);
    this.isObject = this.json != null && typeof this.json === 'object';
    this.type = getType(this.json);
    this.hasKey = typeof this.key !== 'undefined';
    this.isOpen = this.open && this.open > 0

    this.constructorName = getObjectName(this.json);
    if (this.isObject) {
      this.keys = Object.keys(this.json).map((key) => key === '' ? '""' : key);
    }
    if (this.type === 'string') {
      if ((new Date(this.json)).toString() !== 'Invalid Date') {
        this.isDate = true;
      }
      if (this.json.indexOf('http') === 0) {
        this.isUrl = true;
      }
    }
  }

  isEmptyObject() {
    return this.keys && !this.keys.length && this.isOpen && !this.isArray;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  childrenOpen() {
    return this.open > 1 ? this.open - 1 : 0;
  }

  openLink(isUrl: any) {
    if (isUrl) {
      window.location.href = this.json;
    }
  }

  parseValue(value: any) {
    return getValuePreview(this.json, value);
  }

  showThumbnail() {
    return this.isObject && !this.isOpen;
  }

  getThumbnail() {
    if (this.isArray) {
      // if array length is greater then 100 it shows "Array[101]"
      if (this.json.length > JSONFormatterConfig.hoverPreviewArrayCount) {
        return 'Array[' + this.json.length + ']';
      } else {
        return '[' + this.json.map(getPreview).join(', ') + ']';
      }
    } else {
      // the first five keys (like Chrome Developer Tool)
      const narrowKeys = this.keys.slice(0, JSONFormatterConfig.hoverPreviewFieldCount);
      // json value schematic information
      const kvs = narrowKeys.map((key:any) => key + ':' + getPreview(this.json[key]));

      // if keys count greater then 5 then show ellipsis
      const ellipsis = this.keys.length >= 5 ? '…' : '';

      let tmp =  '{' + kvs.join(', ') + ellipsis + '}';
      return tmp.length < 50 ? tmp : tmp.substring(0, 50);
    }
  }

  trackByFn(i:any) {
    return i;
  }
}
