import { Component, OnInit } from '@angular/core';
import { Album } from '../albums';
import { AlbumService } from '../albums.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Album[] = [];
  newPost: Album = {} as Album;
  loaded: boolean = false;

  constructor(private albumsService: AlbumService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.loaded = false;
    this.albumsService.getAlbums().subscribe((posts) => {
      this.posts = posts;
      this.loaded = true;
    });
  }

  addPost(): void {
    if (!this.newPost.title) return;
    this.loaded = false;
    this.albumsService.addAlbum(this.newPost).subscribe((post) => {
      this.posts.unshift(post);
      this.loaded = true;
      this.newPost = {} as Album;
    });
  }

  deleteAlbum(id: number): void {
    this.albumsService.deleteAlbum(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }
}
