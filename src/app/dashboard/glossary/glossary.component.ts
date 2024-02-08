import { Component, AfterViewInit } from '@angular/core';
import { GlossaryService } from 'src/service/glossary.service';
import { GlossaryContentElement, GlossaryEntry } from 'src/app/shared/models/filetype-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements AfterViewInit {

  glossaryContent: GlossaryEntry[] = [];
  filteredGlossaryContent: GlossaryEntry[] = [];
  searchKeyword: string = '';
  // currentLanguage:any;
  // private sessionStorageSubscription: Subscription;
  currentLanguage: string;
  private languageSubscription: Subscription;

  constructor(private gloss: GlossaryService) {
    
    this.currentLanguage = sessionStorage.getItem('language') || 'en';

    this.languageSubscription = this.gloss.languageChange.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit() {
    this.glossaryContent = this.gloss.getGlossaryContent();
    this.filteredGlossaryContent = [...this.glossaryContent];
  }

  toArray(value: string | string[]): string[] {
    return Array.isArray(value) ? value : [value];
  }

  searchContent() {
    console.log('Search triggered with keyword:', this.searchKeyword);
  
    if (this.searchKeyword.trim() === '') {
      this.filteredGlossaryContent = [...this.glossaryContent];
      return;
    }
  
    const keyword = this.searchKeyword.toLowerCase();
    this.filteredGlossaryContent = this.glossaryContent.filter(entry =>
      entry.title.toLowerCase().includes(keyword) ||
      entry.content.some(element => this.includesIgnoreCase(element.value, keyword))
    );
  }
  
  includesIgnoreCase(value: string | string[], keyword: string): boolean {
    if (Array.isArray(value)) {
      return value.some(item => this.includesIgnoreCase(item, keyword));
    } else {
      return value.toLowerCase().includes(keyword);
    }
  }
  

  highlightMatches(value: string | string[]): string | string[] {
    if (Array.isArray(value)) {
      return value.map(item => this.highlightSingleMatch(item));
    } else {
      return this.highlightSingleMatch(value);
    }
  }
  
  highlightSingleMatch(value: string): string {
    const keyword = this.searchKeyword.toLowerCase();
    const regex = new RegExp(`(${keyword})`, 'gi');
    return value.replace(regex, '<span class="highlight">$1</span>');
  }

  getTitle(entry: GlossaryEntry): string {
    const language = this.currentLanguage.toLowerCase();
    return language === 'ar' && entry.title_ar ? entry.title_ar : entry.title;
  }
  getContent(entry: GlossaryEntry): GlossaryContentElement[] {
    const language = this.currentLanguage.toLowerCase();
    return language === 'ar' && entry.content_ar ? entry.content_ar : entry.content;
  }
    
  
}
