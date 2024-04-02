import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastsComponent } from './podcasts.component';

describe('PodcastsComponent', () => {
  let component: PodcastsComponent;
  let fixture: ComponentFixture<PodcastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PodcastsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PodcastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
