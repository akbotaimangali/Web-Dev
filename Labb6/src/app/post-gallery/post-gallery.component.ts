import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from "../albums";
import { AlbumService } from "../albums.service";

@Component({
  selector: 'app-post-gallery',
  templateUrl: './post-gallery.component.html',
  styleUrls: ['./post-gallery.component.css']
})
export class PostGalleryComponent implements OnInit {
  gallery: Gallery[] = [];
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, private albumService: AlbumService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const _id = params.get('id');
      if (_id) {
        const id = +_id;
        this.getGallery(id);
      }
    });
  }

  getGallery(id: number): void {
    this.loaded = false;
    this.albumService.getPhotos(id).subscribe((photos) => {
      this.gallery = photos;
      this.loaded = true;
    });
  }
}
