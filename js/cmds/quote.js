export default function(output) {
    let quotes = [
        'I love Chizuru Ichinose',
        'Dit me thang Long',
        'gay asf',
        'lgbtq is life',
        'asb love thight'
    ];
    output.innerHTML += '"' + quotes[Math.floor(Math.random() * quotes.length + 10) % quotes.length] + '"';
}
