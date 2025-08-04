// blog post class
export default class Post {
  constructor(title, content) {
    this.title = title;     // post title
    this.content = content; // post content
  }

  publish() {
    console.log(`${this.title}\n${this.content}`); // log post
  }
}
