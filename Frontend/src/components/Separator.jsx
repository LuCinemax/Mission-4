import styles from './Separator.module.css'
import SeparatorImg from '../assets/images/Separator.png'

const Separator = () => {
  return (
    <figure>
        <img className={styles.separator} src={SeparatorImg} alt="" />
    </figure>
  )
}

export default Separator