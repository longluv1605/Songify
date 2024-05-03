import Database from "../database/database";
import { Request, Response } from "express";

class FilterController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public async getFilteredMovies(req: Request, res: Response): Promise<void> {
        try {
            const genre = req.query.genre;
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING genres LIKE '%${genre}%' ORDER BY average_rating DESC`;
            // const movies = await this.db.query(sql, [genre]);

            const movies = 	[
                {
                    "id": 741,
                    "title": "Ghost in the Shell",
                    "cover_img_url": null,
                    "genres": "Action, Animation, Science Fiction",
                    "average_rating": 3.9
                },
                {
                    "id": 1,
                    "title": "Toy Story",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family",
                    "average_rating": 3.8
                },
                {
                    "id": 364,
                    "title": "The Lion King",
                    "cover_img_url": null,
                    "genres": "Animation, Drama, Family",
                    "average_rating": 3.8
                },
                {
                    "id": 1274,
                    "title": "Akira",
                    "cover_img_url": null,
                    "genres": "Action, Animation, Science Fiction",
                    "average_rating": 3.8
                },
                {
                    "id": 2495,
                    "title": "Fantastic Planet",
                    "cover_img_url": null,
                    "genres": "Animation, Science Fiction",
                    "average_rating": 3.8
                },
                {
                    "id": 551,
                    "title": "The Nightmare Before Christmas",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy",
                    "average_rating": 3.6
                },
                {
                    "id": 588,
                    "title": "Aladdin",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy, Romance",
                    "average_rating": 3.6
                },
                {
                    "id": 595,
                    "title": "Beauty and the Beast",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy, Romance",
                    "average_rating": 3.6
                },
                {
                    "id": 1282,
                    "title": "Fantasia",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy",
                    "average_rating": 3.6
                },
                {
                    "id": 1907,
                    "title": "Mulan",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family",
                    "average_rating": 3.6
                },
                {
                    "id": 2099,
                    "title": "Song of the South",
                    "cover_img_url": null,
                    "genres": "Animation, Family",
                    "average_rating": 3.6
                },
                {
                    "id": 2138,
                    "title": "Watership Down",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Drama",
                    "average_rating": 3.6
                },
                {
                    "id": 2139,
                    "title": "The Secret of NIMH",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy, Science Fiction",
                    "average_rating": 3.6
                },
                {
                    "id": 594,
                    "title": "Snow White and the Seven Dwarfs",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy",
                    "average_rating": 3.5
                },
                {
                    "id": 1022,
                    "title": "Cinderella",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy, Romance",
                    "average_rating": 3.5
                },
                {
                    "id": 1032,
                    "title": "Alice in Wonderland",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy",
                    "average_rating": 3.5
                },
                {
                    "id": 2078,
                    "title": "The Jungle Book",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family",
                    "average_rating": 3.5
                },
                {
                    "id": 2080,
                    "title": "Lady and the Tramp",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Romance",
                    "average_rating": 3.5
                },
                {
                    "id": 2081,
                    "title": "The Little Mermaid",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy",
                    "average_rating": 3.5
                },
                {
                    "id": 2087,
                    "title": "Peter Pan",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy",
                    "average_rating": 3.5
                },
                {
                    "id": 2096,
                    "title": "Sleeping Beauty",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy, Romance",
                    "average_rating": 3.5
                },
                {
                    "id": 2137,
                    "title": "Charlotte's Web",
                    "cover_img_url": null,
                    "genres": "Animation, Comedy, Drama, Family, Music",
                    "average_rating": 3.5
                },
                {
                    "id": 596,
                    "title": "Pinocchio",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy",
                    "average_rating": 3.4
                },
                {
                    "id": 1025,
                    "title": "The Sword in the Stone",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy",
                    "average_rating": 3.4
                },
                {
                    "id": 1029,
                    "title": "Dumbo",
                    "cover_img_url": null,
                    "genres": "Animation, Family",
                    "average_rating": 3.4
                },
                {
                    "id": 1688,
                    "title": "Anastasia",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy",
                    "average_rating": 3.4
                },
                {
                    "id": 2018,
                    "title": "Bambi",
                    "cover_img_url": null,
                    "genres": "Animation, Drama, Family",
                    "average_rating": 3.4
                },
                {
                    "id": 2102,
                    "title": "Steamboat Willie",
                    "cover_img_url": null,
                    "genres": "Animation, Comedy",
                    "average_rating": 3.4
                },
                {
                    "id": 2355,
                    "title": "A Bug's Life",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family",
                    "average_rating": 3.4
                },
                {
                    "id": 2394,
                    "title": "The Prince of Egypt",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Drama, Family",
                    "average_rating": 3.4
                },
                {
                    "id": 13,
                    "title": "Balto",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family",
                    "average_rating": 3.3
                },
                {
                    "id": 610,
                    "title": "Heavy Metal",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Fantasy, Music, Science Fiction",
                    "average_rating": 3.3
                },
                {
                    "id": 616,
                    "title": "The Aristocats",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family",
                    "average_rating": 3.3
                },
                {
                    "id": 661,
                    "title": "James and the Giant Peach",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy",
                    "average_rating": 3.3
                },
                {
                    "id": 1026,
                    "title": "So Dear to My Heart",
                    "cover_img_url": null,
                    "genres": "Animation, Drama, Family",
                    "average_rating": 3.3
                },
                {
                    "id": 1031,
                    "title": "Bedknobs and Broomsticks",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family, Fantasy, Music",
                    "average_rating": 3.3
                },
                {
                    "id": 1033,
                    "title": "The Fox and the Hound",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Drama, Family",
                    "average_rating": 3.3
                },
                {
                    "id": 1566,
                    "title": "Hercules",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family, Fantasy, Romance",
                    "average_rating": 3.3
                },
                {
                    "id": 2085,
                    "title": "One Hundred and One Dalmatians",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family",
                    "average_rating": 3.3
                },
                {
                    "id": 2090,
                    "title": "The Rescuers",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy",
                    "average_rating": 3.3
                },
                {
                    "id": 2141,
                    "title": "An American Tail",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Drama, Family",
                    "average_rating": 3.3
                },
                {
                    "id": 709,
                    "title": "Oliver & Company",
                    "cover_img_url": null,
                    "genres": "Animation, Comedy, Family",
                    "average_rating": 3.2
                },
                {
                    "id": 783,
                    "title": "The Hunchback of Notre Dame",
                    "cover_img_url": null,
                    "genres": "Animation, Drama, Family",
                    "average_rating": 3.2
                },
                {
                    "id": 1024,
                    "title": "The Three Caballeros",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Music",
                    "average_rating": 3.2
                },
                {
                    "id": 2048,
                    "title": "The Great Mouse Detective",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Mystery",
                    "average_rating": 3.2
                },
                {
                    "id": 2116,
                    "title": "The Lord of the Rings",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Fantasy",
                    "average_rating": 3.2
                },
                {
                    "id": 2089,
                    "title": "The Rescuers Down Under",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy",
                    "average_rating": 3.1
                },
                {
                    "id": 2294,
                    "title": "Antz",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family",
                    "average_rating": 3.1
                },
                {
                    "id": 48,
                    "title": "Pocahontas",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Romance",
                    "average_rating": 3.0
                },
                {
                    "id": 239,
                    "title": "A Goofy Movie",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family, Romance",
                    "average_rating": 3.0
                },
                {
                    "id": 1030,
                    "title": "Pete's Dragon",
                    "cover_img_url": null,
                    "genres": "Animation, Comedy, Family, Fantasy",
                    "average_rating": 3.0
                },
                {
                    "id": 2033,
                    "title": "The Black Cauldron",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy",
                    "average_rating": 3.0
                },
                {
                    "id": 2189,
                    "title": "I Married a Strange Person!",
                    "cover_img_url": null,
                    "genres": "Action, Animation, Comedy, Fantasy, Science Fiction",
                    "average_rating": 3.0
                },
                {
                    "id": 313,
                    "title": "The Swan Princess",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family, Fantasy",
                    "average_rating": 2.9
                },
                {
                    "id": 1405,
                    "title": "Beavis and Butt-Head Do America",
                    "cover_img_url": null,
                    "genres": "Animation, Comedy",
                    "average_rating": 2.9
                },
                {
                    "id": 2123,
                    "title": "All Dogs Go to Heaven",
                    "cover_img_url": null,
                    "genres": "Animation, Comedy, Drama, Family, Fantasy",
                    "average_rating": 2.9
                },
                {
                    "id": 2142,
                    "title": "An American Tail: Fievel Goes West",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family, Western",
                    "average_rating": 2.9
                },
                {
                    "id": 631,
                    "title": "All Dogs Go to Heaven 2",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy, Romance",
                    "average_rating": 2.8
                },
                {
                    "id": 673,
                    "title": "Space Jam",
                    "cover_img_url": null,
                    "genres": "Animation, Comedy, Family, Science Fiction",
                    "average_rating": 2.8
                },
                {
                    "id": 1489,
                    "title": "Cats Don't Dance",
                    "cover_img_url": null,
                    "genres": "Animation, Comedy, Family, Music",
                    "average_rating": 2.8
                },
                {
                    "id": 558,
                    "title": "The Pagemaster",
                    "cover_img_url": null,
                    "genres": "Animation, Family, Fantasy",
                    "average_rating": 2.7
                },
                {
                    "id": 1881,
                    "title": "Quest for Camelot",
                    "cover_img_url": null,
                    "genres": "Animation, Drama, Family, Fantasy, Romance",
                    "average_rating": 2.7
                },
                {
                    "id": 2354,
                    "title": "The Rugrats Movie",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Comedy, Family",
                    "average_rating": 2.6
                },
                {
                    "id": 244,
                    "title": "Gumby 1",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Fantasy, Music, Science Fiction, Western",
                    "average_rating": 2.5
                },
                {
                    "id": 888,
                    "title": "The Land Before Time III: The Time of the Great Giving",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family",
                    "average_rating": null
                },
                {
                    "id": 1064,
                    "title": "Aladdin and the King of Thieves",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family",
                    "average_rating": null
                },
                {
                    "id": 2092,
                    "title": "The Return of Jafar",
                    "cover_img_url": null,
                    "genres": "Adventure, Animation, Family, Romance",
                    "average_rating": null
                }
            ];

            res.status(200).json(movies);
        } catch (err) {
            console.log("error", err);
        }
    }
}

export default FilterController;
