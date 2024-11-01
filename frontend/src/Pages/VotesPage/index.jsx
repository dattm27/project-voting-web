import styles from './VotesPage.module.scss';

const news = [
    {
        src: "https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1727725527510-092e7a8ec381?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1727725527510-092e7a8ec381?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1727725527510-092e7a8ec381?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1727725527510-092e7a8ec381?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1727725527510-092e7a8ec381?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1727725527510-092e7a8ec381?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1727725527510-092e7a8ec381?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Title',
        h2: "Amazing Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing First Title',
        h2: "Amazing First Title",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1729876502720-175f3230296b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: 'Amazing Second Title',
        h2: "Amazing Second Title that is Quite Long",
        date: "Jan 29, 2018",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit&hellip;",
        a: "Read more"
    },
    {
        src: "https://images.unsplash.com/photo-1727725527510-092e7a8ec381?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
