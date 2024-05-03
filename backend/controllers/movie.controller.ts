import Database from "../database/database";
import { Request, Response } from "express";

class MovieController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getMovieData = async (req: Request, res: Response) => {
        try {
            const movie = await this.getMovie(req, res);
            const comments = await this.getComments(req, res);

            return res.status(200).json({ movie, comments });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }

    private getMovie = async (req: Request, res: Response) => {
        try {
            const movieId: number = parseInt(req.params.id);
            const sql: string = `SELECT m.*, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING id = ?`;
            // const data = await this.db.query(sql, [movieId]);

            const data = [
                {
                    id: 1,
                    title: "Toy Story",
                    description:
                        "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
                    release_year: 1995,
                    added_at: "2024-04-26",
                    duration: 81,
                    directors: "John Lasseter",
                    actors: "Tom Hanks, Tim Allen, Don Rickles, Jim Varney, Wallace Shawn, John Ratzenberger, Annie Potts, John Morris, Erik von Detten, Laurie Metcalf, R. Lee Ermey, Sarah Freeman, Penn Jillette, Jack Angel, Spencer Aste, Greg Berg, Lisa Bradley, Kendall Cunningham, Debi Derryberry, Cody Dorkin, Bill Farmer, Craig Good, Gregory Grudt, Danielle Judovits, Sam Lasseter, Brittany Levenbrown, Sherry Lynn, Scott McAfee, Mickie McGowan, Ryan ODonohue, Jeff Pidgeon, Patrick Pinney, Phil Proctor, Jan Rabson, Joe Ranft, Andrew Stanton, Shane Sweet, John Lasseter, Jonathan Benair, Anthony Burch, Tracy Fraim",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Adventure, Animation, Comedy, Family",
                    average_rating: 3.8,
                },
            ];

            return data;
        } catch (err) {
            console.log(err);
        }
    };


    private getComments = async (req: Request, res: Response) => {
        try {
            const movieId: number = parseInt(req.params.id);
            const sql: string = `SELECT cmt.date, cmt.detail, u.first_name, u.last_name
                                    FROM comment cmt
                                    LEFT JOIN user u ON cmt.user_id = u.id
                                    WHERE cmt.movie_id = ?
                                    ORDER BY cmt.date DESC`;
            // const data = await this.db.query(sql, [movieId]);

            const data = 	[
                {
                    "date": "2024-05-03",
                    "detail": "test",
                    "first_name": "John",
                    "last_name": "Doe"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 441601",
                    "first_name": "Ronald",
                    "last_name": "Mcfarland"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 228354",
                    "first_name": "Christine",
                    "last_name": "Shaw"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 311812",
                    "first_name": "Amy",
                    "last_name": "Ruiz"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 181510",
                    "first_name": "Cory",
                    "last_name": "Davis"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 337416",
                    "first_name": "Jorge",
                    "last_name": "Medina"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 97544",
                    "first_name": "Molly",
                    "last_name": "Sanchez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 60168",
                    "first_name": "Ronald",
                    "last_name": "Franklin"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 15114",
                    "first_name": "Benjamin",
                    "last_name": "Meza"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 25611",
                    "first_name": "Justin",
                    "last_name": "Yates"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 19724",
                    "first_name": "Xavier",
                    "last_name": "Robertson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 417036",
                    "first_name": "Benjamin",
                    "last_name": "Friedman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 130060",
                    "first_name": "Erin",
                    "last_name": "Barrera"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 144653",
                    "first_name": "Hayden",
                    "last_name": "Ross"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 193807",
                    "first_name": "Edwin",
                    "last_name": "Garza"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 21520",
                    "first_name": "Leonard",
                    "last_name": "Cook"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 450064",
                    "first_name": "Dean",
                    "last_name": "Parsons"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 262929",
                    "first_name": "David",
                    "last_name": "Aguilar"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 483345",
                    "first_name": "Mike",
                    "last_name": "Shelton"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 45586",
                    "first_name": "James",
                    "last_name": "Bauer"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 258582",
                    "first_name": "Alan",
                    "last_name": "Newman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 2584",
                    "first_name": "Erica",
                    "last_name": "Porter"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 461336",
                    "first_name": "Meredith",
                    "last_name": "Morales"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 80920",
                    "first_name": "Latasha",
                    "last_name": "Elliott"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 471322",
                    "first_name": "Michaela",
                    "last_name": "Thompson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 209946",
                    "first_name": "Evelyn",
                    "last_name": "Johnston"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 173595",
                    "first_name": "James",
                    "last_name": "Beck"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 69148",
                    "first_name": "Ronald",
                    "last_name": "Robertson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 347164",
                    "first_name": "Maria",
                    "last_name": "Avila"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 187677",
                    "first_name": "Debra",
                    "last_name": "Andrews"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 320797",
                    "first_name": "Lawrence",
                    "last_name": "Holt"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 322333",
                    "first_name": "Zachary",
                    "last_name": "Craig"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 453406",
                    "first_name": "Adrian",
                    "last_name": "Stanley"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 370975",
                    "first_name": "Justin",
                    "last_name": "Barr"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 356643",
                    "first_name": "Luke",
                    "last_name": "Harris"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 109091",
                    "first_name": "Michelle",
                    "last_name": "Mccoy"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 39204",
                    "first_name": "Paula",
                    "last_name": "Buchanan"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 342823",
                    "first_name": "Lindsay",
                    "last_name": "Cook"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 69160",
                    "first_name": "Jim",
                    "last_name": "Bell"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 309288",
                    "first_name": "Jesse",
                    "last_name": "Stevenson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 224809",
                    "first_name": "William",
                    "last_name": "Houston"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 421417",
                    "first_name": "Brittany",
                    "last_name": "Santiago"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 399658",
                    "first_name": "Erin",
                    "last_name": "Newman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 207148",
                    "first_name": "Jose",
                    "last_name": "Greene"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 158764",
                    "first_name": "Andrea",
                    "last_name": "Figueroa"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 100140",
                    "first_name": "Shawna",
                    "last_name": "Wise"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 265773",
                    "first_name": "Ana",
                    "last_name": "Mullins"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 88621",
                    "first_name": "Anna",
                    "last_name": "Arias"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 41773",
                    "first_name": "Nicholas",
                    "last_name": "White"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 121646",
                    "first_name": "Keith",
                    "last_name": "Booker"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 285743",
                    "first_name": "Jonathan",
                    "last_name": "Wang"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 293424",
                    "first_name": "Daisy",
                    "last_name": "Arnold"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 487985",
                    "first_name": "Philip",
                    "last_name": "Whitaker"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 30513",
                    "first_name": "Vincent",
                    "last_name": "Golden"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 169009",
                    "first_name": "Claudia",
                    "last_name": "Wise"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 41009",
                    "first_name": "Alexander",
                    "last_name": "Flowers"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 410930",
                    "first_name": "Amanda",
                    "last_name": "Odom"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 161330",
                    "first_name": "Jeanne",
                    "last_name": "Cook"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 499252",
                    "first_name": "Brandon",
                    "last_name": "Perkins"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 460343",
                    "first_name": "Caitlin",
                    "last_name": "Webster"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 413241",
                    "first_name": "Margaret",
                    "last_name": "Ibarra"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 172857",
                    "first_name": "Sara",
                    "last_name": "Farrell"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 42553",
                    "first_name": "Robert",
                    "last_name": "Roberts"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 326201",
                    "first_name": "Chris",
                    "last_name": "Mosley"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 498234",
                    "first_name": "Garrett",
                    "last_name": "Chen"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 138555",
                    "first_name": "Kim",
                    "last_name": "Bates"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 38204",
                    "first_name": "Julie",
                    "last_name": "Carney"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 174141",
                    "first_name": "Wesley",
                    "last_name": "Holmes"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 339518",
                    "first_name": "Breanna",
                    "last_name": "Velazquez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 407358",
                    "first_name": "Kelsey",
                    "last_name": "Carter"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 40254",
                    "first_name": "Lynn",
                    "last_name": "Adams"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 28992",
                    "first_name": "Madison",
                    "last_name": "Hickman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 195392",
                    "first_name": "Mary",
                    "last_name": "Jefferson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 296257",
                    "first_name": "Clinton",
                    "last_name": "Martinez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 43842",
                    "first_name": "Melvin",
                    "last_name": "Lawrence"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 150595",
                    "first_name": "Ruben",
                    "last_name": "Nash"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 31299",
                    "first_name": "Leslie",
                    "last_name": "Riddle"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 361539",
                    "first_name": "Krista",
                    "last_name": "Wilson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 430404",
                    "first_name": "Anthony",
                    "last_name": "Coleman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 180037",
                    "first_name": "Thomas",
                    "last_name": "Hancock"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 254021",
                    "first_name": "Christine",
                    "last_name": "Gordon"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 262726",
                    "first_name": "Shawn",
                    "last_name": "Clements"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 10054",
                    "first_name": "Julian",
                    "last_name": "Williams"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 411462",
                    "first_name": "Isabella",
                    "last_name": "Doyle"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 182342",
                    "first_name": "Garrett",
                    "last_name": "Vance"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 406343",
                    "first_name": "Julie",
                    "last_name": "Massey"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 487753",
                    "first_name": "Megan",
                    "last_name": "Hogan"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 39753",
                    "first_name": "Michael",
                    "last_name": "Garcia"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 112459",
                    "first_name": "Julia",
                    "last_name": "Jones"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 149068",
                    "first_name": "Deborah",
                    "last_name": "Castro"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 427342",
                    "first_name": "Ricky",
                    "last_name": "Bullock"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 177998",
                    "first_name": "Bryan",
                    "last_name": "Bartlett"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 115534",
                    "first_name": "Nathaniel",
                    "last_name": "Kennedy"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 211023",
                    "first_name": "Brian",
                    "last_name": "Lozano"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 308048",
                    "first_name": "Kelsey",
                    "last_name": "Olson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 313936",
                    "first_name": "Amber",
                    "last_name": "Cruz"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 197713",
                    "first_name": "Jimmy",
                    "last_name": "Wang"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 419155",
                    "first_name": "Sheila",
                    "last_name": "Collier"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 415573",
                    "first_name": "Jacqueline",
                    "last_name": "Montoya"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 404566",
                    "first_name": "Brian",
                    "last_name": "Burns"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 288342",
                    "first_name": "Alexis",
                    "last_name": "Johnson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 78167",
                    "first_name": "Scott",
                    "last_name": "Estrada"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 416345",
                    "first_name": "Anne",
                    "last_name": "Calhoun"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 142683",
                    "first_name": "Sherry",
                    "last_name": "Mcdonald"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 434012",
                    "first_name": "Martin",
                    "last_name": "Wright"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 60765",
                    "first_name": "Darren",
                    "last_name": "Perez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 219742",
                    "first_name": "Xavier",
                    "last_name": "Krause"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 447073",
                    "first_name": "Pamela",
                    "last_name": "Frederick"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 343394",
                    "first_name": "Zachary",
                    "last_name": "Horne"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 283234",
                    "first_name": "George",
                    "last_name": "Price"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 463460",
                    "first_name": "Sandra",
                    "last_name": "Murphy"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 144740",
                    "first_name": "Edgar",
                    "last_name": "Gonzalez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 422501",
                    "first_name": "Brittany",
                    "last_name": "Le"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 185191",
                    "first_name": "Amanda",
                    "last_name": "Andrews"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 226409",
                    "first_name": "Stephanie",
                    "last_name": "Park"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 33385",
                    "first_name": "Paul",
                    "last_name": "Cummings"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 82026",
                    "first_name": "Richard",
                    "last_name": "Lam"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 110954",
                    "first_name": "Johnathan",
                    "last_name": "Phillips"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 77419",
                    "first_name": "Patricia",
                    "last_name": "Todd"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 473971",
                    "first_name": "Brianna",
                    "last_name": "Chapman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 479092",
                    "first_name": "Sean",
                    "last_name": "Huerta"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 140661",
                    "first_name": "John",
                    "last_name": "Curtis"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 96117",
                    "first_name": "Jonathan",
                    "last_name": "Saunders"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 296566",
                    "first_name": "Peggy",
                    "last_name": "Baldwin"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 77176",
                    "first_name": "Billy",
                    "last_name": "Hanson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 354425",
                    "first_name": "Cathy",
                    "last_name": "Bailey"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 340346",
                    "first_name": "Phillip",
                    "last_name": "Hutchinson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 492158",
                    "first_name": "Steve",
                    "last_name": "Reed"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 249470",
                    "first_name": "Mario",
                    "last_name": "Osborn"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 483967",
                    "first_name": "Anne",
                    "last_name": "Zamora"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 361599",
                    "first_name": "Sara",
                    "last_name": "Mckenzie"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 382335",
                    "first_name": "Robert",
                    "last_name": "Marsh"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 385",
                    "first_name": "Derek",
                    "last_name": "Aguirre"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 15490",
                    "first_name": "Denise",
                    "last_name": "Newman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 268931",
                    "first_name": "Kelly",
                    "last_name": "Villegas"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 494980",
                    "first_name": "Joseph",
                    "last_name": "Davila"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 334981",
                    "first_name": "Crystal",
                    "last_name": "Rasmussen"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 278661",
                    "first_name": "Karen",
                    "last_name": "Boyle"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 278917",
                    "first_name": "Bradley",
                    "last_name": "Sanchez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 84357",
                    "first_name": "Tiffany",
                    "last_name": "Morton"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 257669",
                    "first_name": "Drew",
                    "last_name": "Acevedo"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 327814",
                    "first_name": "Cory",
                    "last_name": "Reed"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 426887",
                    "first_name": "Matthew",
                    "last_name": "Gill"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 363655",
                    "first_name": "Carlos",
                    "last_name": "Martin"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 136073",
                    "first_name": "Scott",
                    "last_name": "Reed"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 437129",
                    "first_name": "Amy",
                    "last_name": "Cuevas"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 422282",
                    "first_name": "Rebecca",
                    "last_name": "Jacobs"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 304523",
                    "first_name": "Greg",
                    "last_name": "Booth"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 55435",
                    "first_name": "Ernest",
                    "last_name": "Jones"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 438157",
                    "first_name": "Amanda",
                    "last_name": "Sloan"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 227727",
                    "first_name": "Amanda",
                    "last_name": "Petty"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 234896",
                    "first_name": "Kara",
                    "last_name": "Bell"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 233105",
                    "first_name": "Sandra",
                    "last_name": "Luna"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 449681",
                    "first_name": "Jonathan",
                    "last_name": "Bradley"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 70290",
                    "first_name": "Scott",
                    "last_name": "Chandler"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 343955",
                    "first_name": "Lynn",
                    "last_name": "Dickson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 157587",
                    "first_name": "John",
                    "last_name": "Wallace"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 328596",
                    "first_name": "Theresa",
                    "last_name": "Young"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 211348",
                    "first_name": "Lauren",
                    "last_name": "Ayers"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 359060",
                    "first_name": "Carolyn",
                    "last_name": "Wilkerson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 490900",
                    "first_name": "Christina",
                    "last_name": "Perkins"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 394389",
                    "first_name": "Pamela",
                    "last_name": "Stewart"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 168341",
                    "first_name": "Tommy",
                    "last_name": "Ray"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 76950",
                    "first_name": "Dominic",
                    "last_name": "Davila"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 55190",
                    "first_name": "Stephen",
                    "last_name": "Salazar"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 73623",
                    "first_name": "Craig",
                    "last_name": "Thornton"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 469144",
                    "first_name": "Marissa",
                    "last_name": "Wells"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 141723",
                    "first_name": "Charles",
                    "last_name": "Chambers"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 134302",
                    "first_name": "Angela",
                    "last_name": "Melendez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 231327",
                    "first_name": "Charles",
                    "last_name": "Robinson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 397985",
                    "first_name": "Clinton",
                    "last_name": "Mccarty"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 144289",
                    "first_name": "Kevin",
                    "last_name": "Bean"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 29345",
                    "first_name": "Ryan",
                    "last_name": "Lewis"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 255905",
                    "first_name": "Patrick",
                    "last_name": "Hartman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 196770",
                    "first_name": "Rhonda",
                    "last_name": "Benson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 90018",
                    "first_name": "Richard",
                    "last_name": "Kim"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 441763",
                    "first_name": "Bradley",
                    "last_name": "Baker"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 240804",
                    "first_name": "Carol",
                    "last_name": "Howe"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 218021",
                    "first_name": "Calvin",
                    "last_name": "Parker"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 400550",
                    "first_name": "Gregory",
                    "last_name": "Smith"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 226471",
                    "first_name": "Nathan",
                    "last_name": "Espinoza"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 348072",
                    "first_name": "Megan",
                    "last_name": "Castro"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 339369",
                    "first_name": "Clinton",
                    "last_name": "Nichols"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 312748",
                    "first_name": "Paul",
                    "last_name": "Glover"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 362416",
                    "first_name": "Carly",
                    "last_name": "Medina"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 261041",
                    "first_name": "Gilbert",
                    "last_name": "Johnson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 336052",
                    "first_name": "Jake",
                    "last_name": "Mckinney"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 143797",
                    "first_name": "Robin",
                    "last_name": "Russo"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 477109",
                    "first_name": "Amanda",
                    "last_name": "Pope"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 123320",
                    "first_name": "Caroline",
                    "last_name": "Roberts"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 140985",
                    "first_name": "Abigail",
                    "last_name": "Blackwell"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 367294",
                    "first_name": "Melinda",
                    "last_name": "Duran"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 324798",
                    "first_name": "Jacob",
                    "last_name": "Jackson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 304319",
                    "first_name": "Gwendolyn",
                    "last_name": "Figueroa"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 59839",
                    "first_name": "Carol",
                    "last_name": "Porter"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 36032",
                    "first_name": "Isaac",
                    "last_name": "Taylor"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 387776",
                    "first_name": "Wayne",
                    "last_name": "Wood"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 138945",
                    "first_name": "Elizabeth",
                    "last_name": "Lamb"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 203715",
                    "first_name": "Kendra",
                    "last_name": "Torres"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 52163",
                    "first_name": "Ricky",
                    "last_name": "Kelly"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 186564",
                    "first_name": "Tiffany",
                    "last_name": "Baker"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 435141",
                    "first_name": "Marissa",
                    "last_name": "Ross"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 387269",
                    "first_name": "Jeremy",
                    "last_name": "Graham"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 328902",
                    "first_name": "Jocelyn",
                    "last_name": "Harris"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 8904",
                    "first_name": "Daniel",
                    "last_name": "Simpson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 206792",
                    "first_name": "Alan",
                    "last_name": "Farmer"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 1481",
                    "first_name": "Todd",
                    "last_name": "Brooks"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 224458",
                    "first_name": "Cheryl",
                    "last_name": "Wade"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 46539",
                    "first_name": "Alejandra",
                    "last_name": "Daniel"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 320205",
                    "first_name": "Jose",
                    "last_name": "Thomas"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 216782",
                    "first_name": "Veronica",
                    "last_name": "Herrera"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 86990",
                    "first_name": "Destiny",
                    "last_name": "Barnes"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 498126",
                    "first_name": "Rodney",
                    "last_name": "Lucas"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 498639",
                    "first_name": "Samuel",
                    "last_name": "Smith"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 18128",
                    "first_name": "Clifford",
                    "last_name": "Coleman"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 65488",
                    "first_name": "Nicholas",
                    "last_name": "Mckinney"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 355026",
                    "first_name": "Bruce",
                    "last_name": "Brown"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 442322",
                    "first_name": "Howard",
                    "last_name": "Robertson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 9427",
                    "first_name": "April",
                    "last_name": "Pitts"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 476115",
                    "first_name": "Alexandria",
                    "last_name": "Boyd"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 165332",
                    "first_name": "Christopher",
                    "last_name": "Gross"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 103380",
                    "first_name": "Maria",
                    "last_name": "Salinas"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 402133",
                    "first_name": "Robin",
                    "last_name": "Stephens"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 421333",
                    "first_name": "Michelle",
                    "last_name": "Pope"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 376277",
                    "first_name": "Barbara",
                    "last_name": "Alexander"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 286678",
                    "first_name": "William",
                    "last_name": "Heath"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 191702",
                    "first_name": "Adrian",
                    "last_name": "Carlson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 375512",
                    "first_name": "Edgar",
                    "last_name": "Burgess"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 441560",
                    "first_name": "Jermaine",
                    "last_name": "Tanner"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 53721",
                    "first_name": "Tim",
                    "last_name": "Miranda"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 9690",
                    "first_name": "Glenda",
                    "last_name": "Holden"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 475354",
                    "first_name": "Jenna",
                    "last_name": "Griffin"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 295386",
                    "first_name": "John",
                    "last_name": "Mccormick"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 169178",
                    "first_name": "Briana",
                    "last_name": "Diaz"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 104410",
                    "first_name": "Matthew",
                    "last_name": "Rodgers"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 401115",
                    "first_name": "Jerry",
                    "last_name": "Hughes"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 37086",
                    "first_name": "Courtney",
                    "last_name": "Grant"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 24802",
                    "first_name": "Philip",
                    "last_name": "Vasquez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 440802",
                    "first_name": "Joanne",
                    "last_name": "Warren"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 245731",
                    "first_name": "Eric",
                    "last_name": "Rose"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 167140",
                    "first_name": "Cindy",
                    "last_name": "Sheppard"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 79845",
                    "first_name": "Teresa",
                    "last_name": "Weber"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 70886",
                    "first_name": "Juan",
                    "last_name": "Lloyd"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 75238",
                    "first_name": "Michaela",
                    "last_name": "Blair"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 274406",
                    "first_name": "Jason",
                    "last_name": "Diaz"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 483047",
                    "first_name": "Christopher",
                    "last_name": "Larson"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 52199",
                    "first_name": "Justin",
                    "last_name": "Cunningham"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 270056",
                    "first_name": "Karla",
                    "last_name": "Gutierrez"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 219624",
                    "first_name": "James",
                    "last_name": "Blevins"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 149737",
                    "first_name": "Jeremy",
                    "last_name": "Welch"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 221673",
                    "first_name": "Regina",
                    "last_name": "Logan"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 404202",
                    "first_name": "Julian",
                    "last_name": "Small"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 63466",
                    "first_name": "Sheri",
                    "last_name": "Solis"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 161515",
                    "first_name": "Jeffrey",
                    "last_name": "Berger"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 221420",
                    "first_name": "Megan",
                    "last_name": "Myers"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 418284",
                    "first_name": "Carrie",
                    "last_name": "Schroeder"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 41964",
                    "first_name": "Terry",
                    "last_name": "Brady"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 492527",
                    "first_name": "Christina",
                    "last_name": "Dorsey"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 282097",
                    "first_name": "Scott",
                    "last_name": "Ramos"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 91377",
                    "first_name": "James",
                    "last_name": "Cain"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 49393",
                    "first_name": "Toni",
                    "last_name": "Lawrence"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 2802",
                    "first_name": "Kevin",
                    "last_name": "Price"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 34802",
                    "first_name": "Ashley",
                    "last_name": "Glenn"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 23027",
                    "first_name": "Ronald",
                    "last_name": "Figueroa"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 480500",
                    "first_name": "Larry",
                    "last_name": "Richmond"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 245237",
                    "first_name": "Olivia",
                    "last_name": "Pace"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 452853",
                    "first_name": "Kelly",
                    "last_name": "Johnston"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 2806",
                    "first_name": "Jenny",
                    "last_name": "Bradley"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 478710",
                    "first_name": "Holly",
                    "last_name": "Zuniga"
                },
                {
                    "date": "2024-04-28",
                    "detail": "comment 171512",
                    "first_name": "Jesse",
                    "last_name": "Sandoval"
                }
            ];

            return data;
        } catch (err) {
            console.log(err);
        }
    };



}

export default MovieController;
