import { Pipe, PipeTransform } from '@angular/core';

export interface HighlightedText {
  before: string;
  match: string;
  after: string;
}

@Pipe({ name: 'highlightMatch' })
export class HighlightMatchPipe implements PipeTransform {
  transform(text: string, searchText: string): HighlightedText {
    const start = searchText ? text.toLowerCase().indexOf(searchText.toLowerCase()) : -1;
    if (start === -1) {
      return { before: text, match: '', after: '' };
    }

    const end = start + searchText.length;
    return { before: text.slice(0, start), match: text.slice(start, end), after: text.slice(end) };
  }
}
