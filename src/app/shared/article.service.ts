import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './article.model'
import { HttpClient } from '@angular/common/http'
import { Guid } from 'guid-typescript';
import { Comment } from './comment.model'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly baseURL = 'http://localhost:26561/api/Article';
  list: Article[];
  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Article[]>
  {
    let articles = this.httpClient.get<Article[]>(this.baseURL);
    return articles;
  }
  getArticle(articleId: Guid):Observable<Article>
  {
    //const url = '${this.baseURL}/${articleId}';
    return this.httpClient.get<Article>(this.baseURL + '/' + articleId);
  }
  getArticlesByTag(tagId: Guid): Observable<Article[]> {
    let articles = this.httpClient.get<Article[]>(this.baseURL + '/GetArticlesByTag/' + tagId);
    return articles;
  }
  AddArticle(article: Article)
  {
    console.log("call AddArticle");
    let userIdArt: string =  article.userId.toString()
    const body = {
  
        title: article.title,
        text: article.text,
        tags: article.tags
    };
    return this.httpClient.post(this.baseURL + '/CreateArticle/' + userIdArt,body);
  }
  EditArticle(article: Article)
  {
    let userIdArt: string = article.userId.toString()
    let id: string = article.id.toString();
    const body = {
  
        title: article.title,
        text: article.text,
        tags: article.tags
    };
    return this.httpClient.put(this.baseURL + '/EditArticle/' + id + '/' + userIdArt,body);
  }
}
