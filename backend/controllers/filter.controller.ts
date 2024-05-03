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
            const sql: string = `SELECT m.*, GROUP_CONCAT(mg.genre_name) AS genres
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    GROUP BY m.id HAVING m.id IN (SELECT movie_id FROM movie_genre WHERE genre_name = ?)`;
            // const movies = await this.db.query(sql, [genre]);

            const movies = [
                {
                    id: 99,
                    title: "Heidi Fleiss: Hollywood Madam",
                    description:
                        "A documentary crew from the BBC arrives in L.A. intent on interviewing Heidi Fleiss, a year after her arrest for running a brothel but before her trial. Several months elapse before the interview, so the crew searches for anyone who'll talk about the young woman. Two people have a lot to say to the camera: a retired madam named Alex for whom Fleiss once worked and Fleiss's one-time boyfriend, Ivan Nagy, who introduced her to Alex. Alex and Nagy don't like each other, so the crew shuttles between them with she said and he said. When they finally interview Fleiss, they spend their time reciting what Alex and Nagy have had to say and asking her reaction.",
                    release_year: 1995,
                    added_at: "2024-04-26",
                    duration: 106,
                    directors: "Nick Broomfield",
                    actors: "Nick Broomfield, Heidi Fleiss, Madam Alex, Ivan Nagy, Corinne Bohrer, Ron Jeremy, Daryl Gates, Nina Xining Zuo, Victoria Sellers, Mike Brambles, Cookie, Elisa Fleiss, Jason Fleiss, Jesse Fleiss, Kim Fleiss, Paul Fleiss, Shannon Fleiss, Gabby, Susie Sterling, Jim Wakefield",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 162,
                    title: "Crumb",
                    description:
                        "This movie chronicles the life and times of R. Crumb. Robert Crumb is the cartoonist/artist who drew Keep On Truckin', Fritz the Cat, and played a major pioneering role in the genesis of underground comix. Through interviews with his mother, two brothers, wife, and ex-girlfriends, as well as selections from his vast quantity of graphic art, we are treated to a darkly comic ride through one man's subconscious mind.",
                    release_year: 1994,
                    added_at: "2024-04-26",
                    duration: 119,
                    directors: "Terry Zwigoff",
                    actors: "Robert Crumb, Aline Kominsky, Charles Crumb, Maxon Crumb, Robert Hughes, Martin Müller",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 206,
                    title: "Unzipped",
                    description:
                        "Isaac Mizrahi, one of the most successful designers in high fashion, plans his fall 1994 collection.",
                    release_year: 1995,
                    added_at: "2024-04-26",
                    duration: 73,
                    directors: "Douglas Keeve",
                    actors: "Isaac Mizrahi, Sandra Bernhard, Naomi Campbell, John Galliano, Kate Moss, Linda Evangelista, Cindy Crawford, Eartha Kitt, Padma Lakshmi, Liza Minnelli, André Leon Talley, Roseanne Barr, Carla Bruni, Christy Turlington, Faye Dunaway, Richard Gere",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 246,
                    title: "Hoop Dreams",
                    description:
                        "Every school day, African-American teenagers William Gates and Arthur Agee travel 90 minutes each way from inner-city Chicago to St. Joseph High School in Westchester, Illinois, a predominately white suburban school well-known for the excellence of its basketball program. Gates and Agee dream of NBA stardom, and with the support of their close-knit families, they battle the social and physical obstacles that stand in their way. This acclaimed documentary was shot over the course of five years.",
                    release_year: 1994,
                    added_at: "2024-04-26",
                    duration: 174,
                    directors: "Steve James",
                    actors: "William Gates, Arthur Agee, Gene Pingatore, Steve James, Dick Vitale, Bobby Knight, Spike Lee, Isiah Thomas",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 363,
                    title: "The Wonderful, Horrible Life of Leni Riefenstahl",
                    description:
                        "This documentary recounts the life and work of one of most famous, and yet reviled, German film directors in history, Leni Riefenstahl. The film recounts the rise of her career from a dancer, to a movie actor to the most important film director in Nazi Germany who directed such famous propaganda films as Triumph of the Will and Olympiad. The film also explores her later activities after Nazi Germany's defeat in 1945 and her disgrace for being so associated with it which includes her amazingly active life over the age of 90.",
                    release_year: 1993,
                    added_at: "2024-04-26",
                    duration: 180,
                    directors: "Ray Müller",
                    actors: "Leni Riefenstahl, Walter Frentz, Horst Kettner, Ray Müller, Luis Trenker, Guzzi Lantschner",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 398,
                    title: "Frank and Ollie",
                    description:
                        "Before computer graphics, special effects wizardry, and out-of-this world technology, the magic of animation flowed from the pencils of two of the greatest animators The Walt Disney Company ever produced -- Frank Thomas and Ollie Johnston. Frank and Ollie, the talent behind BAMBI, PINOCCHIO, LADY AND THE TRAMP, THE JUNGLE BOOK, and others, set the standard for such modern-day hits as THE LION KING. It was their creative genius that helped make Disney synonymous with brilliant animation, magnificent music, and emotional storytelling. Take a journey with these extraordinary artists as they share secrets, insights, and the inspiration behind some of the greatest animated movies the world has ever known!",
                    release_year: 1995,
                    added_at: "2024-04-26",
                    duration: 89,
                    directors: "Theodore Thomas",
                    actors: "Frank Thomas, Ollie Johnston, Glen Keane, Andrew Gaskill, John Canemaker, John Culhane",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 556,
                    title: "The War Room",
                    description:
                        "A behind-the-scenes documentary about the Clinton for President campaign, focusing on the adventures of spin doctors James Carville and George Stephanopoulos.",
                    release_year: 1993,
                    added_at: "2024-04-26",
                    duration: 96,
                    directors: "D. A. Pennebaker, Chris Hegedus",
                    actors: "James Carville, George Stephanopoulos, Heather Beckel, Paul Begala, Bob Boorstin, Bill Clinton, Hillary Clinton, Chelsea Clinton, Al Gore, Mary Matalin",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary,History",
                },
                {
                    id: 1050,
                    title: "Looking for Richard",
                    description:
                        "Al Pacino's deeply-felt rumination on Shakespeare's significance and relevance to the modern world through interviews and an in-depth analysis of Richard III.",
                    release_year: 1996,
                    added_at: "2024-04-26",
                    duration: 112,
                    directors: "Al Pacino",
                    actors: "Al Pacino, Winona Ryder, Kevin Spacey, Alec Baldwin, Aidan Quinn, Harris Yulin, Penelope Allen, Kenneth Branagh, Kevin Kline, James Earl Jones, Rosemary Harris, Peter Brook, Derek Jacobi, John Gielgud, Vanessa Redgrave, F. Murray Abraham",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 1111,
                    title: "Microcosmos",
                    description:
                        "A documentary of insect life in meadows and ponds, using incredible close-ups, slow motion, and time-lapse photography. It includes bees collecting nectar, ladybugs eating mites, snails mating, spiders wrapping their catch, a scarab beetle relentlessly pushing its ball of dung uphill, endless lines of caterpillars, an underwater spider creating an air bubble to live in, and a mosquito hatching.",
                    release_year: 1996,
                    added_at: "2024-04-26",
                    duration: 80,
                    directors: "Claude Nuridsany, Marie Pérennou",
                    actors: "Jacques Perrin",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 1145,
                    title: "Snowriders",
                    description:
                        "Spectacular shots of snowcapped peaks and extreme skiers gracefully defying gravity, not to mention common sense, are the highlights of this entertaining video from the venerable guru of skiing movies, Warren Miller. Sparing no expense, Miller's film crews span the globe, shooting snowboarders careening down absurdly steep Alaskan peaks, ski guides helicoptering to remote slopes in British Columbia, and hardy (and uninhibited) Scotsmen who boldly catch some big air in kilts. This video is fraught with offbeat humor, including shots of a snowshoe race that could have been filmed by Mack Sennett, and footage of face jumping, the oddball diversion of hurling oneself off Alpine glaciers and parachuting to earth. Miller's gentle narration, replete with trademark corny remarks reminiscent of old movie newsreels, mixes with a musical soundtrack of contemporary rock that is often uncannily synched with the astounding footage of extreme skiing.",
                    release_year: 1996,
                    added_at: "2024-04-26",
                    duration: 96,
                    directors: "",
                    actors: "Warren Miller",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 1147,
                    title: "When We Were Kings",
                    description:
                        "It's 1974. Muhammad Ali is 32 and thought by many to be past his prime. George Foreman is ten years younger and the heavyweight champion of the world. Promoter Don King wants to make a name for himself and offers both fighters five million dollars apiece to fight one another, and when they accept, King has only to come up with the money. He finds a willing backer in Mobutu Sese Suko, the dictator of Zaire, and the Rumble in the Jungle is set, including a musical festival featuring some of America's top black performers, like James Brown and B.B. King.",
                    release_year: 1996,
                    added_at: "2024-04-26",
                    duration: 89,
                    directors: "Leon Gast",
                    actors: "Muhammad Ali, George Foreman, Don King, James Brown, B.B. King, Spike Lee, Mobutu Sese Seko, Norman Mailer, George Plimpton, Malick Bowens, Lloyd Price, Miriam Makeba, Drew Bundini Brown, Odessa Clay, Howard Cosell, Wilton Felder, Wayne Henderson, Stix Hooper, Stewart Levin, Alan Pariser, Danny Big Black Rey, Dick Sadler, Joe Sample, Philippé Wynne, Archie Moore, Lola Love, Sonny Liston, Jersey Joe Walcott, Joe Frazier",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 1191,
                    title: "Madonna: Truth or Dare",
                    description:
                        "From the rains of Japan, through threats of arrest for 'public indecency' in Canada, and a birthday tribute to her father in Detroit, this documentary follows Madonna on her 1990 'Blond Ambition' concert tour. Filmed in black and white, with the concert pieces in glittering MTV color, it is an intimate look at the work of the icon, from a prayer circle before each performance to bed games with the dance troupe afterwards.",
                    release_year: 1991,
                    added_at: "2024-04-26",
                    duration: 119,
                    directors: "Alek Keshishian",
                    actors: "Madonna, Donna DeLory, Niki Haris, Warren Beatty, Sandra Bernhard, Jean-Paul Gaultier, Luis Camacho, Jose Xtravaganza, Salim Gauwloos, Silvio Ciccone, Oliver Crumes, Gabriel Trupin, Christopher Ciccone, Kevin Stea, Carlton Wilborn, Antonio Banderas, Rossy de Palma, Al Pacino, Mandy Patinkin, Kevin Costner, Olivia Newton-John",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary,Music",
                },
                {
                    id: 1192,
                    title: "Paris Is Burning",
                    description:
                        "Where does voguing come from, and what, exactly, is throwing shade? This landmark documentary provides a vibrant snapshot of the 1980s through the eyes of New York City's African American and Latinx Harlem drag-ball scene. Made over seven years, PARIS IS BURNING offers an intimate portrait of rival fashion houses, from fierce contests for trophies to house mothers offering sustenance in a world rampant with homophobia, transphobia, racism, AIDS, and poverty. Featuring legendary voguers, drag queens, and trans women — including Willi Ninja, Pepper LaBeija, Dorian Corey, and Venus Xtravaganza.",
                    release_year: 1991,
                    added_at: "2024-04-26",
                    duration: 78,
                    directors: "Jennie Livingston",
                    actors: "Pepper LaBeija, Octavia St. Laurent, Venus Xtravaganza, Dorian Corey, Willi Ninja, Paris Dupree, Freddie Pendavis, Sol Williams Pendavis, Junior LaBeija, Angie Xtravaganza, Carmen Xtravaganza, Brooke Xtravaganza, Kim Pendavis, Sandy Ninja, Avis Pendavis, Andre Christian, Stevie St. Laurent, Bianca Xtravaganza, Danny Xtravaganza, David Xtravaganza, David Ian Xtravaganza, David the Father Xtravaganza",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 1289,
                    title: "Koyaanisqatsi",
                    description:
                        "Takes us to locations all around the US and shows us the heavy toll that modern technology is having on humans and the earth. The visual tone poem contains neither dialogue nor a vocalized narration: its tone is set by the juxtaposition of images and the exceptional music by Philip Glass.",
                    release_year: 1983,
                    added_at: "2024-04-26",
                    duration: 86,
                    directors: "Godfrey Reggio",
                    actors: "",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 1470,
                    title: "Rhyme & Reason",
                    description:
                        "A study in the world of hip-hop, done mostly with interviews, in order to see why it is as popular as it is today and what the future holds.",
                    release_year: 1997,
                    added_at: "2024-04-26",
                    duration: 90,
                    directors: "Peter Spirer",
                    actors: "Dr. Dre, Nas, RZA, Method Man, Ice-T, Too $hort, Q-Tip, B-Real, Cheryl Salt James, Stefanie Peppa Meissner, The Notorious B.I.G., Sen Dog, KRS-One, Lauryn Hill, Da Brat, Heavy D, Pras Michel, Raekwon, Redman",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary,Music",
                },
                {
                    id: 1652,
                    title: "Year of the Horse",
                    description:
                        "Indie director Jim Jarmusch lenses a low-tech tribute to protean rocker Neil Young and his long-standing band, Crazy Horse. Stitched together from archival material shot in 1976 and 1986 along with candid scenes of Young and the band kicking back between shows, this rockumentary is as ragged as it is direct.",
                    release_year: 1997,
                    added_at: "2024-04-26",
                    duration: 106,
                    directors: "Jim Jarmusch",
                    actors: "Neil Young, Ralph Molina, Frank Sampedro, Billy Talbot, Elliot Roberts, Scott Young, Keith Wissmar, Larry Cragg, Danny Whitten, David Briggs, Jim Jarmusch",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary,Music",
                },
                {
                    id: 1797,
                    title: "Everest",
                    description:
                        "An international team of climbers ascends Mt. Everest in the spring of 1996. The film depicts their lengthy preparations for the climb, their trek to the summit, and their successful return to Base Camp. It also shows many of the challenges the group faced, including avalanches, lack of oxygen, treacherous ice walls, and a deadly blizzard.",
                    release_year: 1998,
                    added_at: "2024-04-26",
                    duration: 44,
                    directors:
                        "Greg MacGillivray, Stephen Judson, David Breashears",
                    actors: "Liam Neeson, Ed Viesturs, David Breashears, Tracy Pfau, Lhakpa Dorji",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 1827,
                    title: "The Big One",
                    description:
                        "The Big One is an investigative documentary from director Michael Moore who goes around the country asking why big American corporations produce their product abroad where labor is cheaper while so many Americans are unemployed, losing their jobs, and would happily be hired by such companies as Nike.",
                    release_year: 1997,
                    added_at: "2024-04-26",
                    duration: 91,
                    directors: "Michael Moore",
                    actors: "Jim Czarnecki, Elaine Bly, Michael Moore, Brian Danitz, Richard Jewell, Bill Clinton, Jerry Springer, Dan Burns, Chip Carter, Joel Feick, Doug France, Mary Gielow, Bev Jacowski, Kevin Keane, Garrison Keillor, Andy Crash Kelly, Phil Knight, Tia Lessin, Diane Mitchell, Rick Nielsen, Keith Peters, Chris Smith, Studs Terkel, Armstrong Williams",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 1856,
                    title: "Kurt & Courtney",
                    description:
                        "After rocker Kurt Cobain's death, ruled a suicide, a film crew arrives in Seattle to make a documentary. Director Nick Broomfield talks to lots of people. Portraits emerge: a shy, slight Kurt, weary of touring, embarrassed by fame, hooked on heroin; an out-going Courtney, dramatic, controlling, moving from groupie to star.",
                    release_year: 1998,
                    added_at: "2024-04-26",
                    duration: 95,
                    directors: "Nick Broomfield",
                    actors: "Nick Broomfield, Dylan Carlson, Kurt Cobain, El Duce, Larry Flynt, Tom Grant, Hank Harrison, Courtney Love, Sam Rubin, Vincent Schiavelli, Pat Smear",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary,Music",
                },
                {
                    id: 2061,
                    title: "Full Tilt Boogie",
                    description:
                        "A documentary about the production of From Dusk Till Dawn (1996) and the people who made it.",
                    release_year: 1998,
                    added_at: "2024-04-26",
                    duration: 97,
                    directors: "Sarah Kelly",
                    actors: "Rick Stribling, Kevin Bondy, Amy Minda Cohen, Elizabeth Avellan, Dieter Busch, Cecilia Montiel, Gregory Nicotero, Victoria Lucai, George Clooney, McPherson O. Downs, Earl Thielen, Michael Parks, Harvey Keitel, Juliette Lewis, Fred Williamson, Lyle Trachtenberg, Quentin Tarantino, Lawrence Bender, Heather Hillmeyer, Paul Hellerman, Thomas L. Bellissimo, Andy Watts, Steve M. Davison, Jake Cross, Douglas Aarniokoski, Robert Rodriguez",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 2064,
                    title: "Roger & Me",
                    description:
                        "A documentary about the closure of General Motors' plant at Flint, Michigan, which resulted in the loss of 30,000 jobs. Details the attempts of filmmaker Michael Moore to get an interview with GM CEO Roger Smith.",
                    release_year: 1989,
                    added_at: "2024-04-26",
                    duration: 91,
                    directors: "Michael Moore",
                    actors: "Michael Moore, Rhonda Britton, Fred Ross, Roger B. Smith, Bob Eubanks, James Blanchard, Kaye Lani Rae Rafko Wilson, Pat Boone, Anita Bryant, Ronald Reagan",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Comedy,Documentary,History",
                },
                {
                    id: 2330,
                    title: "Hands on a Hardbody: The Documentary",
                    description:
                        "Filmmaker S.R. Bindler profiles Texas contestants trying to win a truck by keeping one hand on it longer than everyone else.",
                    release_year: 1997,
                    added_at: "2024-04-26",
                    duration: 98,
                    directors: "S.R. Bindler",
                    actors: "Brent Baskin, David Grotheim, Benny Perkins, J.D. Drew, Norma Valverde, Angie Turner, Paul Prince, Ronald McCowan, Kerri Parker, Raul Martinez, Kelli Mangrum, Tom Felker, Janis Curtis, Greg Cox, Russell Welch",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary",
                },
                {
                    id: 2494,
                    title: "The Last Days",
                    description:
                        "Five Jewish Hungarians, now U.S. citizens, tell their stories: before March, 1944, when Nazis began to exterminate Hungarian Jews, months in concentration camps, and visiting childhood homes more than 50 years later. An historian, a Sonderkommando, a doctor who experimented on Auschwitz prisoners, and US soldiers who were part of the liberation in April, 1945.",
                    release_year: 1998,
                    added_at: "2024-04-26",
                    duration: 87,
                    directors: "James Moll",
                    actors: "Bill Basch, Martin Basch, Randolph Braham, Alice Lok Cahana, Renee Firestone, Irene Zisblatt, Tom Lantos",
                    cover_img_url: null,
                    trailer_url: null,
                    film_url: null,
                    genres: "Documentary,Drama,History,War",
                },
            ];

            res.status(200).json(movies);
        } catch (err) {
            console.log("error", err);
        }
    }
}

export default FilterController;
