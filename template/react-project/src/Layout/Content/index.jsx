import React from 'react'
import styles from './index.module.less'

function index({children}) {
  return (
    <div className={styles.main}>
      {children}
    </div>
  )
}

export default index
