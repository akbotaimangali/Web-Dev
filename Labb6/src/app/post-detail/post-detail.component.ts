import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from "../albums";
import { AlbumService } from "../albums.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Album;
  loaded: boolean;
  newTitle: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {
    this.post = {} as Album;
    this.loaded = false;
    this.newTitle = "";
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const _id = params.get('id');
      if (_id) {
        const id = +_id;
        this.getPost(id);
      }
    });
  }

  getPost(id: number): void {
    this.loaded = false;
    this.albumService.getAlbum(id).subscribe((post) => {
      this.post = post;
      this.loaded = true;
    });
  }

  saveTitle(): void {
    if (!this.newTitle.trim()) return; // Проверка на пустой ввод
    this.albumService.updateAlbum(this.post.id, this.newTitle).subscribe((response) => {
      this.post.title = response.title;
      this.newTitle = "";
    });
  }

  back(): void {
    this.router.navigate(['/albums']);
  }
}
