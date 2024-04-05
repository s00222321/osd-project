import { Component, OnInit } from '@angular/core';

// Define the Quote interface
interface Quote {
  text: string;
  author: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quote: Quote | undefined;

  ngOnInit(): void {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then((data: Quote[]) => {
        const dataLength = data.length;
        const randomIndex = Math.floor(Math.random() * dataLength);
        this.quote = this.processQuote(data[randomIndex]);
      })
      .catch(error => console.error('Error fetching quotes:', error));
  }

  processQuote(quote: Quote): Quote {
    const authorParts = quote.author.split(',', 1);
    const authorName = authorParts[0].trim(); 
    return {
      text: quote.text,
      author: authorName
    };
  }
}
