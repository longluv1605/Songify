class Movie {
    private id: number;
    private title: string;
    private description: string;
    private releaseYear: number;
    private addedAt: Date;
    private duration: number;
    private directors: string;
    private actors: string;
    private genres: string[];
    private label: string;
    private rating: number;
    private status: string;
    private cover: string;
    private trailer: string;
    private video: string;
    private comments: string[];

    constructor(
        id: number,
        title: string,
        description: string,
        releaseYear: number,
        addedAt: Date,
        duration: number,
        directors: string,
        actors: string,
        genres: string[],
        label: string,
        rating: number,
        status: string,
        cover: string,
        trailer: string,
        video: string,
        comments: string[]
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.releaseYear = releaseYear;
        this.addedAt = addedAt;
        this.duration = duration;
        this.directors = directors;
        this.actors = actors;
        this.genres = genres;
        this.label = label;
        this.rating = rating;
        this.status = status;
        this.cover = cover;
        this.trailer = trailer;
        this.video = video;
        this.comments = comments;
    }

    public getInfo = () => {};

    public play = () => {};
}
