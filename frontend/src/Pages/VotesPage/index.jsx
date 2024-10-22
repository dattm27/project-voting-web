import styles from './VotesPage.module.scss';

const news = [
    {
        src: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
];

function VotesPage() {
    return (
        <div className={styles['content-wrapper']}>
            {news.map((item, index) => (
                <div className={styles['news-card']} key={index}>
                    <a href="#" className={styles['news-card__card-link']}></a>
                    <img 
                        src={item.src} 
                        alt={item.alt} 
                        className={styles['news-card__image']} 
                    />
                    <div className={styles['news-card__text-wrapper']}>
                        <h2 className={styles['news-card__title']}>{item.h2}</h2>
                        <div className={styles['news-card__post-date']}>{item.date}</div>
                        <div className={styles['news-card__details-wrapper']}>
                            <p className={styles['news-card__excerpt']}>{item.p}</p>
                            <a href="#" className={styles['news-card__read-more']}>
                                {item.a} <i className="fas fa-long-arrow-alt-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default VotesPage;
