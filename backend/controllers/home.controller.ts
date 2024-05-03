import Database from "../database/database";
import { Request, Response } from "express";

class HomeController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public async getHomeData(req: Request, res: Response) {
        try {
            // const newMovies = await this.getNewMovies(req, res);
            // const recentMovies = await this.getRecentMovies(req, res);
            const newMovies = 	[
                {
                    "id": 1,
                    "title": "Toy Story",
                    "description": "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 81,
                    "directors": "John Lasseter",
                    "actors": "Tom Hanks, Tim Allen, Don Rickles, Jim Varney, Wallace Shawn, John Ratzenberger, Annie Potts, John Morris, Erik von Detten, Laurie Metcalf, R. Lee Ermey, Sarah Freeman, Penn Jillette, Jack Angel, Spencer Aste, Greg Berg, Lisa Bradley, Kendall Cunningham, Debi Derryberry, Cody Dorkin, Bill Farmer, Craig Good, Gregory Grudt, Danielle Judovits, Sam Lasseter, Brittany Levenbrown, Sherry Lynn, Scott McAfee, Mickie McGowan, Ryan ODonohue, Jeff Pidgeon, Patrick Pinney, Phil Proctor, Jan Rabson, Joe Ranft, Andrew Stanton, Shane Sweet, John Lasseter, Jonathan Benair, Anthony Burch, Tracy Fraim",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Adventure, Animation, Comedy, Family",
                    "average_rating": 3.8
                },
                {
                    "id": 2,
                    "title": "Jumanji",
                    "description": "When siblings Judy and Peter discover an enchanted board game that opens the door to a magical world, they unwittingly invite Alan -- an adult who's been trapped inside the game for 26 years -- into their living room. Alan's only hope for freedom is to finish the game, which proves risky as all three find themselves running from giant rhinoceroses, evil monkeys and other terrifying creatures.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 104,
                    "directors": "Joe Johnston",
                    "actors": "Robin Williams, Kirsten Dunst, Bradley Pierce, Bonnie Hunt, Jonathan Hyde, Bebe Neuwirth, David Alan Grier, Adam Hann-Byrd, Patricia Clarkson, Laura Bell Bundy, James Handy, Gillian Barber, Brandon Obray, Cyrus Thiedeke, Gary Joseph Thorup, Leonard Zola, Lloyd Berry, Malcolm Stewart, Annabel Kershaw, Darryl Henriques, Robyn Driscoll, Peter Bryant, Sarah Gilson, Florica Vlad, June Lion, Brenda Lockmuller, Frederick Richardson, Jaysen Clough, Daniel Olsen, Falko Schilling, David Szehi, Tom Woodruff Jr.",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Adventure, Family, Fantasy",
                    "average_rating": 3.2
                },
                {
                    "id": 3,
                    "title": "Grumpier Old Men",
                    "description": "A family wedding reignites the ancient feud between next-door neighbors and fishing buddies John and Max. Meanwhile, a sultry Italian divorcée opens a restaurant at the local bait shop, alarming the locals who worry she'll scare the fish away. But she's less interested in seafood than she is in cooking up a hot time with Max.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 101,
                    "directors": "Howard Deutch",
                    "actors": "Walter Matthau, Jack Lemmon, Ann-Margret, Sophia Loren, Daryl Hannah, Burgess Meredith, Kevin Pollak, Michelle Johnston",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 3.1
                },
                {
                    "id": 4,
                    "title": "Waiting to Exhale",
                    "description": "Cheated on, mistreated and stepped on, the women are holding their breath, waiting for the elusive good man to break a string of less-than-stellar lovers. Friends and confidants Vannah, Bernie, Glo and Robin talk it all out, determined to find a better way to breathe.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 127,
                    "directors": "Forest Whitaker",
                    "actors": "Whitney Houston, Angela Bassett, Loretta Devine, Lela Rochon, Gregory Hines, Dennis Haysbert, Mykelti Williamson, Michael Beach, Leon, Wendell Pierce, Donald Faison, Jeffrey D. Sams, Jazz Raycole, Brandon Hammond, Kenya Moore, Lamont Johnson, Wren T. Brown, Theo, Ken Love, Graham Galloway, Starletta DuPois, Shari L. Carpenter, Thomas R. Leander, Cordell Conway, Lee Wells Jr., Hope Brown, Delaina Mitchell, Luis Sharpe, Joseph S. Myers, Ezra Swerdlow, Ellin La Var, Patricia Anne Fox, Wally Bujack, Brenda Baldwin-Davis, William Bolander, L. Scott Caldwell, Kacee DeMasi, Giancarlo Esposito, Wanda-Lee Evans, Tom Hedrick, Donyell Hinton, Bob Huff, Angela Kenzslowe, Kelly Preston, Jose Rosete, Juliet Rose Serrato, Wesley Snipes",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Comedy, Drama, Romance",
                    "average_rating": 3.0
                },
                {
                    "id": 5,
                    "title": "Father of the Bride Part II",
                    "description": "Just when George Banks has recovered from his daughter's wedding, he receives the news that she's pregnant ... and that George's wife is expecting too. He was planning on selling their home, but that's a plan that—like George—will have to change with the arrival of both a grandchild and a kid of his own.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 106,
                    "directors": "Charles Shyer",
                    "actors": "Steve Martin, Diane Keaton, Martin Short, Kimberly Williams-Paisley, George Newbern, Kieran Culkin, BD Wong, Peter Michael Goetz, Kate McGregor-Stewart, Jane Adams, Eugene Levy, Rebecca Chambers, April Ortiz, Dulcy Rogers, Kathy Anthony, Adrian Canzoneri, Lori Alan, Stephanie Miller, Hallie Meyers-Shyer, Jay Wolpert, Ann Walker, Sandra Silvestri, William Akey, Jonathan Emerson, Seth Kaplan, Joshua Duvall Preston, K.C. Colwell, Chase Colwell, Tony Simotes, Annie Meyers-Shyer, Linda DeScenna, Heidi Averill, Chelsea Lynn, Chelsea Lynn, Sue Colwell, Rodrigo Botero, Vince Lozano, Caroline Lagerfelt, Ilene Waterstone, Wendy Worthington, Dorian Spencer, Harris Laskawy, Roxanne Beckford, Valerie Hemmerich, Peter Spears, Susan Beaubian, Mychael Bates, Jerri Rose White, Shannon Kennedy, Casey Boersma, Katie Pierce, Dylan Boersma, Jonathan Selstad, Thomas Selstad, Christian Boeving, Nora Dunn, David Novak, Kylie Travis",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Comedy, Family",
                    "average_rating": 3.1
                },
                {
                    "id": 12,
                    "title": "Dracula: Dead and Loving It",
                    "description": "When a lawyer shows up at the vampire's doorstep, he falls prey to his charms and joins him in his search for fresh blood. Enter Professor Van Helsing, who may be the only one able to vanquish the Count.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 88,
                    "directors": "Mel Brooks",
                    "actors": "Leslie Nielsen, Mel Brooks, Amy Yasbeck, Peter MacNicol, Lysette Anthony, Harvey Korman, Steven Weber, Mark Blankfield, Megan Cavanagh, Gregg Binkley, Anne Bancroft, Clive Revill, Chuck McCann, Avery Schreiber, Cherie Franklin, Ezio Greggio, Leslie Sachs, Rudy De Luca, Darla Haun, Karen Roe, Charlie Callas, Maud Winchester, Kathleen Kane, Tony Griffin, Cindy Marshall-Day",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Comedy, Horror",
                    "average_rating": 2.5
                },
                {
                    "id": 13,
                    "title": "Balto",
                    "description": "An outcast half-wolf risks his life to prevent a deadly epidemic from ravaging Nome, Alaska.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 78,
                    "directors": "Simon Wells",
                    "actors": "Kevin Bacon, Bob Hoskins, Bridget Fonda, Jim Cummings, Phil Collins, Juliette Brewer, Jack Angel, Danny Mann, Robbie Rist, Sandra Dickinson, Frank Welker, Miriam Margolyes, Lola Bates-Campbell",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Adventure, Animation, Family",
                    "average_rating": 3.3
                },
                {
                    "id": 18,
                    "title": "Four Rooms",
                    "description": "It's Ted the Bellhop's first night on the job...and the hotel's very unusual guests are about to place him in some outrageous predicaments. It seems that this evening's room service is serving up one unbelievable happening after another.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 98,
                    "directors": "Allison Anders, Alexandre Rockwell, Robert Rodriguez, Quentin Tarantino",
                    "actors": "Tim Roth, Jennifer Beals, Antonio Banderas, Valeria Golino, David Proval, Sammi Davis, Amanda de Cadenet, Madonna, Ione Skye, Lili Taylor, Alicia Witt, Tamlyn Tomita, Lana McKissack, Danny Verduzco, Patricia Vonne, Salma Hayek Pinault, Quentin Tarantino, Paul Calderon, Marisa Tomei, Kathy Griffin, Lawrence Bender, Kimberly Blair, Quinn Hellerman, Marc Lawrence, Paul Skemp, Unruly Julie McClean, Laura Rush, Bruce Willis",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Comedy",
                    "average_rating": 3.3
                },
                {
                    "id": 20,
                    "title": "Money Train",
                    "description": "When a vengeful New York transit cop decides to steal a trainload of subway fares, his foster brother—a fellow cop—tries to protect him.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 110,
                    "directors": "Joseph Ruben",
                    "actors": "Wesley Snipes, Woody Harrelson, Jennifer Lopez, Robert Blake, Chris Cooper, Katie Gill, Joe Grifasi, Scott Sowers, Skipp Sudduth, Aida Turturro, Vincent Pastore, Enrico Colantoni, Bill Nunn, Jeremy Roberts, Joe Bacino, Gregory McKinney, José Zúñiga, Flex Alexander, Sharon Schaffer, Catherine Dudley-Rose, Dean Norris, Greg Bronson",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Action, Comedy, Crime",
                    "average_rating": 2.8
                },
                {
                    "id": 24,
                    "title": "Powder",
                    "description": "Harassed by classmates who won't accept his shocking appearance, a shy young man known as Powder struggles to fit in. But the cruel taunts stop when Powder displays a mysterious power that allows him to do incredible things. This phenomenon changes the lives of all those around him in ways they never could have imagined.",
                    "release_year": 1995,
                    "added_at": "2024-04-26",
                    "duration": 111,
                    "directors": "Victor Salva",
                    "actors": "Mary Steenburgen, Sean Patrick Flanery, Lance Henriksen, Jeff Goldblum, Brandon Smith, Bradford Tatum, Susan Tyrrell, Missy Crider, Ray Wise, Esteban Powell, Danette McMahon, Paula Engel, Bonnie Gallup, Dee Macaluso, Tom Tarantini, Brady Coleman, Alex Morris, Woody Watson, Darla Rae",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Drama, Fantasy",
                    "average_rating": 3.2
                }
            ];

            const recentMovies = 	[
                {
                    "id": 1026,
                    "title": "So Dear to My Heart",
                    "description": "The tale of Jeremiah Kincaid and his quest to raise his 'champion' lamb, Danny. Jeremiah's dream of showing Danny at the Pike County Fair must overcome the obstinate objections of his loving, yet strict, grandmother Granny. Jeremiah's confidant, Uncle Hiram, is the boy's steady ally.",
                    "release_year": 1948,
                    "added_at": "2024-04-26",
                    "duration": 82,
                    "directors": "Harold D. Schuster, Hamilton Luske",
                    "actors": "Bobby Driscoll, Luana Patten, Beulah Bondi, Burl Ives, Harry Carey, Raymond Bond, Walter Soderling, Matt Willis, Spelman B. Collins, John Beal, Ken Carson, Bob Haymes, Marion Darlington, Clarence Nash",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Animation, Drama, Family",
                    "average_rating": 3.3
                },
                {
                    "id": 1060,
                    "title": "Swingers",
                    "description": "After 6 years together, Mike's girlfriend leaves him, so he travels to LA to be a star. Six months on, he's still not doing very well— so a few of his friends try to reconnect him to the social scene and hopefully help him forget his failed relationship.",
                    "release_year": 1996,
                    "added_at": "2024-04-26",
                    "duration": 96,
                    "directors": "Doug Liman",
                    "actors": "Jon Favreau, Vince Vaughn, Ron Livingston, Patrick Van Horn, Alex Désert, Heather Graham, Deena Martin, Katherine Kendall, Brooke Langton, Blake Lindsley, Kevin James Kelly, Stephanie Ittleson, Vernon Vaughn, Joan Favreau, Rio Hackford, Jan Dykstra, Maddie Corman, Marty & Elayne, Sheri Rosenblum, Stasea Rosenblum, Pamela Shaw, Tom Alley, Reverend Phil Dixon, Ashley M. Rogers, Jay Diola, Nicholas Gagliarducci, David Gould, Bill Phillips, Mansur Hamud, Ahmed Ahmed, Eufemia Plimpton, Melinda Starr, Samantha Lemole, Jessica Buchman, Caroline OMeara, Gary Auerbach, Brad Halvorson, Christopher R. Joyce, Edward Rissien, Jenna Rissien, Mark Smith, John Abrham, Rachel Gallaghan, Lisa Guerriero, Thomas Hall, Damiana Kamishin, Curtis Lindersmith, Jennifer Lucero, Pinki Marsolek, Rhonda Martin, Martina Migenes, Paul Mojica, Sam Mollo, Jacob Morris, Michael Scott, Bernard Serrano, Rosalind Smith, Molly Stern, Johnny Walker, Lisa Wolstein, Stephen Gaghan",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Comedy",
                    "average_rating": 3.8
                },
                {
                    "id": 1662,
                    "title": "Gang Related",
                    "description": "Two corrupt cops have a successful, seemingly perfect money making scheme- they sell drugs that they seize from dealers, kill the dealers, and blame the crimes on street gangs. Their scheme is going along smoothly until they kill an undercover DEA agent posing as a dealer, and then try to cover-up their crime.",
                    "release_year": 1997,
                    "added_at": "2024-04-26",
                    "duration": 102,
                    "directors": "Jim Kouf",
                    "actors": "Jim Belushi, Tupac Shakur, Lela Rochon, Dennis Quaid, James Earl Jones, Gary Cole, Terrence T.C. Carson, Wendy Crewson, Kool Moe Dee, Reggie Miller, David Paymer, Brad Greenquist, James Handy, Victor Love, Robert LaSardo, Perry Anzilotti, Gregory Scott Cummins, Tommy Lister Jr., Edward Edwards",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Action, Crime, Thriller",
                    "average_rating": 2.8
                },
                {
                    "id": 2205,
                    "title": "Mr. & Mrs. Smith",
                    "description": "Happily married for three years, Ann and David Smith live in New York. One morning Ann asks David if he had to do it over again, would he marry her? To her shock, he answers, No. Later that day, they separately discover that, due to a legal complication, they are not legally married.",
                    "release_year": 1941,
                    "added_at": "2024-04-26",
                    "duration": 95,
                    "directors": "Alfred Hitchcock",
                    "actors": "Carole Lombard, Robert Montgomery, Gene Raymond, Jack Carson, Philip Merivale, Lucile Watson, William Tracy, Charles Halton, Esther Dale, Emma Dunn, Betty Compson, Patricia Farr, William Edmunds, Pamela Blake, Alfred Hitchcock, Jack Gardner",
                    "cover_img_url": null,
                    "trailer_url": null,
                    "film_url": null,
                    "genres": "Comedy, Romance",
                    "average_rating": 3.2
                }
            ];
            res.status(200).json({
                newMovies: newMovies,
                recentMovies: recentMovies,
            });
        } catch (err) {
            console.log("error", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    private async getNewMovies(req: Request, res: Response): Promise<any> {
        try {
            const sql: string = `SELECT m.*, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id ORDER BY m.added_at desc limit 10`;
            const movies = await this.db.query(sql);

            return movies;
        } catch (err) {
            console.log("error", err);
        }
    }

    private async getRecentMovies(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.query.userId;
            const sql: string = `SELECT m.*, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING m.id IN (SELECT movie_id FROM user_history WHERE user_id = ? ORDER BY date DESC) LIMIT 10`;
            const movies = await this.db.query(sql, [userId]);
            return movies;
        } catch (err) {
            console.log("error", err);
        }
    }
}

export default HomeController;
