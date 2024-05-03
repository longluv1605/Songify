import Database from "../database/database";
import { Request, Response } from "express";

class SearchController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getSearchData = async (req: Request, res: Response) => {
        try {
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    HAVING LOWER(m.title) LIKE LOWER('%?%')
                                    GROUP BY m.id ORDER BY average_rating DESC`;
            const str: string | undefined = req.query.string as string; // Explicitly cast to string
            // const data = await this.db.query(sql, [str]);

            const data = [
                {
                    "id": 750,
                    "title": "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
                    "cover_img_url": null,
                    "genres": "Comedy, War",
                    "average_rating": 4.1
                },
                {
                    "id": 1045,
                    "title": "Love Is All There Is",
                    "cover_img_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 4.0
                },
                {
                    "id": 1851,
                    "title": "Leather Jacket Love Story",
                    "cover_img_url": null,
                    "genres": "Comedy, Drama, Romance",
                    "average_rating": 4.0
                },
                {
                    "id": 178,
                    "title": "Love & Human Remains",
                    "cover_img_url": null,
                    "genres": "Comedy, Drama",
                    "average_rating": 3.8
                },
                {
                    "id": 2396,
                    "title": "Shakespeare in Love",
                    "cover_img_url": null,
                    "genres": "Comedy, History, Romance",
                    "average_rating": 3.7
                },
                {
                    "id": 249,
                    "title": "Immortal Beloved",
                    "cover_img_url": null,
                    "genres": "Drama, Music, Romance",
                    "average_rating": 3.6
                },
                {
                    "id": 40,
                    "title": "Cry, the Beloved Country",
                    "cover_img_url": null,
                    "genres": "Drama",
                    "average_rating": 3.5
                },
                {
                    "id": 477,
                    "title": "What's Love Got to Do with It",
                    "cover_img_url": null,
                    "genres": "Drama, History, Music",
                    "average_rating": 3.5
                },
                {
                    "id": 937,
                    "title": "Love in the Afternoon",
                    "cover_img_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 3.5
                },
                {
                    "id": 1173,
                    "title": "The Cook, the Thief, His Wife & Her Lover",
                    "cover_img_url": null,
                    "genres": "Crime, Drama",
                    "average_rating": 3.5
                },
                {
                    "id": 381,
                    "title": "When a Man Loves a Woman",
                    "cover_img_url": null,
                    "genres": "Drama, Romance",
                    "average_rating": 3.3
                },
                {
                    "id": 600,
                    "title": "Love and a .45",
                    "cover_img_url": null,
                    "genres": "Crime, Thriller",
                    "average_rating": 3.3
                },
                {
                    "id": 1057,
                    "title": "Everyone Says I Love You",
                    "cover_img_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 3.3
                },
                {
                    "id": 1477,
                    "title": "Love Jones",
                    "cover_img_url": null,
                    "genres": "Comedy, Drama, Romance",
                    "average_rating": 3.3
                },
                {
                    "id": 1685,
                    "title": "I Love You, I Love You Not",
                    "cover_img_url": null,
                    "genres": "Drama, Family, Romance",
                    "average_rating": 3.3
                },
                {
                    "id": 713,
                    "title": "Of Love and Shadows",
                    "cover_img_url": null,
                    "genres": "Drama",
                    "average_rating": 3.2
                },
                {
                    "id": 1398,
                    "title": "In Love and War",
                    "cover_img_url": null,
                    "genres": "Drama, Romance",
                    "average_rating": 3.2
                },
                {
                    "id": 1541,
                    "title": "Addicted to Love",
                    "cover_img_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 3.2
                },
                {
                    "id": 2314,
                    "title": "Beloved",
                    "cover_img_url": null,
                    "genres": "Drama, Horror, Thriller",
                    "average_rating": 3.1
                },
                {
                    "id": 453,
                    "title": "For Love or Money",
                    "cover_img_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 3.0
                },
                {
                    "id": 603,
                    "title": "Bye Bye Love",
                    "cover_img_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 3.0
                },
                {
                    "id": 1010,
                    "title": "The Love Bug",
                    "cover_img_url": null,
                    "genres": "Comedy, Family, Fantasy",
                    "average_rating": 3.0
                },
                {
                    "id": 1436,
                    "title": "Falling in Love Again",
                    "cover_img_url": null,
                    "genres": "Drama, Romance",
                    "average_rating": 3.0
                },
                {
                    "id": 1475,
                    "title": "Kama Sutra: A Tale of Love",
                    "cover_img_url": null,
                    "genres": "Drama, History, Romance",
                    "average_rating": 3.0
                },
                {
                    "id": 626,
                    "title": "A Thin Line Between Love and Hate",
                    "cover_img_url": null,
                    "genres": "Comedy, Crime, Romance, Thriller",
                    "average_rating": 2.9
                },
                {
                    "id": 2190,
                    "title": "Why Do Fools Fall In Love",
                    "cover_img_url": null,
                    "genres": "Drama, Romance",
                    "average_rating": 2.9
                },
                {
                    "id": 1600,
                    "title": "She's So Lovely",
                    "cover_img_url": null,
                    "genres": "Drama, Romance, Thriller",
                    "average_rating": 2.8
                },
                {
                    "id": 360,
                    "title": "I Love Trouble",
                    "cover_img_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 2.7
                },
                {
                    "id": 179,
                    "title": "Mad Love",
                    "cover_img_url": null,
                    "genres": "Drama, Romance",
                    "average_rating": 2.6
                },
                {
                    "id": 2255,
                    "title": "Young Doctors in Love",
                    "cover_img_url": null,
                    "genres": "Comedy",
                    "average_rating": 2.5
                },
                {
                    "id": 1852,
                    "title": "Love Walked In",
                    "cover_img_url": null,
                    "genres": "Drama, Thriller",
                    "average_rating": 2.0
                }
            ];

            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default SearchController;
