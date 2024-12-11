import styles from './GradientBg.module.scss'

function GradientBg() {
    return (
        <>
            <div className={styles['gradient-bg']}>
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id={styles.goo}>
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
                <div className={styles['gradients-container']}>
                    <div className={styles.g1}></div>
                    <div className={styles.g2}></div>
                    <div className={styles.g3}></div>
                    <div className={styles.g4}></div>
                    <div className={styles.g5}></div>
                    <div className={styles['interactive']}></div>
                </div>
            </div>
        </>
    )
}

export default GradientBg;