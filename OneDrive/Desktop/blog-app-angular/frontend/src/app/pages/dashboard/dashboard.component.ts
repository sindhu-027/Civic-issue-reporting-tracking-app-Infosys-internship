import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  posts:Post[] = [];
  newPost: Partial<Post> = {title: '', content:''}

  constructor(private postService: PostService){}

  ngOnInit(): void {
      this.loadPosts();
  }

  loadPosts(){
    this.postService.getPosts()
    .subscribe({
      next:(data)=>{
        this.posts = data;
      },
      error:(err)=>{
        console.error('Error Loading posts: ', err);
      }
    })
  }

  addPost(form:NgForm){
    if(form.valid){
      this.postService.addPost(this.newPost)
      .subscribe({
        next:(post)=>{
          this.posts.push(post);
          form.reset();
        },
        error: (err)=>{
          console.error('Error adding post:', err);
        }
      });
    }
  }


  editPost(post: Post){
    const updatedContent = prompt('Edit content:', post.content);
    if(updatedContent!==null){
      this.postService.updatePost(post.id, {content: updatedContent})
      .subscribe({
        next:()=>{
          post.content = updatedContent;
        },
        error: (err)=>{
          console.log('Error uploading post', err)
        }
      })
    }
  }


  deletePost(postId:number){
    if(confirm('Are you sure you want to delete this post?')){
      this.postService.deletePost(postId)
      .subscribe({
        next:()=>{
          this.posts = this.posts.filter((p: any)=>p.id!==postId)
        },
        error:(err)=>{
          console.error('Error Deleting post:', err);
        }
      })
    }
  }
}